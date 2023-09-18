// Require the dotenv package
require("dotenv").config();

// Import the spheron site sdk
const { SpheronClient, ProtocolEnum } = require("@spheron/site");

// Initialize the spheron site sdk with your token from the .env file
const client = new SpheronClient({ token: process.env.SPHERON_TOKEN });

// Initialize the spheron site sdk with your siteId and apiKey
spheron.init(process.env.SITE_ID, process.env.SPHERON_TOKEN);

const bunzz = require('@bunzz/sdk');

bunzz.init(process.env.SITE_ID, process.env.SPHERON_TOKEN);