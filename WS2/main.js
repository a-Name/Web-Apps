var leboncoin = require('./leboncoin.js');
var lacentrale = require('./lacentrale.js');
var cote = require('./cote.js');
var http = require("http");
var url = require("url");

//var lbc_out = leboncoin("http://www.leboncoin.fr/voitures/861141798.htm");
//var lct_out = lacentrale("http://www.lacentrale.fr/cote-voitures-" + lbc_out.Bra + "-" + lbc_out.Mdl + "--" + lbc_out.Yer + "-.html");
//var cote_out = cote(lbc_out, lct_out);

var css = "<style>";
css += "@import url(https://fonts.googleapis.com/css?family=Poiret+One);";
css += "body{background-color:#D2D7D3; color:#22A7F0; text-align:center; font-family:'Poiret One'; font-size:25px;}";
css += ".darker{background-color:#BDC3C7;}";
css += "#cat{color:#CF000F; font-size:18px;}";
css += "h1{margin-top:6%; font-size:60px; font-weight:normal;}";
css += "h2{margin-top:-50px; margin-bottom:3%; font-size:24px; color:#CF000F; font-weight:normal;}";
css += "#foo{margin-left:auto; margin-right:auto;}";
css += "#foo td{padding-right:10px; padding-left:10px; font-size:20px;}";
css += "form p{font-size:32px; color:#22A7F0; margin:0; margin-bottom:1%;}";
css += "form{font-size:25px;}";
css += "#showHide{color:#CF000F; cursor:pointer; font-size:20px;}";
css += "</style>";

var load_hide='<script>document.getElementById("loading").style.display = "none";</script>';
var submit_button = "<input id='submit' type='submit' value='Envoyer!'></form>";

