const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html');

  const { method, url } = request;

  if(url === '/') {
    if(method === 'GET') {
      response.statusCode = 200;
      return response.end('<h1>This is a homepage!</h1>');
    }

    response.statusCode = 400;
    return response.end('<h1>Page cannot be accessed by other request.</h1>');
  }

  if(url === '/about') {
    if(method === 'GET') {
      response.statusCode = 200;
      return response.end('<h1>Hello, this is an about page!</h1>');
    }
    
    if(method === 'POST') {
      let body = [];

      request.on('data', (chunk) => {
        body.push(chunk);
      });

      return request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(`<h1>Hi ${name}, this is an about page.</h1>`);
      });
    }

    response.statusCode = 400;
    return response.end('<h1>Page cannot be accessed by other request.</h1>');
  }

  response.statusCode = 404;
  return response.end('<h1>Page Not Found!</h1>');
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`The Server is running at http://${host}:${port}`);
});
