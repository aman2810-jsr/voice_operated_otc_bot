const express = require('express');
const router = express.Router();

router.post('/blandWebhook', (req, res) => {
  const event = req.body;
  console.log('📥 Webhook event received:', event);

  // Optional: Save event to database, forward to frontend via socket, etc.

  res.sendStatus(200);
});

module.exports = router;