var server = http.createServer(function(request, response) {
  var arg = urltostring(request);
  response.write("<!DOCTYPE 'html'><html><head><title>ARGUS Le Bon Coin</title><meta charset='UTF-8'/>"+css+"</head><body><h1>La Bonne Cote</h1><h2>L'ARGUS des annonces Le Bon Coin</h2><form><p>Entrez l'URL de l'annonce : </p>");
  if(arg.indexOf("?link")>-1 && arg.indexOf("?link=&")==-1){
    var link = arg.substring(arg.indexOf("link=")+5,arg.indexOf("&")).replace(/%2F/g,"/").replace(/%3A/g,":").replace(/%3F/g,"?").replace(/%3D/g,"=");
    if(link.indexOf("www.")===-1){link = "www."+link;}
    if(link.indexOf("http://")===-1){link = "http://"+link;}
    response.write("<input size='40' type='text' value='"+ link +"' name='link'>");
    response.write(submit_button);
    response.write("<div id=loading>Veuillez patienter, votre demande est en cours de traitement . . . </div>");
    var lbc_out = leboncoin(link);
    if(lbc_out==="errorconnlbc"){
      response.write(load_hide);
      response.write("Problème de connexion au serveur Le Bon Coin, réessayez plus tard . . . ");
    }
    else{
      if(arg.indexOf("&brand=")>-1){
        if(arg.indexOf("&model=")>-1){lbc_out.Bra = arg.substring(arg.indexOf("&brand=")+7,arg.indexOf("&model="));}
        else{lbc_out.Bra = arg.substring(arg.indexOf("&brand=")+7,arg.lastIndexOf("&"));}
      }
      if(arg.indexOf("&model=")>-1){lbc_out.Mdl = arg.substring(arg.indexOf("&model=")+7,arg.lastIndexOf("&"));}
      lbc_out.Bra = lbc_out.Bra.toLowerCase().replace(/ /g,"+").replace(/-/g,"_").replace(/%c3%a9/g,"e");
      lbc_out.Mdl = lbc_out.Mdl.toLowerCase().replace(/ /g,"+").replace(/-/g,"_").replace(/%c3%a9/g,"e");
      if(lbc_out.Bra==="notfound" || lbc_out.Mdl==="notfound"){
        response.write('<script>document.getElementById("submit").style.display = "none";</script>');
        response.write(load_hide);
        if(lbc_out.Bra==="notfound"){response.write("<br/>Veuillez renseigner la marque du véhicule : <input type='text' name='brand'><br/>");}
        if(lbc_out.Mdl==="notfound"){response.write("Veuillez renseigner le modèle du véhicule : <input type='text' name='model'><br/>");}
        response.write(submit_button);
      }
      else{
        var lct_out = lacentrale("http://www.lacentrale.fr/cote-voitures-" + lbc_out.Bra + "-" + lbc_out.Mdl + "--" + lbc_out.Yer + "-.html");
        if(lct_out==="errorunknlct" || lct_out==="errorconnlct"){
          response.write(load_hide);
          if(lct_out==="errorunknlct"){response.write("Problème avec le serveur distant, réessayez plus tard . . . ");}
          if(lct_out==="errorconnlct"){response.write("Problème de connexion au serveur distant, réessayez plus tard . . . ");}
        }
        else{
        var lct_out = SelectCars(lbc_out, lct_out);

        //var cote_out = cote(lbc_out, lct_out); // acurracy with Km doesn't work
        var cote_out = []; // value with 0Km
        for(var i=0;i<lct_out.length;i++){cote_out[i] = lct_out[i][6];}

          response.write(load_hide);
          if(cote_out.length===0){
            if(lbc_out.Yer==="2015"){response.write("Ce véhicule est trop récent et n'est pas encore coté à l'ARGUS . . . ");}
            else{response.write("Nous n'avons pas trouvé de correspondance pour ce véhicule . . . ");}
          }
          else if(cote_out.length===1){response.write("Cote du véhicule : <b>"+cote_out[0]+"€</b>");}
          else{
            var mean;
            var sum = 0;
            var count = 0;
            for(var i=0; i<cote_out.length; i++){
              cote_out[i] = parseInt(cote_out[i].replace(/ /g,""));
              sum += cote_out[i];
              count++;
            }
            mean = sum/count;
            response.write(count+" cotes correspondent à ce véhicule.<br/>");
            response.write("Moyenne des cotes trouvées : <b>"+parseInt(mean)+"€</b>");
            response.write('<br/><br/><span id="showHide">Plus de détails . . . </span><br/><br/><div id="foo" style="display:none">');
            response.write('<table id=foo>');
            response.write('<tr id=cat class=darker><td><b>Dénomination</b></td><td><b>Puissance</b></td><td><b>Portes</b></td><td><b>Cote</b></td></tr>');
            for(var i=0; i<cote_out.length; i++){
              if((i%2) === 0){response.write("<tr>");}
              else{response.write("<tr class=darker>");}
              response.write('<td><b>'+lct_out[i][5]+'</b></td><td>'+lct_out[i][2]+'cv</td><td>'+lct_out[i][4]+'</td><td><b>'+cote_out[i]+'€</b></td></tr>');
            }
            response.write('</table>');
            response.write('</div><script>document.getElementById("showHide").onclick = function() {var theDiv = document.getElementById("foo");if(theDiv.style.display == "none") {theDiv.style.display = "block";this.innerHTML = "Moins de détails . . . ";} else {theDiv.style.display = "none";this.innerHTML = "Plus de détails . . . ";}}</script>');
          }
        }
      }
    }
  }
  else{response.write("<input size='40' type='text' name='link'><input type='submit' value='Envoyer!'></form>");}
  response.write("</body></html>");
  response.end();
});
var port = Number(process.env.PORT || 3000);
server.listen(port);
//server.listen(8080);
console.log("Server is listening on port "+port);

var SelectCars = function(datalbc, datalct){
  var out = [];
  for(var i=0; i<datalct.length; i++){
    if(datalct[i][3] === 'M&eacute;canique'){datalct[i][3] = 'Manuelle';}
    if((datalct[i][1] === datalbc.Ful) && (datalct[i][3] === datalbc.Ger)){out.push(datalct[i]);}
  }
  return out;
}

var urltostring = function(request){
  var parts = url.parse(request.url, true);
  parts.query.page++;
  delete parts.search;
  return url.format(parts);
}
