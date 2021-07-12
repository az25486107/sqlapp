import express from 'express'
import {hotels} from '../../models/hotels.js'

//啟用router函式
let router=express.Router();
router.route('/')
    .get(function(req,res){//當該地址使用get時
        hotels.item(req,function(err,results,fields){//操作hotels內的物件
            if(err){
                res.sendStatus(500)
                return console.error(err)
            } 
            if (!results.length) {
                res.sendStatus(404);
                return;
            }
 
            res.json(results);
        })
    })
    .patch(function(req,res){
        hotels.patch(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            } 
            if (!results.affectedRows) {
                res.sendStatus(410);
                return;
            }
            // response 被更新的資源欄位，但因 request 主體的欄位不包含 id，因此需自行加入
            req.body.id = req.params.id;
            res.json([req.body]);
        })
    })

router.route('/create')
    .post(function(req,res){
        hotels.add(req,function(err,result,fields){
            if(err){
                res.sendStatus(500)
                return console.error(err)
            }
        })
    })
router.route('/delete')
    .delete(function(req,res){
        hotels.delete(req,function(err,result,fields){
            if(err){
                res.sendStatus(500)
                return console.error(err)
            }
            if(!results.affectedRows){
                res.sendStatus(410)
                return
            }
            res.sendStatus(204)
        })
    })


export {router}