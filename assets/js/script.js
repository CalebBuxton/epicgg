//Twitch Client ID
// rw8ngqk6id3gqkl2r9ugxznh348mds

//YouTube API Key
//AIzaSyBVy0EAkJ0kLC1HlyZ81wXGvNy9HpQwTqE


//Validates user search is not blank, if not sends it to the seach functions.
function validate() {
	var value = $("#value").val().trim();
	if (value.length < 1) {
		invalid();
	}
	else {
		newSearch(value);
		$("#value").val("")
	}
}


//Passes value to search functions
function newSearch(value) {
	twitchData(value);
	youtubeData(value);	
}


//Gets top Twitch streams based on viewers for the user specified search
function twitchData(value) {
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/search/streams?query=' + value +'&limit=9',
		headers: {
			'Client-ID': 'rw8ngqk6id3gqkl2r9ugxznh348mds',
			'Accept': 'application/vnd.twitchtv.v5+json'
		},
		success: function(data) {
			if (data.streams.length < 1 ) {
				$('#noResults').modal('show')
			}
			else {	
				$("#firstPanel").text("Top Live Streams");
				$("#firstContentRow").html("");
				console.log(data);
				for (var i = 0; i < data.streams.length; i++) {
					$("#firstContentRow").append("<div class='col-sm-4 previewGrid'><a href='" + data.streams[i].channel.url + "' target='_blank'><div class='previewPlaceholder'><img src='" + data.streams[i].preview.medium + "' class='preview' data-stream-preview='" + data.streams[i].channel.display_name + "''></div><div class='streamInfo'><p>" + data.streams[i].channel.status + "</p><p>" + data.streams[i].channel.display_name + " |  <i class='fa fa-user liveViewers'></i> " + data.streams[i].viewers + "</p></div></a></div>")

				}
			};
		},
		error: function() {
			$('#noResults').modal('show');
		}
	});
}


//Gets the top videos from YT using the user input search
//Results are fron the past two days in the gaming category
function youtubeData(value) {
	var date = moment().add(-2, 'days').format("YYYY-MM-DDTHH:mm:ssZ");

	$.ajax({
		type: 'GET',
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			key: 'AIzaSyBVy0EAkJ0kLC1HlyZ81wXGvNy9HpQwTqE',
			q: value,
			publishedAfter: date,
			part: 'snippet',
			relevanceLanguage: 'en',
			regionCode: 'US',
			type: 'video',
			videoCategoryId: '20',
			maxResults: 6
		},
		success: function(data) {
			$("#secondPanel").text("Recent Videos");
			$("#secondContentRow").html("");
			for (var i = 0; i < data.items.length; i++) {
				$("#secondContentRow").append("<div class='col-sm-4 previewGridYT'><a href='https://www.youtube.com/watch?v=" + data.items[i].id.videoId + "' target='_blank'><img src='" + data.items[i].snippet.thumbnails.medium.url + "' class='previewYT'><div class='streamInfo'><p>" + data.items[i].snippet.title + "</p></div></a></div>")			};

			}
		})
}


//No contents in search
function invalid() {
	$('#badSearch').modal('show');
}


//Gets the top 10 games from Twitch based on overall views at this time.
function topGames() {
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/games/top',
		headers: {
			'Client-ID': 'rw8ngqk6id3gqkl2r9ugxznh348mds',
			'Accept': 'application/vnd.twitchtv.v5+json'
		},
		success: function(data) {
			console.log(data);

			for (var i = 0; i < data.top.length; i++) {
				$("#topGames ul").append("<li class='topGame'>" + data.top[i].game.name + "</li>")
			}
		}
	});
}



