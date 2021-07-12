import * as mysql from 'mysql'
import {conf} from '../conf.js'


let connection = mysql.createConnection(conf.db);
let sql = ''
let rule=''
let attractions= {
    items: function (req, callback) {
        sql = 'SELECT * FROM attractions';
        return connection.query(sql, callback);
    },
    item: function (req, callback) {
        sql = 'SELECT * FROM attractions';
        let param=[]
        let attr=[" "]
        if (JSON.stringify(req.query)!=='{}'){
            for (let idx in  req.query){
                attr.push(idx+'= ?')
                param.push(req.query[idx])
            }
            rule=attr.join(' and ') 
        }
        sql = mysql.format('SELECT * FROM attractions where Atphoto <>""  '+rule+' order by rand() limit 100', param);
        return connection.query(sql, callback);
    },
    add: function (req, callback) {
        sql = mysql.format('INSERT INTO attractions SET ?', req.body);
        return connection.query(sql, callback);
    },
    delete: function (req, callback) {
        sql = mysql.format('DELETE FROM attractions WHERE id = ?', [req.params.id]);
        return connection.query(sql, callback);
    },
    put: function (req, callback) {
        // 使用 SQL 交易功能實現資料回滾，因為是先刪除資料在新增，且 Key 值須相同，如刪除後發現要新增的資料有誤，則使用 rollback() 回滾
        connection.beginTransaction(function (err) {
            if (err) throw err;
             
            sql = mysql.format('DELETE FROM attractions WHERE id = ?', [req.params.id]);
 
            connection.query(sql, function (err, results, fields) {
                // SQL DELETE 成功 results.affectedRows 會返回 1，反之 0
                if (results.affectedRows) {
                    req.body.id = req.params.id;
                    sql = mysql.format('INSERT INTO attractions SET ?', req.body);
                     
                    connection.query(sql, function (err, results, fields) {
                        // 請求不正確
                        if (err) {
                            connection.rollback(function () {
                                callback(err, 400);
                            });
                        } else {
                            connection.commit(function (err) {
                                if (err) callback(err, 400);
     
                                callback(err, 200);
                            });
                        }                        
                    });
                } else {
                    // 指定的資源已不存在
                    callback(err, 410);
                }
            });
        });
    },
    patch: function (req, callback) {       
        sql = mysql.format('UPDATE attractions SET ? WHERE id = ?', [req.body, req.params.id]);
        return connection.query(sql, callback);
    }
};

export {attractions}