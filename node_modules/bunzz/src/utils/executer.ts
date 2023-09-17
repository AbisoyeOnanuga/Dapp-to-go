import { exec } from 'child_process';

export async function execute(
  command: string,
  projectPath: string,
  options = { log: false, cwd: projectPath }
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(command, { ...options }, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({ stdout, stderr });
    });
  });
}

export const initNpmRepository = async (projectPath: string) => {
  // Initialize the npm repository
  try {
    console.log('Initializing npm repository...');
    await execute('npm init -y', projectPath, {
      log: false,
      cwd: projectPath,
    });
    console.log('npm repository successfully initialized.');

    await installHardhat(projectPath);
  } catch (e: any) {
    console.error(e.message);
  }
};

export const installHardhat = async (projectPath: string) => {
  try {
    console.log('Installing Hardhat...');
    await execute(`npm install --save-dev hardhat`, projectPath, {
      log: false,
      cwd: projectPath,
    });
  } catch (e) {
    console.error(e);
  }

  console.log('Hardhat successfully installed.');
};
