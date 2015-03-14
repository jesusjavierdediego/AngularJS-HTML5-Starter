'use strict';

describe("Midway: Testing Controllers", function () {

    var tester;
    beforeEach(function () {
        if (tester) {
            tester.destroy();
        }
        tester = ngMidwayTester('App', {
            template: '<div><div ui-view></div></div>'
        });
    });

    it('should load the /home route by default', function (done) {
        tester.visit('/', function () {
            expect(tester.path()).to.equal('/multiform');
            var current;
            tester.until(function () {
                current = tester.inject('$state').current;
                return current.templateUrl;
            }, function () {
                expect(current.templateUrl).to.equal('views/multiform/partials/initial.html');
                done();
            });
        });
    });

});
