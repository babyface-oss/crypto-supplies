/**
 * @title SONM
 * @symbol SNM
 * @ethContractAddr 0x983f6d60db79ea8ca4eb9968c6aff8cfa04b3c63
 * @implementation Dynamic
 * @cmcId sonm
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x983f6d60db79ea8ca4eb9968c6aff8cfa04b3c63?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -18)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
