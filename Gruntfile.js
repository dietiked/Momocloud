module.exports = function(grunt) {
// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},
			dev: ['Gruntfile.js', 'src/**/*.js', '!src/libs/**'],
			dist: ['dist/**/*.js', '!dist/libs/**']
		},
		
		html2js: {
			options: {
				module: 'momocloudTemplateCache',
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeComments: true,
				}
			},
			deploy: {
				src: ['src/apps/**/*.html', 'src/directives/templates/**/*.html'],
				dest: 'temp/templates.js' 
			}	
		},

		uglify: {
			options: {
				mangle: false
			},
			deploy: {
				files: {
					'temp/momocloud.min.js': ['src/services/**/*.js', 'src/app.js'],
					'dist/momocloud.min.js': ['temp/momocloud.min.js', 'src/directives/**/*.js', 'src/apps/**/*.js', 'temp/templates.js'],
				}
			}
		},
				
		copy: {
			deploy: {
				files: [
					{expand: true, cwd: 'src/img/', src: ['**'], dest: 'dist/img/'}, // Image folder
					{expand: true, cwd: 'src/css/', src: ['**/*.css'], dest: 'dist/css/'}, // CSS
					{expand: true, cwd: 'src/libs/', src: ['**/*.min.js', '**/*.map', '**/*-min.js'], dest: 'dist/libs/'}, // Libraries JS
					{expand: true, cwd: 'src/libs/', src: ['**/*.woff', '**/*.ttf', '**/*.svg'], dest: 'dist/libs/'}, // Fonts
					{expand: true, cwd: 'src/libs/', src: ['**/*.css'], dest: 'dist/libs/'}, // Libraries CSS
					//{expand: true, cwd: 'src/apps/', src: ['**/*.html'], dest: 'dist/apps/'}, // Templates
					//{expand: true, cwd: 'src/directives/', src: ['**/*.html'], dest: 'dist/directives/'}, // Directives HTML
					{expand: true, cwd: 'src/api/', src: ['**/*.php'], dest: 'dist/api/'}, // Server files
				]
			}
		},			

	});
	
	grunt.registerTask('deploy', ['html2js:deploy', 'uglify:deploy', 'copy:deploy']);
	grunt.registerTask('test-deploy', ['jshint:dist']);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-angular-templates');	
};