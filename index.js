var app = require('express')();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var pathExists= require('path-exists');
if (!pathExists.sync('./conf.json')){
  throw Error('no configuration founded')
}
var conf=require('./conf.json')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
var GPIOsw=require('gpio-switcher');
if(!conf.gpioswitch){
  throw Error('no conf')
}

var G=new GPIOsw()
G.load(conf.gpioswitch).then(function(a){
  console.log('pin loaded')
}).catch(functon(err){
  throw Error(err)
})


app.get('/', function (req, res) {
  res.json({online:true})
});
app.get('/switch/:pin', function (req, res) {

  G.switch(req.params.pin).then(function(a){
    res.json({ok:true})
  }).catch(function(err){
    res.json({error:err})


  })
});

app.get('/switch/:pin/on', function (req, res) {

  G.on(req.params.pin).then(function(a){
    res.json({ok:true})
  }).catch(function(err){
    res.json({error:err})


  })
});
app.get('/switch/:pin/off', function (req, res) {

  G.off(req.params.pin).then(function(a){
    res.json({ok:true})
  }).catch(function(err){
    res.json({error:err})


  })
});



server.listen(conf.port,'0.0.0.0');
