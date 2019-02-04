const http = require('http');
const app = require('./app');

// Get port # from enviornment variable or use port 6000
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);