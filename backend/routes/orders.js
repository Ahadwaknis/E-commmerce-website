const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const orders = [];

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  req.userId = decoded.id;
  next();
};

router.post('/', auth, (req, res) => {
  const order = { ...req.body, user: req.userId, _id: Date.now().toString() };
  orders.push(order);
  res.json(order);
});

router.get('/', auth, (req, res) => {
  const userOrders = orders.filter(o => o.user === req.userId);
  res.json(userOrders);
});

module.exports = router;