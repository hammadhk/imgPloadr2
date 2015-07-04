module.exports = {
	popular: function(){
		var images = [
	              {
	            	  uniqueId: 1,
	            	  title: 'Sample Image 1',
	            	  description: '',
	            	  filename: 'sample1.jpg',
	            	  view: 0,
	            	  likes: 0,
	            	  timestamp: Date.now()
	              },
	              {
	            	  uniqueId: 2,
	            	  title: 'Sample Image 2',
	            	  description: '',
	            	  filename: 'sample2.jpg',
	            	  view: 0,
	            	  likes: 0,
	            	  timestamp: Date.now()
	              }
              ];
		return images;
	}
}