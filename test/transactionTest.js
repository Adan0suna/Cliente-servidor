const mongoose = require('mongoose');
const Account = require('../models/Account');
const { transfer } = require('../controllers/transactionController');

// Configurar mongoose
mongoose.set('strictQuery', false);

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bank_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1);
});

async function runTest() {
    try {
        // Limpiar la base de datos
        await Account.deleteMany({});

        // Crear dos cuentas de prueba
        const cuenta1 = await Account.create({
            accountNumber: '001',
            balance: 1000,
            owner: 'Juan'
        });

        const cuenta2 = await Account.create({
            accountNumber: '002',
            balance: 500,
            owner: 'María'
        });

        console.log('Estado inicial:');
        console.log('Cuenta 1:', cuenta1.balance);
        console.log('Cuenta 2:', cuenta2.balance);

        // Realizar una transferencia exitosa
        console.log('\nRealizando transferencia de 300...');
        await transfer(cuenta1._id, cuenta2._id, 300);

        // Verificar saldos después de la transferencia
        const cuenta1Actualizada = await Account.findById(cuenta1._id);
        const cuenta2Actualizada = await Account.findById(cuenta2._id);

        console.log('\nEstado después de la transferencia:');
        console.log('Cuenta 1:', cuenta1Actualizada.balance);
        console.log('Cuenta 2:', cuenta2Actualizada.balance);

        // Intentar una transferencia simultánea (esto demostrará el bloqueo)
        console.log('\nIntentando transferencias simultáneas...');
        
        try {
            await Promise.all([
                transfer(cuenta1._id, cuenta2._id, 200),
                transfer(cuenta2._id, cuenta1._id, 100)
            ]);
        } catch (error) {
            console.log('Error esperado:', error.message);
        }

        // Verificar estado final
        const cuenta1Final = await Account.findById(cuenta1._id);
        const cuenta2Final = await Account.findById(cuenta2._id);

        console.log('\nEstado final:');
        console.log('Cuenta 1:', cuenta1Final.balance);
        console.log('Cuenta 2:', cuenta2Final.balance);

    } catch (error) {
        console.error('Error en la prueba:', error);
    } finally {
        await mongoose.connection.close();
    }
}

runTest(); 