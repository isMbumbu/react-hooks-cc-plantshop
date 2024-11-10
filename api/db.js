// api/db.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('db.json'); // This points to your db.json file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read db.json' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
}
