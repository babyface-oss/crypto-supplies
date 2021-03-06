/**
 * @title Lunyr
 * @symbol LUN
 * @ethContractAddr 0xfa05A73FfE78ef8f1a739473e462c54bae6567D9
 * @implementation Dynamic
 * @cmcId lunyr
 */
 
 module.exports = (callback, request) => {
 request('http://api.ethplorer.io/getTokenInfo/0xfa05A73FfE78ef8f1a739473e462c54bae6567D9?apiKey=freekey', (error, response, body) => {
     if (!error && response.statusCode == 200) {
         body = JSON.parse(body);

         var resp = {
             t: Number(body.totalSupply) * Math.pow(10, -18)
         };

         if (typeof body.price !== 'undefined' && typeof body.price.availableSupply !== 'undefined') {
             resp.c = Number(body.price.availableSupply);
         }

         callback(resp);
     } else {
         callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
     }
 });
 };
