const { Router } = require('express');
const { Secret } = require('../models/Secret');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const data = await Secret.insert(req.body);
      res.json(data);    
    } catch (e) {
      next(e);    
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Secret.getAll();
      res.json(data);  
    } catch (e) {
      next(e);  
    }
  });

