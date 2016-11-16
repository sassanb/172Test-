
var request = require('request');
var _ = require('underscore');
var agent = require('superagent');
var csv = require('fast-csv');
var fs = require('fs');
var repl = require('repl');
var cur = 'BTC';
var orders = [];
var rates;
var filename = 'coinbase.csv';

request('https://coinbase.com/api/v1/currencies/exchange_rates', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    rates = JSON.parse(body);
  }
});

repl.start({
  prompt: 'coinbase> ',
  eval: function(cmd, context, filename, callback) {
     var input = cmd.replace('\n', '');
var first = input.split(' ')[0]; // first case.
var second = input.split(' ')[1]; // second case.
var third = input.split(' ')[2]; // third case.
    switch(first)
    {

      case 'BUY':
        Buy(input);
        callback();
        break;

      case 'SELL':
        Sell(input);
        callback();
        break;

      case 'ORDERS':
        Order();
        callback();
        break;

      default:
        console.log(' Invalids. Valids Inputs: BUY, SELL, ORDERS\n');

        callback();
        break;
    }

    function Buy(input)
    {
      Push(input);
      Log(input);
    }

    function Sell(input)
    {
      Push(input);
      Log(input);
    }

function order(ids, types , amt, cur, rate)
{
  this.ids       = ids;
  this.types      = types ;
  this.amt   = amt;
  this.cur = cur;
  this.rate     = rate;
}

function orderPrint(order)
{
  console.log(' ' + order.ids + ' : ' + order.types  + ' ' + order.amt
  + ' ' + order.cur + ' : ' + order.rate);
}

function Rate_Exchange (amt, cur)
{
  var Rateamt = parseFloat(amt);
  var Ratecur = parseFloat(cur_Btc(cur));
  return Rateamt * Ratecur;
}

function newDate()
{
  var date = new Date().toString();
  return date;
}

function Length(input)
{
  var Split = input.split(' ');
  return Split.length;
}

function Rate(rate)
{
  if(rate !='undefined'){
    return true;
  } else {
    return false;
  }
}

function Btc_cur(cur){
  if(cur === 'undefined')
  {
    cur = 'btc_to_usd';
  }
  else if(cur != 'BTC')
  {
    cur = 'btc_to_' + cur.toLowerCase();
  }
  return rates[cur];
}

function cur_Btc (cur){
  if(cur === 'undefined')
  {
    cur = 'usd_to_btc';
  }
  else
  {
    cur = cur.toLowerCase() + '_to_btc';
  }
  return rates[cur];
}


function Push(input){
  var AnotherOrder = new order();
  AnotherOrder.ids = newDate();
  AnotherOrder.types  = first;
  AnotherOrder.amt = second;

  if(Length(input) == 2)  // second case
  {
    AnotherOrder.cur = 'BTC';
    AnotherOrder.rate = 'UNFILLED';
    orders.push(AnotherOrder);
  }
  else if(Length(input) == 3)  // third case
   {
  if(Rate (Btc_cur(third)) === true)
    {
      AnotherOrder.cur = third;
      AnotherOrder.rate = Btc_cur(third);
      orders.push(AnotherOrder);
    }

    else
    {
      console.log(' No known exchange rate for BTC/' + third + '.');
    }
  }
}

function Log(input){
  // first case
  if(Length(input) == 1)
  {
    console.log(' No amt specified.\n');
  }
  // second case
  else if(Length(input) == 2)
  {
    console.log(' Order to '+ first + ' ' + second + ' BTC queued.\n');
  }
  // third case
  else if(Length(input) == 3)
  {
    console.log(' Order to '+ first + ' ' + second +' '+ third +
      ' worth of BTC queded @ '+ Btc_cur(third + ' BTC/' +
      third + ' (' + Rate_Exchange (second , third) + ' BTC)\n'));
  }

  else
  {
    console.log(' Invalids input.\n');
  }
}

function Order(input){
  console.log('=== CURRENT ORDERS ===');
  FinalOrder(orders);
}

function FinalOrder(orders){
  var csvStream = csv.createWriteStream({headers: true}),
      writableStream = fs.createWriteStream(filename);
    csvStream.pipe(writableStream);
  _.each(orders, function(orders){
    csvStream.write(orders);  // writes into csv file
    orderPrint(orders);       // Display the orders
  });
    csvStream.end();
}
}
});
