module.exports = {
    config : {
        aws: {
            region: 'ap-northeast',
            profile: 'default', // For permission
            sqs: {
                "actions": "https://sqs.ap-northeast-1.amazonaws.com/338578545282/jungle-switcheos-actions.fifo",
                "tables": "https://sqs.ap-northeast-1.amazonaws.com/338578545282/jungle-switcheos-tables.fifo"
            }
        }
}
}
