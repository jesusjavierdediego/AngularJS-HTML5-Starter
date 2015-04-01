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
                readList: function () {},
                readBatch: function () {}
            }
                 
        });
        //flags
        expect(scope.loading).to.be.a.boolean;
        expect(scope.resolved).to.be.a.boolean;
        //retrieved data for the form
        expect(scope.debitLedgerTypes).to.be.an.array;
        expect(scope.creditLedgerTypes).to.be.an.array;
        expect(scope.debitAgents).to.be.an.array;
        expect(scope.creditAgents).to.be.an.array;
        expect(scope.txTypes).to.be.an.array;
        //model
        expect(scope.so1Object).to.be.an.array;
        //methods
        expect(scope.changeDebitAgentStatus).to.be.a.function;
        expect(scope.sendForm).to.be.a.function;
        expect(scope.resetForm).to.be.a.function;
    });


});
