let order1 =
    { account: 'obolusswitc4',
        name: 'placeorder',
        authorization: [ { actor: 'bouncebanana', permission: 'active' } ],
        data:
            { user: 'bouncebanana',
                isBid: true,
                baseVol: '0.10000000 TOOK',
                quotePrice: '0.00010000 EOS',
                baseAcc: 'obolus3token',
                quoteAcc: 'eosio.token',
                boardId: '3' },
        block_num: 17087176,
        block_time: '2019-03-06T18:58:04.500',
        cpu: 487,
        receiver_sequence: '77',
        global_sequence: '216735599' };

let order2 = { account: 'obolusswitc4',
    name: 'dplaceorder',
    authorization: [ { actor: 'frozenmaguro', permission: 'active' } ],
    data:
        { user: 'frozenmaguro',
            isBid: false,
            baseVol: '0.10000000 TOOK',
            quotePrice: '0.00010000 EOS',
            baseAcc: 'obolus3token',
            quoteAcc: 'eosio.token',
            boardId: '3' },
    block_num: 17093515,
    block_time: '2019-03-06T19:54:15.500',
    cpu: 834,
    receiver_sequence: '88',
    global_sequence: '217001322' }

let order2a = { account: 'obolusswitc4',
    name: 'placeorder',
    authorization: [ { actor: 'obolusswitc4', permission: 'active' } ],
    data:
        { user: 'frozenmaguro',
            isBid: false,
            baseVol: '0.10000000 TOOK',
            quotePrice: '0.00010000 EOS',
            baseAcc: 'obolus3token',
            quoteAcc: 'eosio.token',
            boardId: '3' },
    block_num: 17093516,
    block_time: '2019-03-06T19:54:16.000',
    cpu: 4495,
    receiver_sequence: '89',
    global_sequence: '217001377' };


let trade = {
    account: 'obolusswitc4',
    name: 'regtrade',
    authorization: [ { actor: 'obolusswitc4', permission: 'active' } ],
    data:
        { makerOrder: '22',
            takerOrder: '23',
            takerAcc: 'frozenmaguro',
            takerIsBid: false,
            quantity: '0.10000000 TOOK',
            price: '0.00010000 EOS' },
    block_num: 17092776,
    block_time: '2019-03-06T19:47:44.000',
    cpu: 1692,
    receiver_sequence: '82',
    global_sequence: '216971267'};


let cancel = {
    account: 'obolusswitc4',
    name: 'cancel',
    authorization: [ { actor: 'frozenmaguro', permission: 'active' } ],
    data: { user: 'frozenmaguro', orderID: '36', boardId: '3' },
    block_num: 17100748,
    block_time: '2019-03-06T20:58:21.500',
    cpu: 361,
    receiver_sequence: '111',
    global_sequence: '217301709' }


let balanceDelta = {
    type: 'table_delta',
    data:
        { 'block num': 17100748,
            block_time: '2019-03-06T20:58:21.500',
            'row version': 0,
            code: 'obolusswitc4',
            scope: 'frozenmaguro',
            table: 'balances',
            primary_key: 11666888609874844000,
            payer: 'obolusswitc4',
            Data:
                { tokenAcc: 'obolus3token',
                    bal: '99.20000000 TOOK',
                    posted: '0.00000000 TOOK' }
        }
}

let offerDelta = {
    type: 'table_delta',
    data:
        { 'block num': 17100748,
            block_time: '2019-03-06T20:58:21.500',
            'row version': 0,
            code: 'obolusswitc4',
            scope: '............3',
            table: 'orderbook',
            primary_key: 36,
            payer: 'obolusswitc4',
            Data:
                { order:
                        { id: '36',
                            account: 'frozenmaguro',
                            isbid: false,
                            quotePrice: '0.00010000 EOS',
                            baseVol: '0.10000000 TOOK',
                            boardId: '3' }
                }
        }
}