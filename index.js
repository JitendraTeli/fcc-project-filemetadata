var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const bodyParser = require('body-parser');
var app = express();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


const storage = multer.memoryStorage(); // Stores the file in memory
const upload = multer({ storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, size } = req.file;

  res.status(200).json({
    fileName: originalname,
    fileType: mimetype,
    fileSize: size, // Size in bytes
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
