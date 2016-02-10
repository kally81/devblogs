var express = require('express');
var pg = require('pg');
var app = express();

app.set('port', (process.env.PORT || 5000));
console.log('Node app is running on port', app.get('port'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components/'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var conString = "postgres://purpleocean:tpghks81@localhost:5432/postgres";
var client = new pg.Client(conString);
client.connect();

var query = client.query("SELECT * FROM public.\"Test_table\";");
query.on("row", function (row, result) {
    result.addRow(row);
    //console.log("result : " + result);
});


var resArray;
query.on("end", function (result) {
    //console.log(JSON.stringify(result.rows, null, "    "));
    resArray = result;
    client.end();
});

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/index', function(request, response) {
	console.log(JSON.stringify(resArray.rows));
		  response.render('pages/test', {"result" : JSON.stringify(resArray.rows)}, function(err, html) {
		  response.send(html);
	  });
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


