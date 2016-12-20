'use strict';

var ghpages = require('gh-pages');
var path = require('path');
var jsdom = require("jsdom");
var fs = require("fs");

var filePath = path.join(__dirname, '../build/index.html');

function stripLeadingSlashes (window, attrName) {

  /*
    prepend all src and href attr
   */
  var elms = window.document.querySelectorAll('['+attrName+']');
  let index = 0;
  for( index=0; index < elms.length; index++ ) {
    let att = elms[index].getAttribute(attrName);
    att = att.replace(/^\//, '');
    console.log(attrName, ' replace ', att)
    elms[index].setAttribute(attrName, att);
  }

}

function setBaseURL(baseUrl, callback) {

  fs.readFile(filePath, 'utf8', function(error, data) {

      jsdom.env(data, [], function (errors, window) {
          console.log('???');
          var base = window.document.querySelector('base');

          console.log('base', base, !base);
          if (!base) {
            console.log('no base element.... creating one now');
            //insert before the first meta tag:
            var metaTag = window.document.querySelector('meta');
            var documentHead = window.document.querySelector('head');
            var firstChild = documentHead.firstChild;
            console.log('firstChild ', firstChild, documentHead, metaTag)
            base = window.document.createElement('base');
            documentHead.insertBefore(base, metaTag);
          }

          base.setAttribute('href', baseUrl);

          /*
            prepend all src and href attr
           */
          stripLeadingSlashes(window, 'src');
          stripLeadingSlashes(window, 'href');

          fs.writeFile(
            filePath, 
            window.document.documentElement.outerHTML,
            function (error){
              if (!error) {
                console.log('no errors');
                callback();
              } else {
                throw error 
              };
            }
          );

      });
  });
}

setBaseURL('https://amindunited.github.io/amu-react-web-audio-spike/', () => {
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
