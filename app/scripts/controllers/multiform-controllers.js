'use strict';

/*
 * Controllers for multiform screen.
 *
 */
angular.module('App.Controllers')


.controller('MultiformController', ['$log', '$scope', '$state', '$stateParams', 'utils', 'RESTFactory',
        function ($log, $scope, $state, $stateParams, utils, RESTFactory) {

    }])


.controller('SideMenuCtrl', ["$log", "$rootScope", "$scope", "$stateParams", "$location", "RESTFactory",
    function ($log, $rootScope, $scope, $stateParams, $location, RESTFactory) {
  $scope.oneAtATime = true;

  $scope.groups = RESTFactory.readList('sideMenu');
  
  $scope.setMenuItem = function(itemId){
      $rootScope.menuItem = itemId;
  };
  
  //$log.debug("MultiformController/$location.url(): " + $location.path().split("/")[2]||"Unknown");
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
}])

.controller('PerformManualEntryCtrl', ["$log", "$scope",  
    function ($log, $scope) {
        $log.debug("Loaded PerformManualEntryCtrl");
        
        $('.selectpicker').selectpicker({
            style: 'btn-info',
            size: 4
        });
}])

.controller('DatepickerDemoCtrl', ["$scope", "$log",
    function ($scope, $log) {
        $log.debug("Loaded DatepickerDemoCtrl");
        
        $scope.today = function() {
          $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
          $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
          $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
        };

        $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
}]);

