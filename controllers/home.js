var sidebar = require('../helpers/sidebar');
var viewModel = {
		images: [
		   {
			uniqueId: 1,
			title: 'Sample image 1',
			description: 'First Image',
			filename: 'sample1.jpg',
			views: 0,
			likes: 0,
			timestamp: Date.now()
		   },
		   {
			uniqueId: 2,
			title: 'Sample image 2',
			description: 'Second Image',
			filename: 'sample2.jpg',
			views: 0,
			likes: 0,
			timestamp: Date.now()
		   },
		   {
			uniqueId: 3,
			title: 'Sample image 3',
			description: 'Third Image',
			filename: 'sample3.jpg',
			views: 0,
			likes: 0,
			timestamp: Date.now()
		   },
		   ]
};

module.exports = {
	index: function(req, res) {
		sidebar(viewModel, function(err, viewModel) {
			if(err) throw err;
			res.render('index', viewModel);
		});
	}
};