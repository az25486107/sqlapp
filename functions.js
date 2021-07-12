
import * as crypto from "crypto"
import * as conf from './conf.js';
let functions = {
    // 將明文密碼加密
    passwdCrypto: function (req, res, next) {
        if (req.body.password) {
            req.body.password = crypto.createHash('md5')
                                .update(req.body.password + conf.salt)
                                .digest('hex');
        }
 
        next();
    }
};

export {functions}