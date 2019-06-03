const path = require('path');
const server = require(path.resolve(__dirname, '../server/server'));
const Functions = require('./functions')
const CONF = require('../client/config');

async function  getCrypto() {
    for(const crypto of CONF.crypto){
        const res = await cryptocompare('price', crypto.from, crypto.to, 0);
        await adCrypto(crypto.from,res)
    }
}

async function adCrypto(from,data) {
    for(const to of Object.keys(data)){
        const model = {from, to, price:data[to]*1};
        server.models.Crypto.create(model).then(console.log);
    }
}

async function cryptocompare(action,from,to,time) {
    const url = `https://min-api.cryptocompare.com/data/${action}?fsym=${from}&tsyms=${to}&ts=${time}&extraParams=your_app_name`;
    return await Functions.http(url)
}


getCrypto()