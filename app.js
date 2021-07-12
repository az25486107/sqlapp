import {conf} from './conf.js';
import bodyParser from 'body-parser';
import express from 'express';

import {functions} from './functions.js';
import { router as router_acc } from './routes/accounts.js'; 
import { router as router_attracions } from './routes/api/attractions.js'; 
import { router as router_restaurants } from './routes/api/restaurants.js'; 
import { router as router_hotels } from './routes/api/hotels.js'; 
import cors from 'cors'

let router_arr={
    "hotels":router_hotels,
    "attractions":router_attracions,
    "restaurants":router_restaurants
}

var app = express();
// 使用 bodyparser.json() 將 HTTP 請求方法 POST、DELETE、PUT 和 PATCH，放在 HTTP 主體 (body) 發送的參數存放在 req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.text({type:'*/*'}))
app.use(cors()) 

app.use(functions.passwdCrypto);

//使用router設定
for(let rout in router_arr)
    app.use("/api/"+rout, router_arr[rout]);

// 監聽哪個port
app.listen(conf.port, function () {
    console.log('app listening on port ' + conf.port + '!');
});

