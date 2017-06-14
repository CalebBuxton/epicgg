//Twitch Client ID
// rw8ngqk6id3gqkl2r9ugxznh348mds

//YouTube API Key
//AIzaSyBVy0EAkJ0kLC1HlyZ81wXGvNy9HpQwTqE

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

function newSearch(value) {
	twitchData(value);
	youtubeData(value);	
}

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
					$("#firstContentRow").append("<div class='col-sm-4 preview'><a href='" + data.streams[i].channel.url + "' target='_blank'><img src='" + data.streams[i].preview.medium + "'><div class='streamInfo'><p>" + data.streams[i].channel.status + "</p><p>" + data.streams[i].channel.display_name + " |  <i class='fa fa-user liveViewers'></i> " + data.streams[i].viewers + "</p></div></a></div>")

				}
			};
		},
		error: function() {
			$('#noResults').modal('show');
		}
	});
}

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
				$("#secondContentRow").append("<div class='col-sm-4 preview'><a href='https://www.youtube.com/watch?v=" + data.items[i].id.videoId + "' target='_blank'><img src='" + data.items[i].snippet.thumbnails.medium.url + "'><div class='streamInfo'><p>" + data.items[i].snippet.title + "</p></div></a></div>")			};

			}
		})
}

function invalid() {
	$('#badSearch').modal('show');
}

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
				$("#firstContentRow").append("<div class='col-sm-4 preview'><a href='" + data.streams[i].channel.url + "' target='_blank'><img src='" + data.streams[i].preview.medium + "'><div class='streamInfo'><p>" + data.streams[i].channel.display_name + " playing " + data.streams[i].channel.game + "</p><p><i class='fa fa-user liveViewers'></i> " + data.streams[i].viewers + "</p></div></a></div>")
			}
		}
	});
}

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
				$("#secondContentRow").append("<div class='col-sm-4 preview'><a href='https://www.youtube.com/watch?v=" + data.items[i].id.videoId + "' target='_blank'><img src='" + data.items[i].snippet.thumbnails.medium.url + "'><div class='streamInfo'><p>" + data.items[i].snippet.title + "</p></div></a></div>")
			}
		}
	})
}

function pageLoad() {
	$("#firstPanel").text("Current Top Streams");
	$("#secondPanel").text("Current Top Gaming Videos");
	topStreams();
	topGames();
	topVideos();
}

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

pageLoad();

// var xml = "<rss xmlns:media="search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">",
// xmlDoc = $.parseXML(xml),
// $xml = $(xmlDoc);

// var title = $xml.find("title");
// console.log(title)

$("#change").on("click", function() {
	if ($("#styles").attr("href") === "./assets/css/style.css") {
		$("#styles").attr("href", "./assets/css/style2.css")
	}
	else {
	$("#styles").attr("href", "./assets/css/style.css")
}
})