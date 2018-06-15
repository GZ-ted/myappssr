import express from 'express';
import React from 'react';
import {renderToString,renderToStaticMarkup, renderToNodeStream} from 'react-dom/server';
import Home from './components/home.js';

let app=express();

var server=app.listen(3000,()=>{
  var host=server.address().address;
  var port=server.address().port;
  console.log('server is start at',host,port);
});
//static
app.use('/dist',express.static('dist'));
app.get('/',(req,res)=>{
  res.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Hello HomePage</title></head><body>');
  res.write('<div id="app">');
  // res.write(renderToString(<Home/>));

  const stream = renderToNodeStream(<Home/>);
  stream.pipe(res, { end: false });
  stream.on('end', () => {
	res.write('</div></body>');
	res.write('<script type="text/javascript" src="../dist/runtime.js"></script><script type="text/javascript" src="../dist/vendors.js"></script><script type="text/javascript" src="../dist/main.js"></script>');
	res.write('</html>');
	res.end();
  });
})