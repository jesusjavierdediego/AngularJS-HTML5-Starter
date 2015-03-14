'use strict';

describe("E2E: Testing Controllers", function () {

    it('should have a working home page controller', function () {
        browser.setLocation('/home');
        expect(browser.getLocationAbsUrl()).toBe(browser.baseUrl + "/#/multiform");
    });

});
