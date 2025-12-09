
require('dotenv').config();
const express = require('express');
const { spawn } = require('child_process');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3010;

app.post('/api/v1/scan', (req, res) => {
  const target = req.body.target || '.';
  const cmd = spawn('python3', ['scanner/run_scanner.py', target]);
  let out = '';
  cmd.stdout.on('data', (d) => (out += d.toString()));
  cmd.on('close', (code) => res.json({ code, output: out }));
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'security-sentinel' }));

app.listen(PORT, () => console.log(`Security Sentinel on ${PORT}`));
module.exports = app;