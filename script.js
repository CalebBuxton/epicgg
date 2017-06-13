//Twitch Client ID
// rw8ngqk6id3gqkl2r9ugxznh348mds

//YouTube API Key
//AIzaSyBVy0EAkJ0kLC1HlyZ81wXGvNy9HpQwTqE

$("#send").on("click", function(){


	$("#content").html("")
	$("#yt").html("")
	var value = $("#value").val().trim();

	twitchData(value);
	youtubeData(value);
	$("#value").val("")

})

function twitchData(value) {
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/search/streams?query=' + value,
		headers: {
			'Client-ID': 'rw8ngqk6id3gqkl2r9ugxznh348mds',
			'Accept': 'application/vnd.twitchtv.v5+json'
		},
		success: function(data) {
			for (var i = 0; i < data.streams.length; i++) {
				$("#content").append("<a href='" + data.streams[i].channel.url + "' target='_blank'><img src='" + data.streams[i].preview.medium + "'></a><br><p>" + data.streams[i].channel.display_name + "</p>")
			};
		}
	});
}

function youtubeData(value) {
	$.ajax({
		type: 'GET',
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			key: 'AIzaSyBVy0EAkJ0kLC1HlyZ81wXGvNy9HpQwTqE',
			q: value,
			part: 'snippet',
			relevanceLanguage: 'en',
			regionCode: 'US',
			order: 'relevance',
			type: 'video',
			videoCategoryId: '20',
			maxResults: 20
		},
		success: function(data) {
			for (var i = 0; i < data.items.length; i++) {
				console.log(i)
				$("#yt").append("<img src='" + data.items[i].snippet.thumbnails.medium.url + "'><h1>" + data.items[i].snippet.title + "</h1>")
			};

		}
	})
}



function invalid() {
	$('#myModal').modal('show')
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

$("#topGames").on("click", ".topGame", function(){
	var value = $(this).text();
	console.log(value);
})

function newSearch(value) {

}

function topStreams() {
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/streams/?language=en&limit=12',
		headers: {
			'Client-ID': 'rw8ngqk6id3gqkl2r9ugxznh348mds',
			'Accept': 'application/vnd.twitchtv.v5+json'
		},
		success: function(data) {
			console.log(data);

			for (var i = 0; i < data.streams.length; i++) {
				$("#firstContentRow").append("<div class='col-sm-4 preview'><img src='" + data.streams[i].preview.medium + "'><div class='streamInfo'><p>" + data.streams[i].channel.display_name + " playing " + data.streams[i].channel.game + "</p></div></div>")
			}
		}
	});
}

function topVideos() {
	$.ajax({
		type: 'GET',
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			key: 'AIzaSyBVy0EAkJ0kLC1HlyZ81wXGvNy9HpQwTqE',
			chart: 'mostPopular',
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
				$("#secondContentRow").append("<div class='col-sm-4 preview'><img src='" + data.items[i].snippet.thumbnails.medium.url + "'><div class='streamInfo'><p>" + data.items[i].snippet.title + "</p></div></div>")
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

pageLoad();