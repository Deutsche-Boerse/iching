'use strict';
var Alexa = require('alexa-sdk');
var appId = process.env.APPID; // Set as environmental variable in Lambda itself.

/*
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('value1 =', event.key1);
    console.log('value2 =', event.key2);
    console.log('value3 =', event.key3);
    callback(null, event.key1);  // Echo back the first key value
    //callback('Something went wrong');
};
*/

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.appId = appId;
  alexa.dynamoDBTableName = 'ichingusers';
  alexa.execute();
};

var handlers = {
    "AMAZON.StopIntent": function() {
      this.emit(':tell', "Stop. Goodbye!");
    },
    "AMAZON.CancelIntent": function() {
      this.emit(':tell', "Cancel. Goodbye!");
    },
    'SessionEndedRequest': function () {
      this.emit(":tell", "Session ended. Goodbye!");
    },
    'iching': function () {
        this.emit(':tell', 'Iching listens to you!');
    },
    'Unhandled': function () {
        this.emit(':tell', 'Unhandled!');
    }
};