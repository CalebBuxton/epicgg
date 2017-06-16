$.get('https://esports.yahoo.com/rss', function (data) {
    $(data).find("item").each(function () { // or "item" or whatever suits your feed
        var el = $(this);

        console.log("------------------------");
        console.log("title      : " + el.find("title").text());
        console.log("author     : " + el.find("author").text());
        console.log("description: " + el.find("description").text());
    });
});

var cities = [
{
name: 'Atlanta',
position: 
	{
		lat: 33.775,
		lng: -84.382
	}

},
{
	name: 'memphis',
	lat: 43.554,
	lng: 34.432
}
]


// for (var i = 0; i < cities.length; i++) {
// 	new google.maps.Marker({
// 		position: (cities[i].lat, cities[i].lng),
// 		map: map
// 	})
// }