var express = require('express');
//var pg = require('pg');
//pg.connect(process.env.DATABASE_URL, function(err, client) {
//  if (err) throw err;
//  console.log('Connected to postgres! Getting schemas...');
//  client
//    .query('SELECT table_schema,table_name FROM information_schema.tables;')
//    .on('row', function(row) {
//      console.log(JSON.stringify(row));
//    });
//});

var app = express();
app.set('port', (process.env.PORT || 5000));
console.log('Node app is running on port', app.get('port'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components/'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/index', function(request, response) {
	  response.render('pages/test');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


