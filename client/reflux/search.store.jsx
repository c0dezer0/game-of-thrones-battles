var HTTP = require('../services/httpservices');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var SearchStore = Reflux.createStore({
	listenables : [Actions],
	search: function(query){
		
		HTTP.get('/api/search')
		.then(function(json){
			this.battles = json;
			this.fireUpdate();
		}.bind(this));
	},
	// refresh function
	fireUpdate: function(){
		this.trigger('change', this.battles);
	}
});

module.exports = SearchStore;