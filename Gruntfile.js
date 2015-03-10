
module.exports = function(grunt) {
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		"uglify": {			
			"la-promesa_distro": {
				files: {
				  'dist/la-promesa_<%= pkg.version %>.min.js':  [
																				 'src/la-promesa.js'
																				]
				}
			}
			
		}, 
		
		"jasmine": {			
			"la-promesa_async": {
				src: 'src/la-promesa.js',
				options: {
					specs: 'test/spec/laPromesaSpec-async.js'
				}
			},
					
			"la-promesa_sync": {
				src: 'src/la-promesa.js',
				options: {
					specs: 'test/spec/laPromesaSpec-sync.js'
				}
			},
					
			"la-promesa_mixsync": {
				src: 'src/la-promesa.js',
				options: {
					specs: 'test/spec/laPromesaSpec-mixsync.js'
				}
			}
		}
		
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  
  grunt.registerTask('default', [ 'jasmine','uglify' ]);     

};




