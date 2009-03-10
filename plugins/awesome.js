/*
Script: Awesome.js
	Awesome Points plugin for Zarishi

Copyright:
	Copyright (c) 2009 Mark Obcena <markeeto@gmail.com>
	
License:
	MIT-style license.
*/

var points = {
	"markeeto": 100
};

Plugin.Awesome = {

	parse: function(cmd, data, user, chan){
		var awesome = data.match(/([a-zA-Z0-9_]*):\s([\+|\-])([\d]*)/);
		if (awesome && points[user] >= 100) {
			var person = awesome[1];
			var current = points[person] || 0;
			var newpoints = awesome[3] * 1;
			var total = points[person] = (awesome[2] == '+') ? current + newpoints : current - newpoints;
			var echo = person + " now has " + total + " awesome points!";
			Zarishi.send(echo, chan);
		} else if (awesome && points[user] < 100) {
			Zarishi.send(user + ": sorry, you're not awesome enough to give awesome points!", chan);
		}
	}

};

Zarishi.Plugins.register(Plugin.Awesome);