(async () => {
    const db = require("./test");

    const clientes = await db.selectCustomers();
    
    if (clientes[3].nm_usuario == 'Luan') {
        console.log("Deu certo!")
        
    }

    console.log(clientes[3].nm_usuario)
    console.log(clientes)

})()