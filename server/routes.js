var home = require('../controllers/home'),
	image = require('../controllers/image'),
	busboy = require('connect-busboy');

module.exports.initialize = function(app, router) {
	router.get('/', home.index);
	router.get('/images/:image_id', image.index);

	router.post('/images',busboy({
        limits: {
            fileSize: 10 * 1024 * 1024
        }
    }), image.create);
	router.post('/images/:image_id/like', image.like);
	router.post('/images/:image_id/comment', image.comment);

	app.use('/', router);
};