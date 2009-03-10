/*
Script: Zarishi.js
	A Lightweight IRC Bot

Copyright:
	Copyright (c) 2009 Mark Obcena <markeeto@gmail.com>
	
License:
	MIT-style license.
*/

// -----------------
//    ZARISHI CORE
// -----------------

var Zarishi = {
	
	// Info
	'version': 0.01,
	'author': 'Mark Obcena',
	
	initialize: function(){
		this.irc = Titanium.Network.createIRCClient();
	},
	
	connect: function(){
		this.irc.connect(this.Prefs.host, 
			this.Prefs.port, 
			this.Prefs.name,
			this.Prefs.display, 
			this.Prefs.user, 
			this.Prefs.password, 
			this.handler
		);

		for (var i = 0, l = this.Prefs.channels.length; i < l; i++) {
			var chan = this.Prefs.channels[i];
			chan = chan.substring(0, 1) == "#" ? chan : "#" + chan;
			this.irc.join(chan);
		}
	},
	
	handler: function(cmd, data, chan, user){
		new Element('div', {
			text: cmd + " | " + chan + " | " + data + " | " + user
		}).inject($('log'));
		if (cmd == 'PRIVMSG') {
			for (var i = 0, x = Zarishi.Plugins.list.length; i < x; i++) {
				Zarishi.Plugins.list[i].parse(cmd, data.substring(1,data.length), user, chan);
			}
		}
	},
	
	send: function(msg, channel){
		this.irc.send(channel, msg);
	}

};

Zarishi.Plugins = {
	
	list: [],
	
	register: function(plugin){
		this.list.push(plugin);
	},
	
	unregister: function(){
		
	}
	
};

// -----------------
//     PLUGIN NS
// -----------------

var Plugin = {}

