'use strict';

var ptor;

// currently protractor/webdriver does not support
// sending keys to all known HTML5 input controls
// for various browsers (see https://github.com/angular/protractor/issues/562).

describe('PerformManualEntryForm Test Suite',function(){
    
    beforeEach(function() {
        browser.get('multiform/ao1');
        ptor = protractor.getInstance();
    });
    
    //ptor.waitForAngular();
    var value = element(by.binding('so1Object.MTCNDate'));
    var valid = element(by.binding('PerformManualEntryForm.MTCNDate.$valid'));
    var input = element(by.binding('so1Object.MTCNDate'));
    
    function setInput(val) {
        // set the value of the element and force validation.
        var scr = "var ipt = document.getElementById('MTCNDate'); " +
            "ipt.value = '" + val + "';" +
            "angular.element(ipt).scope().$apply(function(s) { s.PerformManualEntryForm[ipt.name].$setViewValue('" + val + "'); });";
        browser.executeScript(scr);
    }
    
//    it('should initialize to model', function() {
//        expect(value.getText()).toContain('2015-10-22');
//        expect(valid.getText()).toContain('PerformManualEntryForm.MTCNDate.$valid = true');
//    });
//   
//
//    it('should be invalid if empty', function() {
//        setInput('');
//        expect(value.getText()).toEqual('value =');
//        expect(valid.getText()).toContain('PerformManualEntryForm.MTCNDate.$valid = false');
//    });
//
//    it('should be invalid if over max', function() {
//        setInput('2100-01-01');
//        expect(value.getText()).toContain('');
//        expect(valid.getText()).toContain('PerformManualEntryForm.MTCNDate.$valid = false');
//    });
});
