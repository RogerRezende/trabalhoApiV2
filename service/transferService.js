const { transfers } = require('../model/transferModel');
const { findUserByUsername } = require('./userService');

function transfer({ from, to, amount }) {
  if (!from || !to || typeof amount !== 'number') {
    throw new Error('Dados de transferência inválidos');
  }
  const sender = findUserByUsername(from);
  const recipient = findUserByUsername(to);
  if (!sender || !recipient) {
    throw new Error('Usuário remetente, destinatário não encontrado');
  }
  if (!recipient.favorecido && amount >= 5000) {
    throw new Error('Transferências acima de R$ 5.000,00 só são permitidas para favorecidos');
  }
  if (sender.balance < amount) {
    throw new Error('Saldo insuficiente');
  }
  sender.balance -= amount;
  recipient.balance += amount;
  const transferObj = { from, to, amount, date: new Date() };
  transfers.push(transferObj);
  return transferObj;
}

function getAllTransfers() {
  return transfers;
}

module.exports = {
  transfer,
  getAllTransfers
};
