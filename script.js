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
