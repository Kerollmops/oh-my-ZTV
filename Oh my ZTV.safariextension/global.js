safari.application.addEventListener("command", performCommand, false);

var zeraTvId = "x2aykmd";
var button = safari.extension.toolbarItems[0];

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
	// check chaque 1/4 d'heure
	setInterval(is_zera_onair, 15000);
}

function		is_zera_onair() {

	var ret = false;
	$.ajax({
		type: "GET",
		url: "https://api.dailymotion.com/video/" + zeraTvId + "?fields=onair",
		dataType: "json",
		success: function(json) {

			if (json.onair === true) { ret = json.onair; }
		},
		data: {},
		async: false
	});

	if (ret === true && button) { button.badge = 1; }
	return ret;
}
