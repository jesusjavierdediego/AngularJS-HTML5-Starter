/*jshint -W030 */

"use strict";

describe('Unit: Testing AppCache module', function () {

    beforeEach(module("AppCache"));

    it('should contain a CacheFactory factory',
        inject(function (CacheFactory) {

            expect(CacheFactory).to.be.an.object;
        })
    );
});
