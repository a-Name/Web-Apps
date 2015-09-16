'use strict';
	var rental = {
  "cars": [
    {
      "id": "p306",
      "vehicule": "peugeot 306",
      "pricePerDay": 20,
      "pricePerKm": 0.10
    },
    {
      "id": "rr-sport",
      "pricePerDay": 60,
      "pricePerKm": 0.30
    },
    {
      "id": "p-boxster",
      "pricePerDay": 100,
      "pricePerKm": 0.45
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
      "returnDate": "2015-09-14",
      "distance": 150
    },
    {
      "id": "2-rs-92",
      "driver": {
        "firstName": "Rebecca",
        "lastName": "Solanas"
      },
      "carId": "rr-sport",
      "pickupDate": "2015-09-09",
      "returnDate": "2015-09-13",
      "distance": 550
    },
    {
      "id": "3-sa-92",
      "driver": {
        "firstName": " Sami",
        "lastName": "Ameziane"
      },
      "carId": "p-boxster",
      "pickupDate": "2015-09-12",
      "returnDate": "2015-09-14",
      "distance": 100
    }
  ]
};

for (var i = 0; i < rental.rentals.length; i++) {
	for (var j = 0; j < rental.cars.length; j++) {
		if(rental.rentals[i].carId === rental.cars[j].id){
			var duree_ms = Date.parse(rental.rentals[i].returnDate) - Date.parse(rental.rentals[i].pickupDate);
			var duree = duree_ms/1000/60/60/24+1;
			var price = (rental.cars[j].pricePerKm * rental.rentals[i].distance)
				+ (rental.cars[j].pricePerDay * duree);
			document.write(rental.rentals[i].driver.firstName + " " + price + "€ </br>");
		}
	}
}
