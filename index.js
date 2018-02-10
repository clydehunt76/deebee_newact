'use strict';
var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'eu-west-1'
});

exports.handler = function(event, context, callback) {
    console.log("Incoming: ", event);
   // var output = querystring.parse(event);

   var newActResponse = "";

   newActResponse += "Act Name: " + event.slots.actName + "\n\n"
   newActResponse += "Act Genre: " + event.slots.actGenre + "\n\n"
   newActResponse += "Contact Name: " + event.slots.actContactName + "\n\n"
   newActResponse += "Email Address: " + event.slots.actEmail + "\n\n"
   newActResponse += "Phone: " + event.slots.actPhone + "\n\n"
   newActResponse += "Cost: " + event.slots.actCost + "\n\n"

   if(actURL != "http://no") {
    newActResponse += "Sample: " + event.slots.actURL    
   }
   
    var eParams = {
        Destination: {
            ToAddresses: ["clydehunt76@gmail.com"]
        },
        Message: {
            Body: {
                Text: {
                    Data: newActResponse
                }
            },
            Subject: {
                Data: "New Act Request"
            }
        },
        Source: "clydehunt@yahoo.co.uk"
//        Source: "noreply@dannyboyjazzandblues.com"
    };

    console.log('===SENDING EMAIL===');
    var email = ses.sendEmail(eParams, function(err, data){
        if(err) console.log(err);
        else {
            console.log("===EMAIL SENT===");
            console.log(data);


            console.log("EMAIL CODE END");
            console.log('EMAIL: ', email);
            context.succeed(event);

        }
    });

    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }

};


// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message
        },
    };
}
     
// --------------- Events -----------------------
 
function dispatch(intentRequest, callback) {

    console.log("data:", intentRequest)
    var sessionAttributes = {};
    callback(close(sessionAttributes, 
        'Fulfilled', 
        {'contentType': 'PlainText', 'content': 'DeeBee thanks you for the information. Someone will be in touch if a suitable slot is available'}));
}