'use strict';

/*
 * Directives for multiform screen.
 *
 */
angular.module('App.Directives')

        .directive('validFloatNumber', function () {
            var FLOAT_REGEXP_1 = /^\$?\d+(\.\d{0,2})?$/; //Numbers like: 1123.56 maybe no decimals
            var FLOAT_REGEXP_2 = /^\$?\d+(\,\d{0,2})?$/; //Numbers like: 1123,56 maybe no decimals
            return {
                restrict: 'EA',
                require: 'ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var locale = attrs.locale;
                    var decimals = attrs.decimals;
                    if (!ngModelCtrl) {
                        return;
                    }
                    ngModelCtrl.$parsers.push(function (viewValue) {
                        if (angular.isUndefined(viewValue)) {
                            var viewValue = '';
                        }
                        var transformedViewValue = viewValue.replace(/[^0-9.,]/g, '');

                        //Handle onblur event
                        element.bind('blur', function () {
                            replaceNotvalidFinalChars(transformedViewValue, function (value) {
                                ngModelCtrl.$setViewValue(value);
                                ngModelCtrl.$render();
                            });
                            ngModelCtrl.$setValidity('float', true);
                        });

                        //Parse entered value while focused
                        if (
                                FLOAT_REGEXP_1.test(transformedViewValue) ||
                                FLOAT_REGEXP_2.test(transformedViewValue)
                                ) {
                            //console.log("valid");
                            ngModelCtrl.$setValidity('float', true);
                        } else {
                            //console.log("not valid");
                            ngModelCtrl.$setValidity('float', false);
                            transformedViewValue = transformedViewValue.slice(0, -1);
                        }

                        if (transformedViewValue != viewValue) {
                            ngModelCtrl.$setViewValue(transformedViewValue);
                            ngModelCtrl.$render();
                        }
                        return transformedViewValue;
                    });
                }
            };
        });
        

function replaceNotvalidFinalChars(transformedViewValue, callback) {
    if (transformedViewValue.indexOf(',') !== -1) {
        transformedViewValue = transformedViewValue.replace(',', '.');
    }
    if (transformedViewValue.indexOf('.') !== -1) {
        if (transformedViewValue.lastIndexOf("0") == transformedViewValue.length - 1) {
            transformedViewValue = transformedViewValue.slice(0, -1);
            if (transformedViewValue.lastIndexOf("0") == transformedViewValue.length - 1) {
                transformedViewValue = transformedViewValue.slice(0, -1);
            }
        }
        if (transformedViewValue.lastIndexOf(".") == transformedViewValue.length - 1) {
            transformedViewValue = transformedViewValue.slice(0, -1);
        }
    }
    callback(transformedViewValue);
}
;