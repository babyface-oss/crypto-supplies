/**
 * @title SmartMesh
 * @symbol SMT
 * @ethContractAddr 0x55f93985431fc9304077687a35a1ba103dc1e081
 * @implementation Dynamic
 * @cmcId smartmesh
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x55f93985431fc9304077687a35a1ba103dc1e081?apiKey=freekey', (error, response, body) => {
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
