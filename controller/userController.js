const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.post('/register', (req, res) => {
  try {
    const { username, password, favorecido } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }
    const user = userService.registerUser({ username, password, favorecido });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }
    const user = userService.authenticateUser(username, password);
    res.json({ message: 'Login realizado com sucesso', user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(userService.getAllUsers());
});

module.exports = router;
