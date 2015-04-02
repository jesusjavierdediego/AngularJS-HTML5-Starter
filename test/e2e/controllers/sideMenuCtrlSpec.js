'use strict';
/*
 * Side Menu Test
 *
 * Webdriver quirk. 
 * <input> and <textarea> elements always have empty getText values. 
 * Instead, try element.getAttribute('value').
 */

describe('Side Menu Test Suite',function(){
    
    beforeEach(function() {
        browser.get('#/multiform');
    });
    
    var AccountingLink = element(By.linkText('Accounting'));
    var SellsLink = element(By.linkText('Sells'));
    var PortfolioLink = element(By.linkText('Portfolio'));
    
    /*
    Given
    The app is deployed and rendered in the browser
    When 
    I navigate to /multiform
    Then
    The absolute working URL route is /#/multiform
    The site has a title with the text 'AngularJS HTML5 Starter'
    */
    it('should jump to the /multiform path when the browser goes to the home page', function () {
        expect(browser.getLocationAbsUrl()).toBe(browser.baseUrl + "/#/multiform");
    });
    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('AngularJS HTML5 Starter');
    });

    /*
    Given
    The app is deployed and rendered in the browser
    When 
    I click on the Accounting menu item
    Then
    The sub-items under Accounting are displayed
    */
    it('should have sub-items for Accounting', function () {
        AccountingLink.click();
        expect(element(by.css('a[href*="/multiform/ao1"]')).isDisplayed()).toBeTruthy();
        expect(element(by.css('a[href*="/multiform/ao2"]')).isDisplayed()).toBeTruthy();
    });

    /*
    Given
    The app is deployed and rendered in the browser
    When 
    I click on the Portfolio menu item
    Then
    The sub-items under Portfolio are displayed
    */
    it('should have sub-items for Portfolio', function () {
        PortfolioLink.click();
        expect(element(by.css('a[href*="/multiform/po1"]')).isDisplayed()).toBeTruthy();
        expect(element(by.css('a[href*="/multiform/po2"]')).isDisplayed()).toBeTruthy();
        expect(element(by.css('a[href*="/multiform/po3"]')).isDisplayed()).toBeTruthy();
    });
    

});
