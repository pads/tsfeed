/*global module:false */
module.exports = function(grunt) {

    grunt.initConfig({

        copy: {
            all: {
                options: {
                    flatten: true
                },
                files: {
                    "app/assets/": ["src/**/*.*"]
                }
            }
        },
        exec: {
            tsserve: {
                command: "cd app && tsapp serve",
                stdout: true
            },
            tspush: {
                command: "cd app && tsapp push tsfeed_public",
                stdout: true
            }
        },
        jshint: {
            all: ["Gruntfile.js", "app/assets/*.js"],
            options: {
                "bitwise": true,
                "camelcase": true,
                "curly": true,
                "eqeqeq": true,
                "forin": true,
                "immed": true,
                "indent": 4,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "noempty": true,
                "quotmark": "double",
                "trailing": true,
                "maxlen": 120,
                "undef": true,
                "unused": true,
                "boss": true,
                "browser": true,
                "sub": true,
                "globals": {
                    "google": true,
                    "alert": true
                }
            }
        }
    });

    grunt.registerTask("ts-deploy", "Deploy the application to TiddlySpace", function () {

        grunt.task.run("exec:tspush");
    });

    grunt.registerTask("ts-serve", "Host the application locally via tsapp", function () {

        grunt.task.run("exec:tsserve");
    });

    grunt.registerTask("default", ["jshint"]);

    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
};