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

var delta = [];
for( var i = 0; i < rental.rentalModifications.length; i++){
	for (var j = 0; j < rental.rentals.length; j++) {
		if(rental.rentalModifications[i].rentalId === rental.rentals[j].id){
			if(rental.rentalModifications[i].end_date!==undefined){
				//delta.push([rental.rentals[j].id,rental.rentals[j].end_date]);
				rental.rentals[j].returnDate = rental.rentalModifications[i].end_date;
			}
			if(rental.rentalModifications[i].pickupDate!==undefined){
				//delta.push([rental.rentals[j].id,rental.rentals[j].pickupDate]);
				rental.rentals[j].pickupDate = rental.rentalModifications[i].pickupDate;
			}
			if(rental.rentalModifications[i].distance!==undefined){
				//delta.push([rental.rentals[j].id,rental.rentals[j].distance]);
				rental.rentals[j].distance = rental.rentalModifications[i].distance;
			}
		}
	}
}

for (var i = 0; i < rental.rentals.length; i++) {
	document.write("<table></tr>");
	for (var j = 0; j < rental.cars.length; j++) {
		if(rental.rentals[i].carId === rental.cars[j].id){
			document.write("<td>");
			var duree_ms = Date.parse(rental.rentals[i].returnDate) - Date.parse(rental.rentals[i].pickupDate);
			var duree = duree_ms/1000/60/60/24+1;
      var reduc = 0;
      if(duree-1 > 1){reduc = 10/100;}
      if(duree-1 > 4){reduc = 30/100;}
      if(duree-1 > 10){reduc = 40/100;}
			var price = (rental.cars[j].pricePerKm * rental.rentals[i].distance) + (rental.cars[j].pricePerDay * duree);
      price = price - reduc * price;
      if (rental.rentals[i].options.deductibleReduction === true){price = price + 4;}
			document.write(rental.rentals[i].driver.firstName +" "+ rental.rentals[i].driver.lastName + "</br>" + rental.rentals[i].id + "</td><td>Total : "
				+ arrondi(price) + "€</td><td>" + rental.rentals[i].pickupDate + "</br>" + rental.rentals[i].returnDate + "</td></tr>");
      var com = price * 30/100;
      var ins = com/2;
      var roa = 1 * duree;
      var dri = com - ins - roa;
      if (rental.rentals[i].options.deductibleReduction === true){dri = dri + 4;}
      document.write("<tr><td>Insurance : " + arrondi(ins) + "€</td><td>Assistance : " + arrondi(roa) + "€</td><td>Drivy : " + arrondi(dri) + "€");
			document.write("</td>");
		}
	}
	document.write("</tr></table>");
}

function arrondi(nombre){
	var arr = nombre*100;
	arr = Math.round(arr);
	arr = arr/100;
	return arr;
}
