var fs = require('fs'),
	path = require('path'),
	sidebar = require('../helpers/sidebar');

var viewModel = {
		image: {
			uniqueId: 1,
			title: 'Sample Image 1',
			description: 'Frist Image',
			filename: 'sample1.jpg',
			views: 0,
			likes: 0,
			timestamp: Date.now()
		},
		comments: [
           {
				image_id:	1,
				email:	'test@testing.com',
				name:	'Test	Tester',
				gravatar:	'http://lorempixel.com/75/75/animals/1',
				comment:	'This	is	a	test	comment...',
				timestamp:	Date.now()
           	},{
				image_id:	1,
				email:	'test@testing.com',
				name:	'Test	Tester',
				gravatar:	'http://lorempixel.com/75/75/animals/2',
				comment:	'Another	followup	comment!',
				timestamp:	Date.now()
       		}
		]
};
module.exports = {
	index: function(req, res) {
		sidebar(viewModel, function(viewModle){
			res.render('image', viewModel);
		});
	},
	create: function(req, res) {
		var saveImage = function(){
			console.log('here in images create for busboy');
			var fstream;
		    req.pipe(req.busboy);
		    console.log(req.busboy);
		    req.busboy.on('file', function (fieldname, file, filename) {
		        console.log("Uploading: " + filename);
		        var outputFile =__dirname + '/../public/upload/temp/' + filename;
		        fstream = fs.createWriteStream(outputFile);
		        file.pipe(fstream);
		        fstream.on('close', function () {
		            res.redirect('back');
		        });
		        

				var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
					imgUrl = '';
				for(var i=0; i < 6; i++) {
					imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				
				var tempPath = outputFile,
					ext = path.extname(filename).toLowerCase(),
					targetPath = path.resolve('./public/upload/' + imgUrl + ext);
					console.log('output path: ' + targetPath);
				
				if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
					fs.rename(tempPath, targetPath, function(err) {
						if(err) throw err;
						res.redirect('/images/' + imgUrl);
					});
				} else {
					fs.unlink(tempPath, function() {
						res.json(500, {error: 'Only image files are allowed.'});
					});
				}
		    });
		};
		
		saveImage();
	},
	like: function(req, res) {
		res.json({likes: 1});
	},
	comment: function(req, res) {
		res.send('The image: comment POST controller');
	}
};