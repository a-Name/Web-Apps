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
      "distance": 100
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
      "distance": 300
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
      "distance": 1000
    }
  ]
};

for (var i = 0; i < rental.rentals.length; i++) {
	for (var j = 0; j < rental.cars.length; j++) {
		if(rental.rentals[i].carId === rental.cars[j].id){
			var duree_ms = Date.parse(rental.rentals[i].returnDate) - Date.parse(rental.rentals[i].pickupDate);
			var duree = duree_ms/1000/60/60/24+1;
      var reduc = 0;
      if(duree-1 > 1){reduc = 10/100;}
      if(duree-1 > 4){reduc = 30/100;}
      if(duree-1 > 10){reduc = 40/100;}
			var price = (rental.cars[j].pricePerKm * rental.rentals[i].distance) 
        + (rental.cars[j].pricePerDay * duree);
      var price = price - reduc * price;
			document.write(rental.rentals[i].driver.firstName + " " + price + "€ </br>");
      var com = price * 30/100;
      var ins = com/2;
      var roa = 1 * duree;
      var dri = com - ins - roa; 
      document.write("ins : " + ins + "€ roa : " + roa + "€ dri : " + dri + "€ </br>");
		}
	}
}

