'use strict';

var sharedConfig = require('./karma-shared.conf');

module.exports = function (config) {
    var conf = sharedConfig();

    conf.junitReporter = {
        outputFile: 'test/reports/midway-test-results.xml'
    };

    conf.coverageReporter.dir += 'midway';

    conf.files = conf.files.concat([

        'app/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
        'app/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',

        //extra testing code
        'node_modules/ng-midway-tester/src/ngMidwayTester.js',

        //mocha stuff
        'test/mocha.conf.js',

        //test files
        'test/midway/**/*.js'
    ]);

    conf.proxies = {
        '/': 'http://localhost:9090/'
    };

    config.set(conf);
};
