const createServer = require('http').createServer;
const url = require('url');
const axios = require('axios');
const chalk = require('chalk');
const config = require('./config');

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
  };

// helper function which will decode the url, search promises
// ?search=php&location=london
const decodeParams = searchParams => Array
.from(searchParams.keys())
.reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) }), {});

//setting server which creates requests and send them to adzuna api
const server = createServer((req, res) => {
    const requestURL = url.parse(req.url);
    // { search: php, location: 'london'}
    const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
    const { search, location, country = 'us' }  = decodedParams;
    const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${config.BASE_PARAMS}&app_id=2225943a&app_key=${config.API_KEY}&what=${search}&where=${location}`;

    //send this data to axios in a safe manner
    if (req.method === 'GET') {
        console.log(chalk.green(`Proxy GET request to : ${targetURL}`));
        axios.get(targetURL)
          .then(response => {
            res.writeHead(200, headers);
            res.end(JSON.stringify(response.data));
          })
          .catch(response => {
            console.log(chalk.red(response));
            res.writeHead(500, headers);
            res.end(JSON.stringify(response));
          });
      } 
  });

  //set the server listening
  server.listen(9000, () => {
    console.log(chalk.green('Server listening'));
  } );

