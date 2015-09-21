'use strict';
var rental = {
  "cars": [
    {
      "id": "p306",
      "vehicule": "peugeot 306",
      "pricePerDay": 20,
      "pricePerKm": 0.10
    }
  ],
  "rentals": [
    {
      "id": "1-pb-92",
      "driver": {
        "firstName": "Paul",
        "lastName": "Bismuth"
      },
      "carId": "p306",
      "pickupDate": "2015-09-12",
      "returnDate": "2015-09-12",
      "distance": 100,
      "options":{
        "deductibleReduction": false
      }
    },
    {
      "id": "2-rs-92",
      "driver": {
        "firstName": "Rebecca",
        "lastName": "Solanas"
      },
      "carId": "p306",
      "pickupDate": "2015-09-10",
      "returnDate": "2015-09-15",
      "distance": 300,
      "options":{
        "deductibleReduction": true
      }
    },
    {
      "id": "3-sa-92",
      "driver": {
        "firstName": " Sami",
        "lastName": "Ameziane"
      },
      "carId": "p306",
      "pickupDate": "2015-08-31",
      "returnDate": "2015-09-13",
      "distance": 1000,
      "options":{
        "deductibleReduction": true
      }
    }
  ],
  "rentalModifications": [
    {
      "id": 1,
      "rentalId": "1-pb-92" ,
      "end_date": "2015-09-13",
      "distance": 150
    },
    {
      "id": 2,
      "rentalId": "3-sa-92",
      "pickupDate": "2015-09-01"
    }
  ]
};

// #### CALCUL DES MODIFICATIONS #### \\
var delta = [];
for( var i = 0; i < rental.rentalModifications.length; i++){
	for (var j = 0; j < rental.rentals.length; j++) {
		if(rental.rentalModifications[i].rentalId === rental.rentals[j].id){
			if(rental.rentalModifications[i].end_date!==undefined){
        for(var k = 0; k < rental.cars.length; k++){if(rental.cars[k].id === rental.rentals[j].carId){delta.push([rental.rentals[j].id, getPrice(rental.rentals[j].pickupDate, rental.rentals[j].returnDate, rental.rentals[j].distance, rental.cars[k].pricePerDay, rental.cars[k].pricePerKm, rental.rentals[j].options.deductibleReduction)]);}}
				rental.rentals[j].returnDate = rental.rentalModifications[i].end_date;
			}
			if(rental.rentalModifications[i].pickupDate!==undefined){
        for(var k = 0; k < rental.cars.length; k++){if(rental.cars[k].id === rental.rentals[j].carId){delta.push([rental.rentals[j].id, getPrice(rental.rentals[j].pickupDate, rental.rentals[j].returnDate, rental.rentals[j].distance, rental.cars[k].pricePerDay, rental.cars[k].pricePerKm, rental.rentals[j].options.deductibleReduction)]);}}
				rental.rentals[j].pickupDate = rental.rentalModifications[i].pickupDate;
			}
			if(rental.rentalModifications[i].distance!==undefined){
        for(var k = 0; k < rental.cars.length; k++){if(rental.cars[k].id === rental.rentals[j].carId){delta.push([rental.rentals[j].id, getPrice(rental.rentals[j].pickupDate, rental.rentals[j].returnDate, rental.rentals[j].distance, rental.cars[k].pricePerDay, rental.cars[k].pricePerKm, rental.rentals[j].options.deductibleReduction)]);}}
				rental.rentals[j].distance = rental.rentalModifications[i].distance;
			}
		}
	}
}

// #### PROGRAMME PRINCIPAL #### \\
for (var i = 0; i < rental.rentals.length; i++) {
	document.write("<table></tr>");
	for (var j = 0; j < rental.cars.length; j++) {
		if(rental.rentals[i].carId === rental.cars[j].id){
			document.write("<td class='name'>");
      var price = getPrice(rental.rentals[i].pickupDate, rental.rentals[i].returnDate, rental.rentals[i].distance, rental.cars[j].pricePerDay, rental.cars[j].pricePerKm, rental.rentals[i].options.deductibleReduction);
      var differ=0;
      for(var k = 0; k < delta.length; k++){if(delta[k][0] === rental.rentals[i].id){differ = differ + price - delta[k][1];}}
      if(differ === 0){document.write(rental.rentals[i].driver.firstName +" "+ rental.rentals[i].driver.lastName + "</br>" + rental.rentals[i].id + "</td><td>" + rental.cars[j].vehicule + "</td><td>" + rental.rentals[i].pickupDate + "</br>" + rental.rentals[i].returnDate + "</td><td></td></tr>");}
      else{document.write(rental.rentals[i].driver.firstName +" "+ rental.rentals[i].driver.lastName + "</br>" + rental.rentals[i].id + "</td><td>" + rental.cars[j].vehicule + "</td><td>" + rental.rentals[i].pickupDate + "</br>" + rental.rentals[i].returnDate + "</td><td class='modif'>Modifications</br>for user : " + differ + "€</td></tr>");}
      var com = price * 30/100;
      var ins = com/2;
      var roa = 1 * getDuree(rental.rentals[i].pickupDate, rental.rentals[i].returnDate);
      var dri = com - ins - roa;
      if (rental.rentals[i].options.deductibleReduction === true){dri = dri + 4;}
      document.write("<tr><td> Total : " + arrondi(price) + "€</td><td>Insurance : " + arrondi(ins) + "€</td><td>Assistance : " + arrondi(roa) + "€</td><td>Drivy : " + arrondi(dri) + "€");
			document.write("</td>");
		}
	}
	document.write("</tr></table>");
}

function getDuree(begin, end){
  var duree_ms = Date.parse(end) - Date.parse(begin);
  var duree = duree_ms/1000/60/60/24+1;
  return duree;
}

function getPrice(begin, end, dist, ppd, ppkm, deduct){
  var duree = getDuree(begin, end);
  var reduc = 0;
  if(duree-1 > 1){reduc = 10/100;}
  if(duree-1 > 4){reduc = 30/100;}
  if(duree-1 > 10){reduc = 40/100;}
  var result = (ppkm * dist) + (ppd * duree);
  result = result - reduc * result;
  if (deduct === true){result = result + 4;}
  return result;
}

function arrondi(nombre){
	var arr = nombre*100;
	arr = Math.round(arr);
	arr = arr/100;
	return arr;
}
