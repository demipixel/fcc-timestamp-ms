var app = require('express')();

var PORT = 3000;

app.listen(PORT, () => {
  console.log('And we\'re live!');
});

var HOME = 'Timestamp microservice for FreeCodeCamp';
var INVALID = JSON.stringify({ unix: null, natural: null });

app.get('/', (req, res) => {
  res.send(HOME);
});

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

app.get('/:data', (req, res) => {
  var d = req.params.data;
  if (parseInt(d)) d = parseInt(d);
  var date = new Date(typeof d == 'string' ? d : d*1000);
  if (date.toString() == 'Invalid Date') {
    res.send(INVALID);
    return;
  }
  res.send(JSON.stringify({ unix: (date.getTime()/1000-date.getTimezoneOffset()*60), natural: monthNames[date.getUTCMonth()] + ' '+date.getUTCDate() + ', '+date.getUTCFullYear() }));
});