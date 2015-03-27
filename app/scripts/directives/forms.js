'use strict';

/*
 * Directives for multiform screen.
 *
 */
angular.module('App.Directives')

/*.directive('validFloatNumber', function ($filter) {
    var FLOAT_REGEXP_1 = /^\$?\d+.(\d{3})*(\,\d*)$/; //Numbers like: 1.123,56
    var FLOAT_REGEXP_2 = /^\$?\d+,(\d{3})*(\.\d*)$/; //Numbers like: 1,123.56
    var FLOAT_REGEXP_3 = /^\$?\d+(\.\d*)?$/; //Numbers like: 1123.56
    var FLOAT_REGEXP_4 = /^\$?\d+(\,\d*)?$/; //Numbers like: 1123,56

    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (FLOAT_REGEXP_1.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace('.', '').replace(',', '.'));
                } else if (FLOAT_REGEXP_2.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue.replace(',', ''));
                } else if (FLOAT_REGEXP_3.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue);
                } else if (FLOAT_REGEXP_4.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue.replace(',', '.'));
                }else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });

            ctrl.$formatters.unshift(
               function (modelValue) {
                   return $filter('number')(parseFloat(modelValue) , 2);
               }
           );
        }
    };
})*/



.directive('validFloatNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
    	  var locale = attrs.locale;
    	  var decimals = attrs.decimals;
	      if(!ngModelCtrl) {
	        return; 
	      }

	      ngModelCtrl.$parsers.push(function(val) {

	        if (angular.isUndefined(val)) {
	            var val = '';
	        }

	        var clean = val.replace( /[^0-9.]+/g, '');
	        var formatNumber = true;

	        if(!isNaN(clean)){
	        	var first = clean.indexOf('.');
	        	var last = clean.lastIndexOf('.');
	        	if(first !== -1 && first === last && clean.length === last +1){
					formatNumber = false;
	        	}
	        }else{
	        	clean = val.replace( /[^0-9]+/g, '');
	        }
	        
	        clean = Number(clean).toFixed(decimals);
			clean = Number(clean).toLocaleString(locale);

			if(clean === "0"){
				clean ="";
			}

			if(!formatNumber){
				clean = clean + '.';
	        }

	        if (val !== clean) {
	          ngModelCtrl.$setViewValue(clean);
	          ngModelCtrl.$render();
	        }

	        return clean;
	      });

	      element.bind('keypress', function(event) {
	        if(event.keyCode === 32) {
	          event.preventDefault();
	        }
	      });
    }
  };
});