/*global module,grunt*/
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        // Tasks que o Grunt deve executar
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'www/main.js': ['src/app/app.js', 'src/app/**/*.js']
                }
            }
        },//uglify
        watch: {
            dist: {
                files: [
                    'src/app/**/*'
                ],
                tasks: ['uglify']
            }
        },//watch
        shell: {
            /*** building platforms ***/
            build_android: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: false
                },
                command: 'phonegap build android'
            },
            build_w8: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: false
                },
                command: 'cordova build windows8'
            },
            /*** running over platforms ***/
            run_android: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    async: false
                },
                command: 'phonegap run android'
            }
        },//shell
        copy: {
            html: {//"src/app/**/*.html",
                expand: true,
                flatten: true,
                src: [ "src/*.html", "src/app/**/*.html"],
                dest: "www/"
            },
            css: {
                expand: true,
                cwd: 'src/css/',
                src: '**',
                dest: "www/css/"
            },
            lib: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/',
                        src: '**',
                        dest: "www/lib/"
                    }
                ]
            }
        },
        concat: {
            javascript: {
                src: ["src/app/app.js", "src/app/**/*.js"],
                dest: 'www/main.js'
            }
        }
    });
    
    
    
    //Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    //Tarefas que serão executadas
    grunt.registerTask('default', ['concat:javascript', 'copy:lib:topcoat', 'copy:html', 'copy:css']);
    
    grunt.registerTask('release', ['uglify', 'copy:lib', 'copy:html', 'copy:css']);
    grunt.registerTask('android', ['uglify', 'copy:lib', 'copy:html', 'copy:css', 'shell:build_android', 'shell:run_android']);
    grunt.registerTask('w8', ['uglify', 'copy:lib', 'copy:html', 'copy:css', 'shell:build_w8']);
    grunt.registerTask('w', ['watch']);
};