//Gets top streams from Twitch currently based on viewers
function topStreams() {
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/streams/?language=en&limit=9',
		headers: {
			'Client-ID': 'rw8ngqk6id3gqkl2r9ugxznh348mds',
			'Accept': 'application/vnd.twitchtv.v5+json'
		},
		success: function(data) {
			console.log(data);

			for (var i = 0; i < data.streams.length; i++) {
				$("#firstContentRow").append("<div class='col-sm-4 previewGrid'><a href='" + data.streams[i].channel.url +
					"' target='_blank'><div class='previewPlaceholder'>"+
					"<img class='preview' src='" + data.streams[i].preview.medium + "' data-stream-preview='"+ data.streams[i].channel.display_name +"'>"+
					"</div></a><div class='streamInfo'><p>" +
					data.streams[i].channel.display_name + " playing " + data.streams[i].channel.game + "</p><p><i class='fa fa-user liveViewers'></i> " +
					data.streams[i].viewers + "</p></div></div>")

			}
		}
	})
}


//Gets top videos in gaming category on YT from the past day
function topVideos() {
	var date = moment().add(-1, 'days').format("YYYY-MM-DDTHH:mm:ssZ");
	$.ajax({
		type: 'GET',
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			key: 'AIzaSyBVy0EAkJ0kLC1HlyZ81wXGvNy9HpQwTqE',
			chart: 'mostPopular',
			publishedAfter: date,
			part: 'snippet',
			relevanceLanguage: 'en',
			regionCode: 'US',
			type: 'video',
			videoCategoryId: '20',
			maxResults: 6
		},
		success: function(data) {
			console.log(data);

			for (var i = 0; i < data.items.length; i++) {
				$("#secondContentRow").append("<div class='col-sm-4 previewGridYT'><a href='https://www.youtube.com/watch?v=" + data.items[i].id.videoId + "' target='_blank'><img src='" + data.items[i].snippet.thumbnails.medium.url + "' class='previewYT'><div class='streamInfo'><p>" + data.items[i].snippet.title + "</p></div></a></div>")
			}
		}
	})
}



//startup function and eSports Content function
function pageLoad() {
	$("#topGames ul").html(" ")
	$("#firstPanel").text("Current Top Streams");
	$("#secondPanel").text("Current Top Gaming Videos");
	topStreams();
	topGames();
	topVideos();

}

function switchContent() {
	$('#firstContentRow').html(" ");
	$('#secondContentRow').html(" ");
	$("#firstPanel").text("Upcoming Event Locations");
	$("#secondPanel").text("Calendar of Events");
	if ($('#switch').text() === 'View eSports Events') {
		esportsEvents();
	}

	else {
		$("#topGames ul").html(" ")
		$("#switch").text("View eSports Events")
		pageLoad();
	}
}

function esportsEvents() {
	$('#firstContentRow').html("<div id='map'></div>");
	$('#secondContentRow').html("<div id='calendar'></div>");
	$('#switch').text('View eSports Content');
	console.log('working');
	mapSetup();
}


$('#switch').on("click", function(){
	switchContent();
})

//Sidebar search interations and email input setup
$("input[type='text']").keypress(function(event){
	if (event.which === 13) {
		validate();
	}
})

$("#send").on("click", function(){
	validate();
});

$("#topGames").on("click", ".topGame", function(){
	var value = $(this).text();
	newSearch(value);
});

$(document).ready(function() {
	$('#emailButton').hide();
	$('input').change(function(e) {
		if ($('#userEmail').val() && validateEmail($('#userEmail').val())) {
			$('#emailButton').show();
		}
	});
});



//Firebase Config and Setup
var config = {
	apiKey: "AIzaSyDVcwcqgh7-L_pravAUBRptwmr8QVtH0cM",
	authDomain: "epicgg-65205.firebaseapp.com",
	databaseURL: "https://epicgg-65205.firebaseio.com",
	projectId: "epicgg-65205",
	storageBucket: "epicgg-65205.appspot.com",
	messagingSenderId: "496054837947"
};
firebase.initializeApp(config);
var database = firebase.database();


