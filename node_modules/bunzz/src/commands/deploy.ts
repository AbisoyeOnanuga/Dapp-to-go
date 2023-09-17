import fs from 'fs';
import jsonfile from 'jsonfile';
import open from 'open';
import path from 'path';
import {
  LOCAL_FE,
  PROD_FE,
  sendArtifacts,
} from '../utils/gql.js';

const getRootContractNameFromConfig = (projectPath: string): string => {
  // There is a bunzz.config.json file
  // Read contractName from it

  const bunzzConfigPath = path.join(projectPath, 'bunzz.config.json');

  if (!fs.existsSync(bunzzConfigPath)) {
    throw new Error(
      'No bunzz.config.json file found. Please specifiy a contract name with -c.'
    );
  }

  const bunzzConfig = jsonfile.readFileSync(bunzzConfigPath);

  if (!bunzzConfig.contractName) {
    throw new Error(
      'No contractName found in bunzz.config.json. Please specify a contractName.'
    );
  }

  return bunzzConfig.contractName;
};

const getArtifacts = (
  projectPath: string,
  rootContractName: string
): {
  ABI: any;
  bytecode: string;
} => {
  function findInDir(dir: string, filename: string) {
    let results: string[] = [];

    fs.readdirSync(dir).forEach((dirInner) => {
      dirInner = path.resolve(dir, dirInner);
      const stat = fs.statSync(dirInner);

      if (stat.isDirectory()) {
        results = results.concat(findInDir(dirInner, filename));
      }

      if (stat.isFile() && path.basename(dirInner) === filename) {
        results.push(dirInner);
      }
    });

    return results;
  }

  // Find the compiled contract in the artifacts folder
  const contractNameJson = `${rootContractName}.json`;
  const artifactsDirectories = path.join(projectPath, 'artifacts');

  const contractPaths = findInDir(artifactsDirectories, contractNameJson);

  if (!contractPaths.length) {
    throw new Error(
      `Contract ${rootContractName} not found in artifacts folder. Exiting.`
    );
  }

  try {
    // read the json file
    const contractJson = fs.readFileSync(contractPaths[0], 'utf8');
    // parse the json
    const contract = JSON.parse(contractJson);
    const ABI = contract.abi;
    const bytecode = contract.bytecode;

    const path = contractPaths[0];
    const startIndex = path.indexOf('artifacts');
    const truncatedPath = path.substring(startIndex);

    console.log(`Found contract ${rootContractName} in ${truncatedPath}`);

    return { ABI, bytecode };
  } catch (e: any) {
    throw new Error(
      `Error occurred when reading contract ${rootContractName}: ${e.message}`
    );
  }
};

const openFrontend = async (options: any, id: string): Promise<void> => {
  let url;

  switch (options.env) {
    case 'local':
      url = LOCAL_FE;
      break;
    default:
      url = PROD_FE;
      break;
  }

  const finalUrl = `${url}/deploy/${id}`;
  try {
    await open(finalUrl);
  } catch (e: any) {
    throw new Error(
      `Failed to open browser at ${finalUrl}, please open manually.`
    );
  }
};

const main = async (options: any) => {
  const projectPath = path.resolve(options.path || process.cwd());
  let rootContractName = options.contract;

  try {
    if (!rootContractName) {
      rootContractName = getRootContractNameFromConfig(projectPath);
    }
    console.log(
      `Deploying contract ${rootContractName}${
        options.env !== 'prod' ? ` to ${options.env} environment` : ``
      }\n`
    );

    const { ABI, bytecode } = getArtifacts(projectPath, rootContractName);
    const id = await sendArtifacts(options, ABI, bytecode, rootContractName);
    await openFrontend(options, id);
    console.log('Done');
  } catch (e: any) {
    console.error(e.message);
  }
};

export default main;
