var express = require('express')
var app = express()
var fs = require('fs');
var bodyPaser = require('body-parser');
var compression = require('compression');
var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var helmet = require('helmet')

app.use(helmet())
app.use(express.static('public'));
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
}); 

app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use(function(req, res, next){
  res.status(404).send('not found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('잘못된 경로입니다.');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
