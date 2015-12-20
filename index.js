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
if(conf.gpioswitch){
  var G=new GPIOsw()
  G.set(conf.gpioswitch).then(function(a){


    app.get('/', function (req, res) {
      res.json({online:true})
    });
    app.get('/switch', function (req, res) {

      G.switch(conf.gpioswitch.pin).then(function(a){
        res.json({ok:true})
      }).catch(function(err){
        res.json({error:err})


      })
    });
    app.get('/status/:val', function (req, res) {



      
      res.json({online:true})
    });
    app.get('/switch/:val', function (req, res) {
      res.json({online:true})
    });


    server.listen(conf.port,'0.0.0.0');



  }).catch(function(err){
    throw Error(err)


  })
} else{
  throw 'no conf'
}
