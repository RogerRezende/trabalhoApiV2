const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');

router.post('/', (req, res) => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Dados de transferência inválidos' });
    }
    if (!from || !to) {
      return res.status(400).json({ error: 'Usuário remetente ou destinatário não encontrado' });
    }
    if (typeof amount !== 'number') {
      return res.status(400).json({ error: 'Tipo do campo amount tem que ser number' });
    }
    const transfer = transferService.transfer({ from, to, amount });
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(transferService.getAllTransfers());
});

module.exports = router;
