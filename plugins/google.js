/*
Script: Google.js
	Google search plugin for Zarishi.

Copyright:
	Copyright (c) 2009 Mark Obcena <markeeto@gmail.com>
	
License:
	MIT-style license.
*/

Plugin.Google = {
	
	cache: {},
	
	parse: function(cmd, data, user, chan){
		var self = this;
		var search = data.match(/^\$google\s([\D\d]*)/);
		if (search) {
			if (this.cache[search]) {
				var result = this.cache[search].responseData.results[0];
				var echo = user + ": " + result.url + " ("+result.titleNoFormatting+")"
				Zarishi.send(echo, chan);
			} else {
				var query = search[1];
				var request = new Request({
					'url': 'http://ajax.googleapis.com/ajax/services/search/web',
					'data': 'v=1.0&q=' + escape(query),
					'method': 'get',
					'onSuccess': function(text, xml){
						var results = self.cache[search] = JSON.decode(text);
						var top = results.responseData.results[0];
						var echo = user + ": " + top.url + " ("+top.titleNoFormatting+")"
						Zarishi.send(echo, chan);
					}
				}).send();
			}
		}
	}
	
}

Zarishi.Plugins.register(Plugin.Google);