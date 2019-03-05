module.exports = {
    config : {
        aws: {
            region: 'ap-northeast',
            profile: 'default', // For permission
            sqs: {
                "actions": "https://...",
                "tables": "https://..."
            }
        }
}
}
