"use strict";

module.exports = function () {
    return {
        basePath: '../',
        frameworks: ['mocha'],

        // coverage reporter generates the coverage
        reporters: ['progress', 'junit', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            //            'app/scripts/{*!(api)/*.js,!(app).js}': 'coverage'
            'app/scripts/**/*.js': 'coverage'
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'lcov',
            dir: 'test/coverage/'
        },

        browsers: ['PhantomJS'],
        autoWatch: true,

        // these are default values anyway
        singleRun: false,
        colors: true,

        files: [

            //3rd Party Code
            'app/bower_components/jquery/jquery.min.js',
            'app/bower_components/angular/angular.min.js',
            'app/bower_components/angular-cookies/angular-cookies.min.js',
            'app/bower_components/angular-sanitize/angular-sanitize.min.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'app/bower_components/angular-cache/dist/angular-cache.min.js',
            'app/bower_components/angular-resource/angular-resource.min.js',
            'app/bower_components/ng-grid/build/ng-grid.min.js',
            'app/bower_components/socket.io-client/dist/socket.io.min.js',
 //            'http://cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min.js',

            //App-specific Code
            'app/bower_components/lodash/dist/lodash.underscore.min.js',
            'app/bower_components/restangular/dist/restangular.min.js',

            'app/scripts/api/modules/api-cache.js',
            'app/scripts/api/modules/api-configuration.js',
            'app/scripts/api/modules/api-detection.js',
 //            'app/scripts/api/modules/api-logging.js',
            'app/scripts/api/modules/api-main.js',

            'app/bower_components/lodash/dist/lodash.underscore.min.js',
            'app/bower_components/restangular/dist/restangular.min.js',
            'app/scripts/api/modules/api-rest.js',

            'app/scripts/api/modules/api-security.js',

            'app/scripts/api/modules/api-serverpush.js',

            'app/scripts/api/modules/api-translate.js',
            'app/bower_components/angular-translate/angular-translate.min.js',
            'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
            'app/bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',

            'app/scripts/api/modules/api-performance.js',

            'app/scripts/api/modules/api-utils.js',

            'app/scripts/api/directives/*.js',
            'app/scripts/app.js',
            'app/scripts/controllers/*.js',
            'app/scripts/factories/*.js',
            'app/scripts/states/*.js',

            //Test-Specific Code
            'node_modules/chai/chai.js',
            'test/lib/chai-should.js',
            'test/lib/chai-expect.js'
        ]
    };
};