//Email input and button interactions
$("#emailButton").on("click", function(event){
	event.preventDefault();
	var email = $("#userEmail").val().trim()

	$("#userEmail").val("");

	database.ref().push(email);
	$("#emailButton").hide();
})

var validateEmail = function(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};



//Theme Changing buttons
$("#blue").on("click", function() {
	$("#styles").attr("href", "./assets/css/style2.css");
})
$("#orange").on("click", function() {
	$("#styles").attr("href", "./assets/css/style.css");
})
$("#donny").on("click", function() {
	$("#styles").attr("href", "./assets/css/donnystyle.css");
})
$("#sidStyle").on("click", function() {
	$("#styles").attr("href", "./assets/css/sidStyle.css");
})



//Preview Window
// $(document).on('mouseenter','.preview',(function(e){
// 	xOffset = -20;
// 	yOffset = 40;

// 	console.log($(this).data("stream-preview"));

// 	$("body").append("<iframe id='preview'src='https://player.twitch.tv/?channel="+$(this).data("stream-preview")+
// 		"' height='auto' width='300px' frameborder='0' scrolling='no' allowfullscreen='false'></iframe>");
// 	$("#preview")
// 	.css("top",(e.pageY - xOffset) + "px")
// 	.css("left",(e.pageX + yOffset) + "px")
// 	.fadeIn("slow");
// }));

// $(document).on('mousemove','.preview',(function(e){
// 	$("#preview")
// 	.css("top",(e.pageY - xOffset) + "px")
// 	.css("left",(e.pageX + yOffset) + "px");
// }));

// $(document).on('mouseleave','.preview',(function(e){
// 	$('#preview').remove();
// }));

//Preview in the same window on mouseover
$(document).on('mouseenter','.previewGrid',(function(e){
	var user = $(this).find("img").attr("data-stream-preview");
	$(this).find("img").addClass("hidden");
	$(this).find(".previewPlaceholder").append("<iframe id='preview'src='https://player.twitch.tv/?channel="+ user +
		"' height='auto' width='100%' frameborder='0' scrolling='no' allowfullscreen='false'>" + 
		"</iframe>")
}));
$(document).on('mouseleave','.previewGrid',(function(e){
	$('#preview').remove();
	$(this).find("img").removeClass("hidden")
}));


