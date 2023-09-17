#!/usr/bin/env node

import { Command } from 'commander';
import deploy from './commands/deploy.js';
import clone from './commands/clone.js';
import build from './commands/build.js';

const program = new Command();

program.version('1.0.0').description('Bunzz CLI');

program
  .command('clone')
  .description('Clone a contract from the Bunzz frontend')
  .argument('<id>', 'ID of the contract to clone')
  .argument('[directory]', 'Name of the new directory')
  .option(
    '-e, --env <env>',
    'Environment to clone from [prod, local]',
    'prod'
  )
  .action((id, directory, options) => {
    let [chain, address] = id.split('_');

    const isValid =
      chain !== undefined && // Check if the chain is defined
      address !== undefined && // Check if the address is defined
      !isNaN(Number(chain)) && // Check if the chain is a number
      /^0x([A-Fa-f0-9]{2})+$/.test(address); // Check if the address is a valid hex string

    if (!isValid) {
      console.error('Invalid ID specified. Aborting command.');
      process.exit(1);
    }

    options.chain = chain;
    options.address = address;

    // If directory name is provided, overwrite the default directory name
    if (directory) {
      options.directory = directory;
    }

    program.opts = () => options;
  });

program
  .command('build')
  .description('Compile all smart contracts in the project')
  .option('-p, --path <path>', 'Path to the project folder', '.')
  .action((options) => {
    program.opts = () => options;
  });

program
  .command('deploy')
  .description('Deploy contract through the Bunzz frontend')
  .option('-p, --path <path>', 'Path to the contract to deploy', '.')
  .option('-c, --contract <contract>', 'name of the contract to deploy')
  .option(
    '-e, --env <env>',
    'Environment to deploy to [prod, local]',
    'prod'
  )
  .action((options) => {
    program.opts = () => options;
  });

program.parse(process.argv);

program.parse(process.argv);

const options = program.opts();

switch (program.args[0]) {
  case 'clone':
    clone(options);
    break;
  case 'build':
    build(options);
    break;
  case 'deploy':
    deploy(options);
    break;
}
