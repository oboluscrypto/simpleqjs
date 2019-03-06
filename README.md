# simpleqjs
NodeJS library to Send and Receive message with SQS in AWS.

# Installation:

## 1. Run:
    npm i
    
## 2. Set config:
In `default.config.js` add table and action QueueURL provided by AWS SQS console.


## 3. Set aws permissions.
In Mac/Linux create the `credentials` file with:
    
    touch ~/.aws/credentials
Then paste the following inside the file changing `ACCESS_KEY_ID` and `SECRET_ACCESS_KEY` 
with the ID and Key from AWS account managing the Queue:

    [default] ; defaul account profile
    aws_access_key_id = <DEFAULT_ACCESS_KEY_ID>
    aws_secret_access_key = <DEFAULT_SECRET_ACCESS_KEY>
    
    [work-account] ; work account profile
    aws_access_key_id = <WORK_ACCESS_KEY_ID>
    aws_secret_access_key = <WORK_SECRET_ACCESS_KEY>
  
## 4. Run Example application:

    node receiver.js


# Things to consider when using SQS.
Max 300 TPS on FIFO queues per action. Can go to 3k in batch. Limit of 100k+ for non fifo Qs.

20K Max number of in flight messages (messages read but not deleted) per Q in FIFO. Non FIFO limit is 120k


## SQS Documentation in AWS:
   https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_DeleteMessageBatch.html
## DeDuplicationID:
If a message with a particular message deduplication ID is sent successfully,
any messages sent with the same message deduplication ID are accepted successfully but
aren't delivered during the 5-minute deduplication interval.

## Note

- Message deduplication applies to an entire queue, not to individual message groups.

- Amazon SQS continues to keep track of the message deduplication ID even after the message is received and deleted.

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


# Queues attributes in AWS console:
Name scheme:
network-project-datatype.fifo

ex: jungle-swictheos-action.fifo

    Default Visibility:         5 seconds

    Message Retention period:   4 days

    Max Message Size:           256 KB

    Delivery Delay:             0 seconds

    Receive message wait time:  20

    Content-based deDuplication: Yes
