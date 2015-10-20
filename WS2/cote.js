var deasync = require("deasync");

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
    return(data);
}

var GetCote = function(datalbc, datalct, callback){
  var bl = require("bl");
  var http = require("http");
  var data_out = [];
  for(var i=0; i<datalct.length; i++){
    count = data_out.length;
    link = CreateKmLinkOne(datalct[i], datalbc);
    http.get(link, function(res) {
      res.pipe(bl(function (err, data) {
        var data_old = data;
        var dts = data.toString();
        if(dts.length===30){data_out="errorconnlct";}
        else{
          var linkZS = FindZeServerLink(dts);
          linkZS = CreateLinkZS(linkZS, datalbc, datalct[i]);
          var outZS = undefined;
          var cote_maj = 0;
          http.get(linkZS,function(res){
            res.pipe(bl(function (err, dataZS) {
              outZS = dataZS.toString();
              cote_maj += parseInt(outZS.substring(outZS.indexOf("['appr_km']='")+13, outZS.indexOf("';T_out['appr_pm")));
              cote_maj += parseInt(outZS.substring(outZS.indexOf("T_out['appr_pm']='")+18, outZS.indexOf("';T_out['appr_m")));
              cote_maj += parseInt(outZS.substring(outZS.indexOf("T_out['appr_mec']='")+19, outZS.lastIndexOf("';")));
              var cote_final = cote_maj + parseInt(datalct[i][6]);
              data_out.push(cote_final);
              console.log('.');
            }));
          }).on('error', function(e) {
            callback("errorconnlct");
          });
        }
      }));
    }).on('error', function(e) {
      callback("errorconnlct");
    });
    while(data_out.length!==count+1){deasync.sleep(100);}
  }
  while(data_out.length!=datalct.length){deasync.sleep(100);}
  callback(data_out);
}
var CreateKmLinkOne = function(tab, data){
  var link = tab[0].substring(tab[0].indexOf(data.Mdl)+data.Mdl.length+1,tab[0].lastIndexOf("-"));
  link = "http://www.lacentrale.fr/fiche_cote_auto_flat.php?marque="+data.Bra+"&modele="+data.Mdl+"&millesime="+data.Yer+"&version="+link+"&type=perso&km="+data.Klm+"&fh=0&fdt="+data.Yer+"-01";
  return link;
}
var CreateLinkZS = function(id, lbc, lct){
  var link = "http://www.lacentrale.fr/ze_proxy.php?ws=get_cote_lc&user=js&password=none&out=js&type=perso&dtid="+id+"&millesime="+lbc.Yer+"&km="+lbc.Klm+"&firsthand=2&fdt="+lbc.Yer+"-01&categorie=auto&cote="+lct[6]+"&energy="+lct[1]+"&power="+lct[2];
  return link;
}
var FindZeServerLink = function(data){
  tmp = data.replace(data.substring(0,data.indexOf('var pq = new PersoQuot')+23), "");
  tmp = tmp.substring(0,tmp.indexOf(');')-53).replace(/ /g,"");
  var tabD = tmp.split(",");
  return tabD[1];
}
