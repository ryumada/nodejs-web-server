/* -------------------------------------------------------------------------- */
/*                    Writable Stream for writing Response                    */
/* -------------------------------------------------------------------------- */

const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html');

  const { method, url } = request;

  if(url === '/') {
    if(method === 'GET') {
      response.statusCode = 200;
      response.write('<!DOCTYPE html>');
      response.write('<html lang="en">');
      response.write('<head>');
      response.write('  <meta charset="UTF-8">');
      response.write('  <meta http-equiv="X-UA-Compatible" content="IE=edge">');
      response.write('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
      response.write('  <title>Document</title>');
      response.write('</head>');
      response.write('<body>');
      response.write('<h1>This is a homepage!</h1>');
      response.write('</body>');
      return response.end('</html>');
    }

    response.statusCode = 400;
    response.write('<!DOCTYPE html>');
    response.write('<html lang="en">');
    response.write('<head>');
    response.write('  <meta charset="UTF-8">');
    response.write('  <meta http-equiv="X-UA-Compatible" content="IE=edge">');
    response.write('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
    response.write('  <title>Document</title>');
    response.write('</head>');
    response.write('<body>');
    response.write('<h1>Page cannot be accessed by other request.</h1>');
    response.write('</body>');
    return response.end('</html>');
  }

  if(url === '/about') {
    if(method === 'GET') {
      response.statusCode = 200;
      response.write('<!DOCTYPE html>');
      response.write('<html lang="en">');
      response.write('<head>');
      response.write('  <meta charset="UTF-8">');
      response.write('  <meta http-equiv="X-UA-Compatible" content="IE=edge">');
      response.write('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
      response.write('  <title>Document</title>');
      response.write('</head>');
      response.write('<body>');
      response.write('<h1>Hello, this is an about page!</h1>');
      response.write('</body>');
      return response.end('</html>');
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
        response.write('<!DOCTYPE html>');
        response.write('<html lang="en">');
        response.write('<head>');
        response.write('  <meta charset="UTF-8">');
        response.write('  <meta http-equiv="X-UA-Compatible" content="IE=edge">');
        response.write('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
        response.write('  <title>Document</title>');
        response.write('</head>');
        response.write('<body>');
        response.write(`<h1>Hi ${name}, this is an about page.</h1>`);
        response.write('</body>');
        return response.end('</html>');
      });
    }

    response.statusCode = 400;
    response.write('<!DOCTYPE html>');
    response.write('<html lang="en">');
    response.write('<head>');
    response.write('  <meta charset="UTF-8">');
    response.write('  <meta http-equiv="X-UA-Compatible" content="IE=edge">');
    response.write('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
    response.write('  <title>Document</title>');
    response.write('</head>');
    response.write('<body>');
    response.write('<h1>Page cannot be accessed by other request.</h1>');
    response.write('</body>');
    return response.end('</html>');
  }

  response.statusCode = 404;
  response.write('<!DOCTYPE html>');
  response.write('<html lang="en">');
  response.write('<head>');
  response.write('  <meta charset="UTF-8">');
  response.write('  <meta http-equiv="X-UA-Compatible" content="IE=edge">');
  response.write('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
  response.write('  <title>Document</title>');
  response.write('</head>');
  response.write('<body>');
  response.write('<h1>Page Not Found!</h1>');
  response.write('</body>');
  return response.end('</html>');
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`The Server is running at http://${host}:${port}`);
});
