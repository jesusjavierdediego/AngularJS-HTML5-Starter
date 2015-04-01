'use strict';
/*
 * Webdriver quirk. 
 * <input> and <textarea> elements always have empty getText values. 
 * Instead, try element.getAttribute('value').
 */

describe('PerformManualEntryForm Test Suite',function(){
    
    beforeEach(function() {
        var ptor = protractor.getInstance();
        ptor.waitForAngular();
        browser.ignoreSynchronization = false;
        browser.get('#/multiform/ao1');
        
    });
    
    var mTCNDate = element(By.id('MTCNDate'));
    var amount = element(By.model('so1Object.amount'));
    
    
//    function setInput(val) {
//        var scr = "var ipt = document.getElementById('MTCNDate'); " +
//            "ipt.value = '" + val + "';" +
//            "angular.element(ipt).scope().$apply(function(s) { s.PerformManualEntryForm[ipt.name].$setViewValue('" + val + "'); });";
//        browser.executeScript(scr);
//    }
    
//    it('should have MTCNDate in PerformManualEntry form', function() {
//        expect(this.mTCNDate.getText()).toContain('');
//    });
//    it('should have amount field in PerformManualEntry form', function() {
//        expect(this.amount.getText()).toContain('');
//    });
    it('should the amount field accept no decimals number', function() {
        amount.sendKeys('2');
        expect(amount.getAttribute('value')).toEqual('2');
    });
    
});
