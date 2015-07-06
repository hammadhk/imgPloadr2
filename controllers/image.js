var fs = require('fs'),
	path = require('path'),
	sidebar = require('../helpers/sidebar'),
	Models = require('../models'),
	md5 = require('MD5');

var viewModel = {
		image: {},
		comments: []
};
module.exports = {
	index: function(req, res) {
		Models.Image.findOne({filename: {$regex: req.params.image_id}},
			function(err, image){
				if(err) {throw err;}
				if(image) {
					image.views = image.views + 1;
					viewModel.image = image;
					image.save(function(err, image){
						Models.Comment.find({image_id: image._id}, {}, {sort: {'timestamp': 1}},
							function(err, comments){
								if(err) {throw err;}
								viewModel.comments = comments;

								console.log('image loaded + comments loaded');
								console.log(viewModel);
								sidebar(viewModel, function(viewModel){
									res.render('image', viewModel);
								});
							});
					});
				} else {
					res.redirect('/');
				}
			});
	},
	create: function(req, res) {
		var saveImage = function(){

			var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
				newImg = new Models.Image();
				imgUrl = '';
			console.log('image model created');
			console.log(newImg);
			for(var i=0; i < 6; i++) {
				imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			Models.Image.find({filename: imgUrl}, function(err, images) {
				if(images.length > 0) {
					saveImage();
				}
				else {
					var fstream;
				    req.pipe(req.busboy);
				    req.busboy.on('file', function (fieldname, file, filename) {
				        console.log("Uploading: " + filename);
				        
						var ext = path.extname(filename).toLowerCase(),
							targetPath = path.resolve('./public/upload/' + imgUrl + ext);
							console.log('output path: ' + targetPath);
						
						if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
					        fstream = fs.createWriteStream(targetPath);
					        file.pipe(fstream);
						    req.busboy.on('finish', function (){
					        	console.log('busboy finishing');
					        	newImg.filename = imgUrl + ext;
					        	console.log(newImg);
								newImg.save(function(err, image){
									res.redirect('/images/' + image.uniqueId);
								});
						    });
						    
						    req.busboy.on('field', function(fieldname, val){
					        	console.log('busboy fields');
					        	console.log(fieldname + ' - ' + val);
						    	switch(fieldname){
						    	case 'title':
						    		newImg.title = val;
						    		break;
						    	case 'description':
						    		newImg.description = val;
						    	}
						    });

						} else {
							fs.unlink(tempPath, function() {
								res.json(500, {error: 'Only image files are allowed.'});
							});
						}
				    });
				    
				}
			});
			
		};
		saveImage();
	},
	like: function(req, res) {
		Models.Image.findOne({filename: {$regex: req.params.image_id}},
			function(err, image){
				if(err) {throw err;}
				image.likes = image.likes + 1;
				image.save(function(err, image){
					if(err){
						res.json(err);
					} else {
						res.json({likes: image.likes});
					}
				});
			});
//		res.json({likes: 1});
	},
	comment: function(req, res) {
		Models.Image.findOne({filename: {$regex: req.params.image_id}},
			function(err, image){
				if(!err && image){
					var comment = new Models.Comment(req.body);
					comment.gravatar = md5(req.body.email);
					comment.image_id = image._id; 
					
					console.log('adding new comment');
					console.log(comment);
					console.log(image);
					comment.save(function(err, comment){
						res.redirect('/images/' + image.uniqueId + '#' + comment._id);
					});
				} else {
					res.redirect('/');
				}
		});
	}
};