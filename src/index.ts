import $ = require('jquery');
import {NicoLayer} from './nicolayer'

document.addEventListener("DOMContentLoaded", () => {
  let nicolayer = new NicoLayer($('#layer'));

  setInterval(() => nicolayer.interval(), 150);

  for (var i = 0; i < 40; i++) {
    var r:number = Math.floor(Math.random()*30);
    if (r > 15) r += 40;
    var c:number = Math.floor(Math.random()*10);
    var str:string = "";
  
    var cs:string[] = ["あ","い","う","え","お","亜","意","鵜","絵","尾"]
    for (var j = 0; j < r; j++)
      str += cs[c];
    var size:string = ['large', 'normal', 'small'][Math.floor(Math.random()*3)]
    nicolayer.send({speed:3000, size:size}, str)
  }
});
