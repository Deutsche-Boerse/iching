exports.getPrice = function(isin) {
/*
    function SessionConnect(callback) {
        var dataString = JSON.stringify('');
        var headers = {};
        var options = {};

        if (sessionId !== null) {
            callback(sessionId);
        } else {

            headers = {
                'Content-Type': 'application/json'
            };
            options = {
                host: host,
                port: 443,
                path: '/session?lang=de&app=xetra.ios',
                method: 'POST',
                headers: headers
            };
            dataString = '{"login":"anonymus", "password":"anonymus", "email":"anonymus"}';

            var req = https.request(options, function(res) {
                //console.log("statusCode: ", res.statusCode);
                res.setEncoding('utf-8');
                var responseString = '';

                res.on('data', function(data) {
                    responseString += data;
                });

                res.on('end', function() {
                    //console.log("response session connect...");
                    //console.log(responseString);
                    //console.log("<<---");
                    var responseObject = JSON.parse(responseString);
                    sessionId = responseObject.sid;
                    callback(sessionId);

                });

            });
            req.on('error', function(e) {
                //console.error('HTTP(S) error: ' + e.message);
                callback('API request completed with error(s).');
            });
            //req.write(dataString);
            req.end(dataString);

        } // end if sessioId != null
    }
*/

    function GetShareInformation(callback) {
        var dataString = JSON.stringify('');
        var headers = {};
        var options = {};

        notFound = "NO";

        var endpoint = '/papers/' + isin + '?type=short';

        headers = {
            'Authorization': 'ebd93488-6362-470a-b353-cf8c740178fb'
        };

        options = {
            host: host,
            port: 443,
            path: endpoint,
            method: 'GET',
            headers: headers
        };

        var req = https.request(options, function(res) {
            res.setEncoding('utf-8');
            var responseString = '';

            res.on('data', function(data) {
                responseString += data;
            });

            res.on('end', function() {
                if (res.statusCode != 200) {
                    notFound = "YES";
                } else {
                    var responseObject = JSON.parse(responseString);
                    var exchange = "";
                    exchange = responseObject.listings[0].exchangeSymbol;
                    if (sharetype === "equity") {
                        if (exchange === "FRA") {
                            shareprice = responseObject.listings[0].price;
                            shareprice_old = responseObject.listings[0].yesterday;
                            sharetime = responseObject.listings[0].timestamp;
                        } else {
                            shareprice = responseObject.listings[1].price;
                            shareprice_old = responseObject.listings[1].yesterday;
                            sharetime = responseObject.listings[1].timestamp;
                        }
                    } else {
                        shareprice = responseObject.listings[0].price;
                        shareprice_old = responseObject.listings[0].yesterday;
                        sharetime = responseObject.listings[0].timestamp;
                    }
                    sharetime = sharetime.split("T");
                    sharetime = sharetime[0].split("-");
                    sharetime = sharetime[0] + sharetime[1] + sharetime[2];
                }
                callback(shareprice);
            });

            req.on('error', function() {
                notFound = "YES";
            });

        });

        req.on('error', function(e) {
            //console.error('HTTP(S) error: ' + e.message);
            callback('API request completed with error(s).');
        });

        req.end();
    }

}