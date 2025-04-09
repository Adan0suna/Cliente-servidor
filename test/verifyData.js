const mongoose = require('mongoose');
const Account = require('../models/Account');

mongoose.connect('mongodb://127.0.0.1:27017/bank_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Conectado a MongoDB');
    
    // Obtener todas las cuentas
    const cuentas = await Account.find({});
    
    console.log('\n=== ESTADO ACTUAL DE LAS CUENTAS ===');
    cuentas.forEach(cuenta => {
        console.log(`\nCuenta de ${cuenta.owner}:`);
        console.log('Número de cuenta:', cuenta.accountNumber);
        console.log('Saldo:', cuenta.balance);
        console.log('Estado de bloqueo:', cuenta.isLocked ? 'Bloqueada' : 'Desbloqueada');
    });
    
    await mongoose.connection.close();
}); 