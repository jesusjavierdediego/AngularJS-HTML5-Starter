var value = element(by.binding('so1Object.MTCNDate | date: "yyyy-MM-dd"'));
var valid = element(by.binding('PerformManualEntryForm.MTCNDate.$valid'));
var input = element(by.model('so1Object.MTCNDate'));

// currently protractor/webdriver does not support
// sending keys to all known HTML5 input controls
// for various browsers (see https://github.com/angular/protractor/issues/562).
function setInput(val) {
    // set the value of the element and force validation.
    var scr = "var ipt = document.getElementById('MTCNDate'); " +
        "ipt.value = '" + val + "';" +
        "angular.element(ipt).scope().$apply(function(s) { s.PerformManualEntryForm[ipt.name].$setViewValue('" + val + "'); });";
    browser.executeScript(scr);
}

it('should initialize to model', function() {
    expect(value.getText()).toContain('2015-10-22');
    expect(valid.getText()).toContain('PerformManualEntryForm.MTCNDate.$valid = true');
});

it('should be invalid if empty', function() {
    setInput('');
    expect(value.getText()).toEqual('value =');
    expect(valid.getText()).toContain('PerformManualEntryForm.MTCNDate.$valid = false');
});

it('should be invalid if over max', function() {
    setInput('2100-01-01');
    expect(value.getText()).toContain('');
    expect(valid.getText()).toContain('PerformManualEntryForm.MTCNDate.$valid = false');
});
