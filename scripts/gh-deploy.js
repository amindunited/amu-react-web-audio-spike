var ghpages = require('gh-pages');
var path = require('path');
var jsdom = require("jsdom");
var fs = require("fs");

var filePath = path.join(__dirname, '../build/index.html');

function setBaseURL(baseUrl, callback) {

  fs.readFile(filePath, 'utf8', function(error, data) {

      jsdom.env(data, [], function (errors, window) {
          var base = window.document.querySelector('base');
          base.setAttribute('href', baseUrl);

          fs.writeFile(
            filePath, 
            window.document.documentElement.outerHTML,
            function (error){
              if (!error) {
                callback();
              } else {
                throw error 
              };
            }
          );

      });
  });
}
//'amu-react-webaudio-spike/'

setBaseURL('https://amindunited.github.io/amu-react-web-audio-spike', () => {
  ghpages.publish(path.join(__dirname, '../build'), function(err) {
    console.log('Attempting to deploy \'./build\' to Github Pages');
    if (!err) {
      setBaseURL('/', function () {
        console.log('index.html restored');
      });
      console.log('Deployed!');
    } else {
      console.log(err);
    }
  });
});
