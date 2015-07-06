var Stats = require('./stats'),
	Images = require('./images'),
	Comments = require('./comments'),
	async = require('async');

module.exports = function(viewModel, callback) {
	console.log('here in sidebar');
	async.parallel([
        function(next) {
        	Stats(next);
        },
        function(next) {
        	Images.popular(next);
        },
        function(next) {
        	Comments.newest(next);
        }
    ],
    function(err, results){
		console.log('here in sidebar callback: ');
		console.log('stats: ' + results[0]);
		console.log('popular: ' + results[1]);
		console.log('comments: ' + results[2][0].image.filename);
		viewModel.sidebar = {
			stats: results[0],
			popular: results[1],
			comments: results[2]
		};
		callback(viewModel);
	});

};