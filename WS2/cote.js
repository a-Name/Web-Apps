module.exports = function(datalbc,datalct) {
    console.log("waiting for COTE...");
    var sync = true;
    var data = null;
    GetCote(datalbc, datalct, function(data_out){
      data = data_out;
      sync = false;
    });
    while(sync) {require('deasync').sleep(100);}
    console.log("returning COTE...");
    return (data);
}

var GetCote = function(datalbc, datalct, callback){
  var bl = require("bl");
  var http = require("http");
  var data_out = [];
  for(var i=0; i<datalct.length; i++){
    count = data_out.length;
    link = CreateKmLink(datalct[i], datalbc);
    http.get(link, function(res) {
      res.pipe(bl(function (err, data) {
        var dts = data.toString();
        if(dts.length===30){data_out="errorconnlct";}
        else{data_out.push(FindCote(dts));}
      }));
    }).on('error', function(e) {
      callback("errorconnlct");
    });
    while(data_out.length!==count+1){require('deasync').sleep(100);}
  }
  while(data_out.length!=datalct.length){require('deasync').sleep(100);}
  callback(data_out);
}
var CreateKmLink = function(tab, data){
  var link = tab[0].substring(tab[0].indexOf(data.Mdl)+data.Mdl.length+1,tab[0].lastIndexOf("-"));
  link = "http://www.lacentrale.fr/fiche_cote_auto_flat.php?marque="+data.Bra+"&modele="+data.Mdl+"&millesime="+data.Yer+"&version="+link+"&type=perso&km="+data.Klm+"&fh=0&fdt="+data.Yer+"-01";
  return link;
}

var FindCote = function(data){
  data = data.substring(data.indexOf('<span id="cote_perso">')+34,data.indexOf('<div id="CoteAffinee">')-53);
  return data;
}
