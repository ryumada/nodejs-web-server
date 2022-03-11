const http = require('http');

const requestListener = (request, response) => {
  const {method} = request;
  response.setHeader('Content-Type', 'text/html');
  response.statusCode = 200;

  if(method === 'GET') {
    response.end('<h1>Hello!</h1>');
  }

  if(method === 'POST') {
    response.end('<h1>Hai!</h1>');
  }

  if(method === 'PUT') {
    response.end('<h1>Bonjour!</h1>');
  }

  if(method === 'DELETE') {
    response.end('<h1>Salam!</h1>');
  }
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`The Server is running at http://${host}:${port}`);
});
