const minimist = require('minimist');

// Use minimist to parse command-line arguments
const args = minimist(process.argv.slice(2));

// Extract the port from the command-line arguments as per our lesson using minimist
const port = args.port || 3000;  // Default to 3000 if port is not provided for ignoring issues in future
