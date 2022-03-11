const http = require('http');

const requestListener = (request, response) => {
  const {method} = request;
  response.setHeader('Content-Type', 'text/html');
  response.statusCode = 200;

  if(method === 'GET') {
    response.end('<h1>Hello!</h1>');
  }

  if(method === 'POST') {
    let body = [];

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      body = Buffer.concat(body).toString();
      const {name} = JSON.parse(body);
      response.end(`<h1>Hai ${name}!</h1>`);
    });
  }
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`The Server is running at http://${host}:${port}`);
});

// Try the POST Methods by running this shell script, after you run npm run start
// curl -X POST -H "Content-Type: application/json" http://localhost:5000 -d "{\"name\": \"Ryumada\"}"
