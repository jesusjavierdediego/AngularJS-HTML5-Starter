/*jshint -W030 */

"use strict";

describe('Unit: Testing Controllers', function () {
    var scope, controller;

    beforeEach(module('App.Controllers'));

    beforeEach(inject(function ($rootScope, $controller) {

        scope = $rootScope.$new();
        controller = $controller;
    }));

    it('should have a properly working PerformManualEntryCtrl', function () {
        controller('PerformManualEntryCtrl', {
            '$scope': scope,
            'RESTFactory': {
                readList: function () {}
            }
        });
        expect(scope.notes).to.equal(undefined);
    });


});
