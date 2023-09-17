# Bunzz CLI

The Bunzz Command Line Interface (CLI) tool provides a streamlined method for developers to interact with the Bunzz platform. This guide outlines how to install and use the Bunzz CLI.

## Installation

**Prerequisites:** You will need to have Node.js and npm or yarn installed on your system. If you do not have these, you can download and install them from [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).
With npm:

```sh
npm install -g bunzz
```

With yarn:

```sh
yarn global add bunzz
```

With pnpm:

```sh
pnpm install -g bunzz
```

## Usage

The Bunzz CLI provides several commands that enable you to clone, build, and deploy projects. Here is a summary of these commands:

- **bunzz -h:** Show help information and version details.

- **bunzz clone <id> [directory] [options]:** Clone a contract documented by DeCipher. The options you can use with this command include:

  - `-e, --env <env>`: Environment to clone from [prod, local] (default: "prod").

- **bunzz build:** Compile all smart contracts in the current directory.

- **bunzz deploy [options]:** Send the ABI and bytecode of a contract to the DeCipher frontend for deployment. The options you can use with this command include:

  - `-p, --path <path>`: Path to the contract to deploy (default: ".")
  - `-c, --contract <contract>`: Name of the contract to deploy. (default will be taken from `bunzz.config.js`)
  - `-e, --env <env>`: Environment to deploy to [prod, local] (default: "prod").

To learn more about a specific command and its options, you can type `bunzz help [command]`.

## Example usage

Here are some examples of how to use the Bunzz CLI:

- To get help on the `clone` command:

  ```sh
  bunzz clone -h
  ```

- To clone, build, and deploy a contract:

  ```sh
  bunzz clone 1_0x1234567890abcdef1234567890abcdef12345678 optionalDirectoryName
  cd optionalDirectoryName
  bunzz build
  bunzz deploy
  ```
