const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('./socket.io')(http);
const cors = require('cors');
const upload = require('express-fileupload');
const port = 8000;
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}
app.use(cors(corsOptions));

app.use(upload());

app.use('/static', express.static(path.join(__dirname, 'assets', 'images')));

app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({extended: true})); 

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/', require('./routes'));

http.listen(port, function(){
  console.log(`listening on *:${port}`);
});