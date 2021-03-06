/**
 * @title BTCMoon
 * @symbol BTCM
 * @ethContractAddr 0xa9aad2dc3a8315caeee5f458b1d8edc31d8467bd
 * @implementation Dynamic
 * @cmcId btcmoon
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xa9aad2dc3a8315caeee5f458b1d8edc31d8467bd?apiKey=freekey', (error, response, body) => {
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
