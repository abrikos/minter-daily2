const fetch = require('node-fetch');
module.exports.http =  function f(url){
    return new Promise((resolve,reject) => {
        fetch(url)
            .then()
            .then(res=>res.json())
            .then(resolve)
            .catch(reject)
    })
};