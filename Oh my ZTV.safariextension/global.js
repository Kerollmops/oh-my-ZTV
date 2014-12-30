safari.application.addEventListener("command", performCommand, false);

var zeraTvId = "x2aykmd";
var button = safari.extension.toolbarItems[0];
var params = ["3d", "access_error", "ads", "allow_comments", "allow_embed", "allowed_in_groups", "allowed_in_playlists", "aspect_ratio", "audience", "auto_record", "available_formats", "bookmarks_total", "broadcasting", "channel", "cleeng_svod_offer_id", "cleeng_tvod_offer_id", "comments_total", "country", "created_time", "description", "duration", "embed_html", "embed_url", "encoding_progress", "end_time", "event_delete", "event_live_offair", "event_live_onair", "event_modify", "explicit", "filmstrip_small_url", "genre", "geoblocking", "geoloc", "id", "isrc", "language", "live_frag_publish_url", "live_publish_url", "mediablocking", "metadata_credit_actors", "metadata_credit_director", "metadata_genre", "metadata_original_language", "metadata_original_title", "metadata_released", "metadata_show_episode", "metadata_show_season", "metadata_visa", "mode", "moderated", "modified_time", "muyap", "onair", "owner", "paywall", "poster", "poster_135x180_url", "poster_180x240_url", "poster_270x360_url", "poster_360x480_url", "poster_45x60_url", "poster_90x120_url", "poster_url", "price_details", "private", "published", "rating", "ratings_total", "recurrence", "rental_duration", "rental_price", "rental_price_formatted", "rental_start_time", "sharing_urls", "soundtrack_info", "sources", "start_time", "status", "stream_h264_hd1080_url", "stream_h264_hd_url", "stream_h264_hq_url", "stream_h264_ld_url", "stream_h264_url", "stream_source_url", "strongtags", "svod", "swf_url", "sync_allowed", "tags", "taken_time", "thumbnail_120_url", "thumbnail_180_url", "thumbnail_240_url", "thumbnail_360_url", "thumbnail_480_url", "thumbnail_60_url", "thumbnail_720_url", "thumbnail_url", "title", "tvod", "type", "upc", "url", "views_last_day", "views_last_hour", "views_last_month", "views_last_week", "views_total"];

loop_checker();

function		performCommand(event) {

	if (event.command == "open-ohmyztv") {

		if ((test = is_zera_onair()) === true) {

			var newTab = safari.application.activeBrowserWindow.openTab();
			newTab.url = "http://www.eclypsia.com/fr/ZeratoR";
		}
	}
}

function		loop_checker() {

	is_zera_onair();
	// check toutes les 2 minutes
	setInterval(is_zera_onair, 120000);
}

function		is_zera_onair() {

	var			ret = false;
	var			anti_cache = [];

	anti_cache = get_random_fields(params, Math.floor(Math.random() * (params.length / 2)));
	$.ajax({
		type: "GET",
		url: "https://api.dailymotion.com/video/" + zeraTvId + "?fields=onair," + anti_cache.join(),
		dataType: "json",
		success: function(json) {

			if (json.onair === true) { ret = json.onair; }
		},
		data: {},
		async: false
	});

	if (ret === true && button) { button.badge = 1; }
	else if (ret !== true && button) { button.badge = 0; }
	return ret;
}

function		get_random_fields(array, how_many) {

	var			local_array = array.slice();
	var			ret = [];

	for (var i = 0; i < how_many; i++) {

		var rand = Math.floor(Math.random() * local_array.length);
		ret.push(local_array[rand]); // add the random element to the result
		local_array.splice(rand, 1); // remove the element from the local array
	}
	return ret;
}
