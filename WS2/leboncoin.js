module.exports = function(link){
  var bl = require("bl");
  var http = require("http");
  http.get(link, function(res) {
    res.pipe(bl(function (err, data) {
      var dts = data.toString();
      var Bra = dts.substring(dts.lastIndexOf('<td itemprop="brand">')+21,dts.lastIndexOf('<th>Mod')-85);
      var Mdl = dts.substring(dts.lastIndexOf('<td itemprop="model">')+21,dts.lastIndexOf('<th>Ann')-58);
      var Yer = dts.substring(dts.lastIndexOf('<td itemprop="releaseDate">')+73,dts.lastIndexOf('<th>Kilom')-155);
      var Klm = dts.substring(dts.lastIndexOf('<th>Kilom&eacute;trage :</th>')+54,dts.lastIndexOf(' KM</td>'));
      var Ful = dts.substring(dts.lastIndexOf('<th>Carburant :</th>')+45,dts.lastIndexOf('te de vitesse :</th>')-90);
      var Ger = dts.substring(dts.lastIndexOf('te de vitesse :</th>')+45,dts.lastIndexOf('</td>'));
      var data_out={
        "Bra":Bra,
        "Mdl":Mdl,
        "Yer":parseInt(Yer.replace(" ","")),
        "Klm":parseInt(Klm.replace(" ","")),
        "Ful":Ful,
        "Ger":Ger
      };
      console.log(data_out);
    }));
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}
