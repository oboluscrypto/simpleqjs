const {SQS, Msg} = require("./sqs")
const {config}  = require("./default.config")


function process_SQS_Msg(data,err){
    console.log("GOT MESSAGES")
    for (msg of data.Messages){
        //console.log(msg);
        console.log(msg.Body);
    }
}

async function fetchMsgs()
{

    tables = new SQS(config, config.aws.sqs.tables);
    actions = new SQS(config, config.aws.sqs.actions);

    console.log("Fetching Table Deltas:");
    await tables.receive(process_SQS_Msg,
        SecondsUntilProcessed=1,
        MaxNumberOfMessages=10,
        MaxPoolingTime=20);

    console.log("Fetching Actions:")
    await actions.receive(process_SQS_Msg,
        SecondsUntilProcessed=5,
        MaxNumberOfMessages=2,
        MaxPoolingTime=20);
}

fetchMsgs();
