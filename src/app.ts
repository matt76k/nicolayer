import express = require('express');
import http = require('http');

let app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index', {})
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
