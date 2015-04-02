'use strict';
/*
 * PerformManualEntryForm Test 
 *
 *
 * Webdriver quirk:
 * <input> and <textarea> elements always have empty getText values. 
 * Instead, try element.getAttribute('value').
 */

var _this = this;
describe('PerformManualEntryForm Test Suite',function(){
    
    beforeEach(function() {
        browser.waitForAngular();
        browser.get('#/multiform/ao1');
    });
    
    var amount = element(By.model('so1Object.amount'));
    var debitAccount = element(By.model('so1Object.debitLedgerType'));
    var creditAccount = element(By.model('so1Object.creditLedgerType'));
    var debitAgent = element(By.model('so1Object.debitAgent'));
    var creditAgent = element(By.model('so1Object.creditAgent'));
    var EntryDate = element(By.model('so1Object.EntryDate'));
    var MTCNDate = element(By.model('so1Object.MTCNDate'));

    //To select options in select from the ID
    _this.selectDropdownbyNum = function( element, optionNum ) {
      if (optionNum){
        var options = element.findElements(by.tagName('option'))   
          .then(function(options){
            options[optionNum].click();
          });
      }
    };

    /*
    Given
    The app is deployed and rendered in the browser
    When 
    I navigate to /multiform/ao1
    Then
    The absolute woriking URL route is /#/multiform/ao1
    */
    it('should jump to the /multiform/ao1 path when the browser goes to the PerformManualEntryForm', function () {
        expect(browser.getLocationAbsUrl()).toBe(browser.baseUrl + "/#/multiform/ao1");
    });

    /*
    Given
    The Debit Account is enabled but not yet used
    When 
    The user sees the form
    Then
    The Agent/Account select controls are disabled
    Given
    The Debit Account is enabled
    When 
    The user selects an option
    Then
    The Agent/Account select controls are enabled
    */
    it('should the Agent/Account select controls be disabled if Debit Acc is empty', function() {
        expect(creditAccount.isEnabled()).toBe(false);
        expect(debitAgent.isEnabled()).toBe(false);
        expect(creditAgent.isEnabled()).toBe(false);
    });
    it('should the Agent/Account select controls enabled when Debit Account field is selected', function() {
        expect(debitAccount.isEnabled()).toBe(true);
        var option = element(by.cssContainingText('option', 'Debit Ledger Type 1'));
        option.click();
        expect(option.getText()).toEqual('Debit Ledger Type 1');
        expect(creditAccount.isEnabled()).toBe(true);
        expect(debitAgent.isEnabled()).toBe(true);
        expect(creditAgent.isEnabled()).toBe(true);
    });

    /*
    Given
    The amount control is enabled
    When 
    I enter not valid formats
    Then
    The control validates it and modify to a valid format
    */
    it('should the amount field to remove one final dot', function() {
        amount.sendKeys('2.');
        var blur = "document.getElementById('amount').blur()";
        browser.executeScript(blur);
        expect(amount.getAttribute('value')).toEqual('2');
    });

    it('should the amount field to remove several final dots', function() {
        amount.sendKeys('2...');
        var blur = "document.getElementById('amount').blur()";
        browser.executeScript(blur);
        expect(amount.getAttribute('value')).toEqual('2');
    });

    it('should the amount field to remove final 0s', function() {
        amount.sendKeys('2.00');
        var blur = "document.getElementById('amount').blur()";
        browser.executeScript(blur);
        expect(amount.getAttribute('value')).toEqual('2');
    });

    /*
    Given
    The date control are enabled
    When 
    I enter valid date formats (dd/mm/yyyy)
    Then
    The controls do accept the valid date
    */
    it('should the date controls to be initialized', function() {
        expect(MTCNDate.getText()).toContain('');
        expect(EntryDate.getText()).toContain('');
    });

    it('should the MTCNDate control to accept dates with the valid format', function() {
        //_this.setDateInput('MTCNDate','2015/01/01');
        var focus = "document.getElementById('MTCNDate').focus()";
        MTCNDate.sendKeys('01/01/2016');

        expect($('.validMTCNDate').isDisplayed()).toBeTruthy();
    });

    it('should the EntryDate control to accept dates with the valid format', function() {
        //_this.setDateInput('MTCNDate','2015/01/01');
        var focus = "document.getElementById('EntryDate').focus()";
        EntryDate.sendKeys('01/01/2016');

        expect($('.validEntryDate').isDisplayed()).toBeTruthy();
    });

    /*
    Given
    The amount control is enabled
    When 
    I enter not valid formats
    Then
    The control displays an error
    */
    it('should the MTCNDate control to not accept dates with invalid formats', function() {
        //_this.setDateInput('MTCNDate','2015/01/01');
        var focus = "document.getElementById('MTCNDate').focus()";
        MTCNDate.sendKeys('2015/01/01');

        expect($('.errorMTCNDateInvalid').isDisplayed()).toBeTruthy();
    });

    it('should the EntryDate control to not accept dates with invalid formats', function() {
        //_this.setDateInput('MTCNDate','2015/01/01');
        var focus = "document.getElementById('EntryDate').focus()";
        EntryDate.sendKeys('2015/01/01');

        expect($('.errorEntryDateInvalid').isDisplayed()).toBeTruthy();
    });
});
