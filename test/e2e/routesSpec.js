'use strict';

describe("E2E: Testing Routes", function () {

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('AngularJS HTML5 Starter');
    });

    it('should jump to the /home path when / is accessed', function () {
        expect(browser.getLocationAbsUrl()).toBe(browser.baseUrl + "/#/multiform");
    });
});
