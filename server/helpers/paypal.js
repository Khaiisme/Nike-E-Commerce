const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: 'sandbox', // or 'live'
  client_id: 'sb-rf4mh34499232@personal.example.com',
  client_secret: 'VP1sYyO^',
});

module.exports = paypal;
