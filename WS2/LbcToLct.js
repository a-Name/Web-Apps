'use strict';
/* ## USER FLOW : ##
  Enter link from Leboncoin -> get list from LaCentrale -> Want to manually get more accuracy?
  -> Yes : Enter Power, Gear type, Door number -> get list from LaCentrale -> finished
  -> No : finished
  -> if finished :
  -> if 0 result : print "no result for this car!"
  -> if 1 result : print result price
  -> if more : do nothing (only link list from LaCentrale)
*/

var leboncoin = require('./leboncoin.js');
leboncoin("http://www.leboncoin.fr/voitures/848874643.htm");
leboncoin("http://www.leboncoin.fr/voitures/861141798.htm");

/*
var data_in =  {
  "Bra":"Renault",
  "Mdl":"Scenic",
  "Yer":2009,
  "Klm":100000,
  "Ful":"Diesel",
  "Ger":"Manuelle"
};

console.log(data_in);
var data_out = {
  "Bra":data_in.Bra,
  "Mdl":data_in.Mdl,
  "Yer":data_in.Yer,
  "Pwr":null,
  "Ful":data_in.Ful,
  "Ger":data_in.Ger,
  "Dor":null
}
console.log(data_out);
*/
