'use strict';

angular.module('App.Controllers', []);
angular.module('App.Directives', []);

angular.module('App', ['COMMONAPI', 'App.Controllers', 'App.Directives'])

.run(['$rootScope', '$location', '$log',
            function ($rootScope, $location, $log) {
        
            }]);
