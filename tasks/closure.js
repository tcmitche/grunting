// Closure task for grunt
module.exports = function(grunt) {
    'use strict';

    var exec = require('child_process').exec;

    grunt.registerTask('closure', 'Closure compoiler task.', function() {
        var opts = this.options({}),
            js = opts.js,
            jsOut = opts.jsOutputFile,
            command = 'java -jar "' + opts.closureJar + '"',
            done = this.async();

        if (!js) {
            grunt.log.error(opts);
            grunt.warn('No input file specified');
            return false;
        } else if (!jsOut) {
            grunt.warn('No output path specified');
            return false;
        }

        command += ' --js "' + js + '" --js_output_file "' + jsOut + '"';
        grunt.file.write(jsOut, '');
        exec(command, function(error, stdout, stderr) {
            if (!error) {
                grunt.log.ok();
                done();
            }
        });
    });
}