function mapSetup(){
	mapboxgl.accessToken = 'pk.eyJ1IjoiZGdhYmFpIiwiYSI6ImNqNDNweGx1dDA3NG0zM243MGQzNzQ0bWcifQ.8Auku3GqYC_xjQFCYBtEMg';
	var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-101.54, 39.58], // starting position
    zoom: 3 // starting zoom

});

	// Add zoom and rotation controls to the map.
	map.addControl(new mapboxgl.NavigationControl());

	var cities = [
	{
		"name": "Atlanta GA",
		"lat": 33.775,
		"lng": -84.382,
		"description": "Terminus Conferece, " + "June 22nd - 25th, " + "https://terminusevent.com/"
	},
	{
		"name": "Minneapolis MN",
		"lat": 44.978,
		"lng":  -93.269,
		"description": "2D Con, " + "August 11 - 13th, " + "https://www.2dcon.net/"
	},
	{
		"name": "Indianapolis IN",
		"lat": 39.768,
		"lng": -86.158,
		"description": "Gen Con 50, " + "August 17 - 20th, " + "http://www.gencon.com/"
	},
	{
		"name": "Austin TX",
		"lat": 30.267,
		"lng": -97.743,
		"description": "Rooster Teeth Expo," + " July 7th - 9th," + " http://www.rtxaustin.com/"
	},
	{
		"name":"San Jose CA",
		"lat": 37.338,
		"lng": -121.886,
		"description": "Realities 360 Conference, " + " July 26th - 28th, " + "https://www.elearningguild.com/realities360/content/4900/2017-realities360-conference--home/?utm_campaign=r17se&utm_medium=social&utm_source=linkedin-arvrvw"
	},
	{
		"name":"New York NY",
		"lat": 40.712,
		"lng": -74.005,
		"description": "Games for Change, " + "July 31st - August 2nd, " + "http://festival.gamesforchange.org/"
	},
	{
		"name":"Orlando FL",
		"lat": 28.538,
		"lng": -81.379,
		"description": "Orlando Interactive Experience, " + "August 27th - August 30th, " + "http://www.orlandoix.com/"
	},
	{
		"name":"Fiarfax, VA",
		"lat": 38.846,
		"lng": -77.306,
		"description": "Serious Play Conferece, " + "July 18th-20th, " + "http://seriousplayconf.com/"
	},
	{
		"name": "San Francisco CA",
		"lat": 37.929,
		"lng": -122.430,
		"description": "VR Connects San Francisco, " + "June 27th-28th, " + "http://www.vr-connects.com/sanfrancisco/"
	},
	{   
		"name":"Memphis TN",
		"lat": 35.152,
		"lng": -90.052,
		"description": "Mid-South Indie Game Expo, " + "July 22nd, " + "http://www.midsouthigx.com/"
	}
	];


	var newArray = ["i","o",2,3,4,5,6,7,8,9];

	for (city in cities){
		// console.log(cities[city]["name"]);    
		var popup = new mapboxgl.Popup({offset: 50})
		.setText(cities[city]["description"]);
		var el = document.createElement('div');
		el.className = 'marker';
		new mapboxgl.Marker(el, {offset:[-25, -50]})
		.setLngLat([cities[city]["lng"], cities[city]["lat"]])
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);

    }

    $('#calendar').fullCalendar({
    	defaultDate: '2017-06-12',
    	editable: false,
            eventLimit: true, // allow "more" link when too many events
            events: [
            {
            	title: 'Terminus Conference',
            	start: '2017-06-22',
            	end: '2017-06-25',
            	url: 'https://terminusevent.com/'
            },
            {
            	title: '2D Con',
            	start: '2017-08-11',
            	end: '2017-08-13',
            	url: 'https://www.2dcon.net/'
            },
            {
            	title: 'Gen Con 50',
            	start: '2017-08-17',
            	end: '2017-08-20',
            	url: 'http://www.gencon.com/'
            },
            {
            	title: 'Rooster Teeth Expo',
            	start: '2017-07-07',
            	end: '2017-07-09',
            	url: 'http://www.rtxaustin.com/'
            },
            {
            	title: 'Realities 360 Conference',
            	start: '2017-07-26',
            	end: '2017-07-28',
            	url: 'https://www.elearningguild.com/realities360/content/4900/2017-realities360-conference--home/?utm_campaign=r17se&utm_medium=social&utm_source=linkedin-arvrvw'
            },
            {
            	title: 'Games for Change',
            	start: '2017-07-31',
            	end: '2017-08-02',
            	url: 'http://festival.gamesforchange.org/'
            },
            {
            	title: 'Orlando Interactive Experience',
            	start: '2017-08-27',
            	end: '2017-08-30',
            	url: 'http://www.orlandoix.com/'
            },
            {
            	title: 'Serious Play Conferece',
            	start: '2017-07-18',
            	end: '2017-07-20',
            	url: 'http://seriousplayconf.com/'
            },
            {
            	title: 'VR Connects San Francisco',
            	start: '2017-06-27',
            	end: '2017-06-28',
            	url: 'http://www.vr-connects.com/sanfrancisco/'
            },
            {
            	title: 'Mid-South Indie Game Expo',
            	start: '2017-07-23',
            	end: '2017-07-25',
            	url: 'http://www.midsouthigx.com/'
            }
            ]
        });
$('.mapboxgl-canvas')[0].style.position = 'relative';
$('.fc-event-container a').attr('target', "_blank" );

}


//Startup
pageLoad();


