import { gql, request } from 'graphql-request';
import { ContractSourceCode } from './types/gql.js';
import { JSDOM } from 'jsdom';

export const PROD_BFF = 'https://bff.bunzz.dev/graphql';
export const LOCAL_BFF = 'http://127.0.0.1:8081/graphql';

export const PROD_FE = 'https://app.bunzz.dev';
export const LOCAL_FE = 'http://localhost:3000';

export const fetchContractInfo = async (
  options: any,
  chainId: string,
  contractAddress: string
): Promise<{
  code: string;
  contractName: string;
  optimizationUsed: boolean;
  runs: number;
  solidityVersion: string;
}> => {
  const query = gql`
    query FetchContractDoc($in: FetchContractDocInput!) {
      fetchContractDoc(in: $in) {
        document {
          code
          contractName
          optimizationUsed
          runs
          solidityVersion
        }
      }
    }
  `;

  const variables = {
    in: {
      chainId,
      contractAddress,
    },
  };

  let url;

  switch (options.env) {
    case 'local':
      url = LOCAL_BFF;
      break;
    default:
      url = PROD_BFF;
      break;
  }

  try {
    const response: any = await request(url, query, variables);

    const { code, contractName, optimizationUsed, runs, solidityVersion } =
      response.fetchContractDoc.document;
    return { code, contractName, optimizationUsed, runs, solidityVersion };
  } catch (error) {
    handleGqlError(error);
    throw new Error('Failed to fetch contract from bunzz.dev');
  }
};

export const parseCode = (code: string, name: string): ContractSourceCode => {
  const sourceHasSettings = code.startsWith('{{') && code.endsWith('}}');

  try {
    return JSON.parse(
      sourceHasSettings ? code.slice(1, -1) : code
    ) as ContractSourceCode;
  } catch (e) {
    return {
      sources: {
        [`contracts/${name}.sol`]: {
          content: code,
        },
      },
    };
  }
};

export const sendArtifacts = async (
  options: any,
  abi: any,
  bytecode: string,
  contractName: string
): Promise<string> => {
  const mutation = gql`
    mutation CreateArtifacts($req: CreateArtifactsReq!) {
      createArtifacts(req: $req) {
        id
      }
    }
  `;

  const variables = {
    req: {
      abi: JSON.stringify(abi),
      bytecode,
      contractName,
    },
  };

  let url;

  switch (options.env) {
    case 'local':
      url = LOCAL_BFF;
      break;
    default:
      url = PROD_BFF;
      break;
  }

  try {
    const response: any = await request(url, mutation, variables);
    return response.createArtifacts.id;
  } catch (error: any) {
    handleGqlError(error);
    throw new Error('Failed to send artifacts to bunzz.dev');
  }
};


export const sendCloningAnalytics = async (options: any, chainId: string, contractAddress: string, contractName: string) => {
  const mutation = gql`
    mutation ClonedContract($req: ClonedContractReq!) {
      clonedContract(req: $req) {
        status
      }
    }
  `;

  const variables = {
    req: {
      chainId,
      contractAddress,
      contractName,
    },
  };

  let url;

  switch (options.env) {
    case 'local':
      url = LOCAL_BFF;
      break;
    default:
      url = PROD_BFF;
      break;
  }

  try {
    const response: any = await request(url, mutation, variables);
    return response.clonedContract.status;
  } catch (error: any) {
    console.log("Failed to send analytics to bunzz.dev")
    console.error(error)
    handleGqlError(error);
    console.log("This error does not impact the cloning process and can be ignored")
  }
};


const handleGqlError = (error: any) => {
  if (error.response) {
    if (error.response.error) {
      const dom = new JSDOM(error.response.error);
      let specificError =
        dom?.window?.document?.querySelector('pre')?.textContent;
      if (specificError) console.log(specificError);
    }

    if (error.response.errors) {
      if (Array.isArray(error.response.errors)) {
        error.response.errors.forEach((err: any) => {
          console.log(err.message); // Assuming the error object has a message property
        });
      } else {
        console.log(error.response.errors);
      }
    }
  }
};
