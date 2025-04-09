const Account = require('../models/Account');

// Función para iniciar una transacción (Fase 1: Fase de crecimiento)
async function startTransaction(accountIds) {
    try {
        // Bloquear todas las cuentas involucradas
        for (const accountId of accountIds) {
            const account = await Account.findById(accountId);
            if (!account) {
                throw new Error(`Cuenta ${accountId} no encontrada`);
            }
            if (account.isLocked) {
                throw new Error(`Cuenta ${accountId} ya está bloqueada`);
            }
            account.isLocked = true;
            await account.save();
        }
        return true;
    } catch (error) {
        // Si hay error, desbloquear todas las cuentas
        for (const accountId of accountIds) {
            const account = await Account.findById(accountId);
            if (account) {
                account.isLocked = false;
                await account.save();
            }
        }
        throw error;
    }
}

// Función para realizar una transferencia
async function transfer(fromAccountId, toAccountId, amount) {
    const session = await Account.startSession();
    session.startTransaction();

    try {
        // Fase 1: Bloquear las cuentas
        await startTransaction([fromAccountId, toAccountId]);

        // Fase 2: Realizar la transferencia
        const fromAccount = await Account.findById(fromAccountId);
        const toAccount = await Account.findById(toAccountId);

        if (fromAccount.balance < amount) {
            throw new Error('Saldo insuficiente');
        }

        fromAccount.balance -= amount;
        toAccount.balance += amount;

        await fromAccount.save();
        await toAccount.save();

        // Fase 3: Desbloquear las cuentas
        fromAccount.isLocked = false;
        toAccount.isLocked = false;
        await fromAccount.save();
        await toAccount.save();

        await session.commitTransaction();
        return { success: true, message: 'Transferencia exitosa' };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports = {
    transfer
}; 