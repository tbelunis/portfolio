/*
 After you have changed any settings for the responsive_images task,
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [{
              width:300,
              height: 200,
              quality: 40,
              aspectRatio: false,
              upscale:true,
              rename: false
          },{
              width: 600,
              height: 400,
              suffix: '_2x',
              quality: 60,
              aspectRatio: false,
              upscale: true,
              rename: false
            }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },

    /* Clear out the images_src directory if it exists */
    clean: {
      dev: {
        src: ['images']
      }
    },

    /* Generate the images_src directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images_src']
        }
      }
    },

    /* Copy the "fixed" images_src that don't go through processing into the images_src/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: ['images_src/fixed/*.{gif,jpg,png}'],
          dest: 'images/',
          flatten: true
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);

};
