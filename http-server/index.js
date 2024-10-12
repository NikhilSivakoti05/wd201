const httpModule = require("http");
const fileSystem = require("fs").promises;
const argsParser = require("minimist");

// Parse command-line arguments and set port
const arguments = argsParser(process.argv.slice(2));
const portNumber = arguments.port || 3000;

// Store HTML file contents
let mainPage = "";

let projectPage = "";

let registerPage = "";

// Function to load HTML files asynchronously
const initializeServer = async () => {
  try {
    mainPage = await fileSystem.readFile("home.html", "utf-8");
    projectPage = await fileSystem.readFile("project.html", "utf-8");
    registerPage = await fileSystem.readFile("registration.html", "utf-8");

    // Create the HTTP server
    httpModule.createServer((request, response) => {
      const path = request.url;
      response.writeHead(200, { "Content-Type": "text/html" });

      // Serve different pages based on URL path
      switch (path) {
        case "/project":
          response.write(projectPage);
          break;
        case "/registration":
          response.write(registerPage);
          break;
        default:
          response.write(mainPage);
          break;
      }
      response.end();
    }).listen(portNumber);

    console.log(`Server is running on port ${portNumber}`);
  } catch (error) {
    console.error("Error loading files:", error);
  }
};

// Initialize the server
initializeServer();

// Example to demonstrate async behavior
console.log('hiii');
setTimeout(function() {
   console.log('Good morning');
}, 5000);
console.log('how are you');
