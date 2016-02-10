var express = require('express');


//var pg = require('pg');
////var conString = "postgres://ixhgduhkaujyyy:PuGdNCVuDhnN6mLPgw5DJSES8V@ec2-54-83-36-203.compute-1.amazonaws.com:5432/d20skifon54bh6";
////var client = new pg.Client(conString);
//
//var client = new pg.Client({
//	user: "ixhgduhkaujyyy",
//	password: "PuGdNCVuDhnN6mLPgw5DJSES8V",
//	database: "d20skifon54bh6",
//	port: 5432,
//	host: "ec2-54-83-36-203.compute-1.amazonaws.com",
//	ssl: true
//});
//client.connect();

//var pg = require('pg');
//var conString = "postgres://ixhgduhkaujyyy:PuGdNCVuDhnN6mLPgw5DJSES8V@ec2-54-83-36-203.compute-1.amazonaws.com:5432/d20skifon54bh6";
//
////this initializes a connection pool
////it will keep idle connections open for a (configurable) 30 seconds
////and set a limit of 20 (also configurable)
//pg.connect(conString, function(err, client, done) {
//  if(err) {
//    return console.error('error fetching client from pool', err);
//  }
//  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
//    //call `done()` to release the client back to the pool
//    done();
//
//    if(err) {
//      return console.error('error running query', err);
//    }
//    console.log(result.rows[0].number);
//    //output: 1
//  });
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

var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err){
	  return console.error('error fetching client from pool', err);
	  //throw err;
  }
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


