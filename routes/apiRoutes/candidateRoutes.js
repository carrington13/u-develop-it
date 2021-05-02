const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// ----------------
// Candidate routes
// ----------------

  // Get all candidates
  router.get('/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
    AS party_name 
    FROM candidates 
    LEFT JOIN parties 
    ON candidates.party_id = parties.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

// // GET a single candidate
router.get('/candidate/:id', (req, res) => {
    // sql query call
    const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id
    WHERE candidates.id = ?`;
    // parameters passed from user
    const params = [req.params.id];
  
    // db call
    db.query(sql, params, (err, row) => {
      if (err) {
        // changed err code to 400 to tell client there request wasnt accepted and to try a different request
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });
  

  // // Create a candidate
  router.post('/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
      VALUES (?,?,?)`;
      const params = [body.first_name, body.last_name, body.industry_connected];
  
      db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body
        })
      })
  });
  
  
  // Delete a candidate
  router.delete('/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });
  
  // Update a candidate's party
  router.put('/candidates', (req, res) => {
    // forces put request to include 'party_id' in URL
    const errors = inputCheck(req.body, 'party_id');
  
    if (errors) {
      res.status(400).json({ errors: errors});
      return
    }
    const sql = `UPDATE candidates SET party_id = ? 
      WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  })
  
module.exports = router;