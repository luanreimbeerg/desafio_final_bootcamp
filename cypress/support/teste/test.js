async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') 
        return global.connection;   
    
    var mysql      = require('mysql2/promise');
    var connection = await mysql.createConnection("mysql://root:1234@localhost:3306/_5MnijCqZkfContext")
    console.log("Conectou");
    global.connection = connection;
    
    return connection;
    
}


async function selectCustomers (){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM TB_USUARIO;')
    return await rows;
}

module.exports = {selectCustomers}