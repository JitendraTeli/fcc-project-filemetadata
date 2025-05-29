var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


const storage = multer.memoryStorage(); // Stores the file in memory
const upload = multer({ storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log(req.file);
  const { originalname, mimetype, size } = req.file;

  res.status(200).json({
    name: originalname,
    type: mimetype,
    size: size, // Size in bytes
  });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    // Other errors
    return res.status(500).json({ error: err.message || 'Server error' });
  }
  next();
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
