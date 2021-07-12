import express from 'express'
import {restaurants} from '../../models/restaurants.js'

//啟用router函式
let router=express.Router();
router.route('/')
    .get(function(req,res){//當該地址使用get時
        restaurants.item(req,function(err,results,fields){//操作restaurants內的物件
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
        restaurants.patch(req, function (err, results, fields) {
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
        restaurants.add(req,function(err,result,fields){
            if(err){
                res.sendStatus(500)
                return console.error(err)
            }
        })
    })
router.route('/delete')
    .delete(function(req,res){
        restaurants.delete(req,function(err,result,fields){
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