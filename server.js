var express = require('express');
var httpProxy = require('http-proxy');

var apiURL = 'https://rapiddigital.zendesk.com/api/v2';

var server = express();

server.set('port', 4000);
server.use(express.static(__dirname + '/app'));

var proxyOptions = {
    changeOrigin: true
};

httpProxy.prototype.onError = function (err) {
    console.log(err);
};

var apiProxy = httpProxy.createProxyServer(proxyOptions);

console.log("Forwarding API requests to " + apiURL);

server.all("/tickets.json*", function(req, res) {
    //console.log("Request made!");
    apiProxy.web(req, res, {target: apiURL});
});

server.listen(server.get('port'), function() {
    console.log('Server listening on port ' + server.get('port'));
});