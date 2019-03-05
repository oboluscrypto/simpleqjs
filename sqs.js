

/*n Things to consider when using SQS.
Max 300 TPS on FIFO queues per action. Can go to 3k in batch. Limit of 100k+ for non fifo Qs.

20K Max number of in flight messages (messages read but not deleted) per Q in FIFO. Non FIFO limit is 120k



# DeDuplicationID:
If a message with a particular message deduplication ID is sent successfully,
any messages sent with the same message deduplication ID are accepted successfully but
aren't delivered during the 5-minute deduplication interval.

Note

## Message deduplication applies to an entire queue, not to individual message groups.

## Amazon SQS continues to keep track of the message deduplication ID even after
the message is received and deleted.

For full detail see:
(https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagededuplicationid-property.html)


# Message Groups:
The message group ID is the tag that specifies that a message belongs to a specific message group.
Messages that belong to the same message group are always processed one by one, in a strict order
relative to the message group (however, messages that belong to different message groups might be
processed out of order).


# Long Pooling and AWS servers.

If the parameter WaitTimeSeconds is set to 0, the pooling happens in a subset of all AWS servers looking
for messages. If no message is found the request returns without any message.

For our design, it makes sense to set WaitTimeSeconds to 20 (max), in this way, the pooling will take as
long as necessary to find a message and immediately return.


# QUEUES Attributes in AWS console:
Name scheme:
network-project-datatype.fifo
ex: jungle-swictheos-action.fifo

Default Visibility:         5 seconds
Message Retention period:   4 days
Max Message Size:           256 KB
Delivery Delay:             0 seconds
Receive message wait time:  20
Content-based deDuplication: Yes

*/

class SQS {
    constructor(config, queueURL) {
        //const {config}  = require("./localhost.config")
        const AWS = require('aws-sdk');
        // Set the region:
        AWS.config.update({region: config.aws.region});

        // Set credentials, or run with Environment variable like: AWS_PROFILE=work-account node script.js
        const credentials = new AWS.SharedIniFileCredentials({profile: config.aws.profile});
        AWS.config.credentials = credentials;

        // Create an SQS service object
        this.sqs = new AWS.SQS({apiVersion: '2019-03-01'});
        this.queueURL = queueURL;
    }

    makeid(n = 5) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < n; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    send(MessageBody, msgAttr={}, groupID="genericGroud") {
        var params = {
            MessageGroupId: groupID,
            MessageDeduplicationId: `${this.makeid(32)}`,
            //DelaySeconds: "10",
            MessageAttributes: msgAttr,
            MessageBody: MessageBody,
            QueueUrl: this.queueURL
        };
        let Q_name = this.queueURL.split("/").pop()
        this.sqs.sendMessage(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log(`Sent to Group ${groupID} on Queue: ${Q_name}`);
            }
        });
    }

    deleteMsg(data){
        let deleteParams = {
            QueueUrl: this.queueURL,
            ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        this.sqs.deleteMessage(deleteParams, function (err, data) {
            if (err) {
                console.log("Delete Error", err);
            } else {
                console.log("Messages Deleted",data);
            }
        });

    }

    receiveCB(msgProcessorCB, err, data) {
        msgProcessorCB(data,err);
        console.log("No problem while processing the data.")
        if (err) {
            console.log("Receive Error", err);
        } else if (data.Messages) {
            console.log("Deleting the Msgs")
            this.deleteMsg(data)
        }
    };

    receive(msgProcessorCB,
            SecondsUntilProcessed=5,
            MaxNumberOfMessages=5,
            MaxPoolingTime=20) {
        let params = {
            AttributeNames: [ "SentTimestamp" ],
            MaxNumberOfMessages: MaxNumberOfMessages,
            MessageAttributeNames: [ "All" ],
            QueueUrl: this.queueURL,
            VisibilityTimeout: SecondsUntilProcessed, // If in `SecondsUntilProcessed` seconds the message is not deleted it will be visible to workers again
            WaitTimeSeconds: MaxPoolingTime,
        };

        this.sqs.receiveMessage(params, this.receiveCB.bind(this, msgProcessorCB))
    }

}

class Msg{
    constructor(msgBody){
        this.body = JSON.stringify(msgBody)
        this.attributes = {}
    }
    add_attr(name, dataType, value){
        this.attributes[name] = {"DataType": dataType,"StringValue": `${value}`}
    }
}


// const {config}  = require("./default.config")
// sqs = new SQS(config:config, queueURL:config.aws.sqs.misc);
//
// msg = new Msg("Information about current NY Times fiction bestseller for week of 12/11/2016.");
// msg.add_attr("Tittle", "String", "The Whistler")
// msg.add_attr("Author", "String", "John Grisham")
// msg.add_attr("WeeksOn", "Number", 6)
//
//
// sqs.send(msg.body,msg.attributes, groupID=sqs.makeid(32));
// sqs.receive();

module.exports = {SQS, Msg};
