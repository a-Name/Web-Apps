module.exports = function(link) {
    console.log("waiting for LCT...");
    var sync = true;
    var data = null;
    LCT(link, function(data_out){
      data = data_out;
      sync = false;
    });
    while(sync) {require('deasync').sleep(100);}
    console.log("returning LCT...");
    return (data);
}

var LCT = function(link, callback){
  var bl = require("bl");
  var http = require("http");
  http.get(link, function(res) {
    res.pipe(bl(function (err, data) {
      var dts = data.toString();
      if(dts.length===30){console.log(dts);var data_out="errorunknlct";}
      else{var data_out = multipleParser(dts)};
      callback(data_out);
    }));
  }).on('error', function(e) {
    callback("errorconnlct");
  });
}

var multipleParser = function(data){
  var tb1 = '<!-- begin file tb_item_listing_auto_quot_flat.php -->';
  var te1 = '<!-- end file tb_item_listing_auto_quot_flat.php -->';
  data = data.substring(data.indexOf(tb1)+66,data.lastIndexOf(te1));
  var sep = te1+tb1;
  var tab1 = [];
  var ite = 0;
  var run=true;
  var last_loop=false;
  while(run == true){
    if (last_loop != true){
      var nextSepIndex = data.indexOf(sep);
      tab1[ite]=(data.substring(ite,nextSepIndex));
      data = data.replace(tab1[ite]+sep, "");
      if(data.indexOf(sep) == -1){last_loop=true;}
    }
    else{
      tab1[ite] = data;
      run=false;
    }
    ite++;
  }
  var tab2 = [];
  if(tab1.length>0){
    for(var i = 0 ; i < tab1.length ; i++){
      var tab3 = []; // ARGUS link | fuel | power | gear | doors | denomination | cote
      tab1[i] = tab1[i].replace('href="credit.php?',"");
      tab3[0] = "www.lacentrale.fr/" + tab1[i].substring(tab1[i].indexOf('href="')+6,tab1[i].indexOf('title="')-2);
      tab1[i] = tab1[i].replace(tab1[i].substring(0,tab1[i].indexOf('title="Cliquez pour avoir des informations compl')+48),"");
      tab3[5] = tab1[i].substring(tab1[i].indexOf('">')+2,tab1[i].indexOf("</a>"));
      tab1[i] = tab1[i].replace(tab1[i].substring(0,tab1[i].indexOf('title="Cliquez pour faire des simulations de prix')),"");
      tab3[6] = tab1[i].substring(tab1[i].indexOf('">')+2,tab1[i].indexOf(" &euro;"));
      tab1[i] = tab1[i].replace(tab1[i].substring(0,tab1[i].indexOf('Le type de carburant">')+22),"");
      tab3[1] = tab1[i].substring(0,tab1[i].indexOf("</a>"));
      tab1[i] = tab1[i].replace(tab1[i].substring(0,tab1[i].indexOf('title="Si vous cherchez plus ')+31),"");
      tab3[2] = tab1[i].substring(tab1[i].indexOf('">')+2,tab1[i].indexOf("</a>")).replace(" cv","");
      tab1[i] = tab1[i].replace(tab1[i].substring(0,tab1[i].indexOf('title="Cliquez pour avoir des informations compl')+31),"");
      tab3[3] = tab1[i].substring(tab1[i].indexOf('">')+2,tab1[i].indexOf("</a>"));
      tab1[i] = tab1[i].replace(tab1[i].substring(0,tab1[i].indexOf('title="Cliquez pour avoir des informations compl')+31),"");
      tab3[4] = tab1[i].substring(tab1[i].indexOf('">')+2,tab1[i].indexOf("</a>"));
      tab2[i] = tab3;
    }
  }
  else{tab2.push(NO_DATA_FOUND);}
  return tab2;
}
