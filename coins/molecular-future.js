/**
 * @title Molecular Future
 * @symbol MOF
 * @ethContractAddr 0x653430560be843c4a3d143d0110e896c2ab8ac0d
 * @implementation Dynamic
 * @cmcId molecular-future
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x653430560be843c4a3d143d0110e896c2ab8ac0d?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -16)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
