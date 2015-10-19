module.exports = function(link) {
    console.log("waiting for LBC...");
    var sync = true;
    var data = null;
    LBC(link, function(data_out){
      data = data_out;
      sync = false;
    });
    while(sync) {require('deasync').sleep(100);}
    console.log("returning LBC...");
    return (data);
}

var LBC = function(link, callback){
  var bl = require("bl");
  var http = require("http");
  http.get(link, function(res) {
    res.pipe(bl(function (err, data) {
      var dts = data.toString();
      if(dts.indexOf('<td itemprop="brand">') > -1){var Bra = dts.substring(dts.lastIndexOf('<td itemprop="brand">')+21,dts.lastIndexOf('<th>Mod')-85);}
      else{Bra='notfound';}
      if(dts.indexOf('<td itemprop="model">') > -1){var Mdl = dts.substring(dts.lastIndexOf('<td itemprop="model">')+21,dts.lastIndexOf('<th>Ann')-58);}
      else{Mdl='notfound';}
      var Yer = dts.substring(dts.lastIndexOf('<td itemprop="releaseDate">')+73,dts.lastIndexOf('<th>Kilom')-155);
      var Klm = dts.substring(dts.lastIndexOf('<th>Kilom&eacute;trage :</th>')+54,dts.lastIndexOf(' KM</td>'));
      var Ful = dts.substring(dts.lastIndexOf('<th>Carburant :</th>')+45,dts.lastIndexOf('te de vitesse :</th>')-90);
      if(dts.indexOf('rence : </th>') > -1){var Ger = dts.substring(dts.lastIndexOf('te de vitesse :</th>')+45,dts.lastIndexOf('rence : </th>')-389)}
      else{var Ger = dts.substring(dts.lastIndexOf('te de vitesse :</th>')+45,dts.lastIndexOf('</td>'));}
      var data_out={
        "Bra":Bra.toLowerCase().replace(/ /g,"+").replace(/-/g,"_"),
        "Mdl":Mdl.toLowerCase().replace(/ /g,"+").replace(/-/g,"_"),
        "Yer":Yer.replace(" ",""),
        "Klm":Klm.replace(" ",""),
        "Ful":Ful,
        "Ger":Ger
      };
      callback(data_out);
    }));
  }).on('error', function(e) {
    callback("errorconnlbc");
  });
}
