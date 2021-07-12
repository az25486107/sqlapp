let conf = {
    db: {
        user: 'root',
        password: '',
        host: 'localhost',
        port: '3306',
        database: 'test',
        waitForConnections: true,
        connectionLimit: 10 //連線數上限
    },
    port: 25555,
    // 自訂密碼的加鹽
    salt: '@2#!A9x?3'
};

export {conf}