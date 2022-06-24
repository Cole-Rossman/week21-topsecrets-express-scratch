const { Router } = require('express');
const { Secret } = require('../models/Secret');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const data = await Secret.insert(req.body);
      res.json(data);    
    } catch (e) {
      next(e);    
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Secret.getAll();
      res.json(data);  
    } catch (e) {
      next(e);  
    }
  });

