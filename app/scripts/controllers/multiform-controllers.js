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

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
}])

.controller('PerformManualEntryCtrl', ["$log", "$scope", "RESTFactory",
        function($log, $scope, RESTFactory) {

            //Initialize status of controls
            $scope.debitAgentStatus = true;

            //Data sources
            $scope.debitLedgerTypes = RESTFactory.readList('debitLedgerTypes');
            $scope.creditLedgerTypes = RESTFactory.readList('creditLedgerTypes');
            $scope.debitAgents = RESTFactory.readList('debitAgents');
            $scope.creditAgents = RESTFactory.readList('creditAgents');
            $scope.txTypes = RESTFactory.readList('txTypes');


            //capture events from UI controls and implement behavior
            $scope.changeDebitAgentStatus = function(){
                $log.debug("change in control.");
                if($scope.so1Object.debitLedgerType){
                    $scope.debitAgentStatus = false;
                }else{
                    $scope.debitAgentStatus = true;
                }

            };

            //Data model
            $scope.so1Object = {};
            $scope.so1Object.debitLedgerType = {};
            $scope.so1Object.debitLedgerType.id;
            $scope.so1Object.debitLedgerType.name;
            $scope.so1Object.creditLedgerType = {};
            $scope.so1Object.creditLedgerType.id;
            $scope.so1Object.creditLedgerType.name;
            $scope.so1Object.debitAgent = {};
            $scope.so1Object.debitAgent.id;
            $scope.so1Object.debitAgent.name;
            $scope.so1Object.creditAgent = {};
            $scope.so1Object.creditAgent.id;
            $scope.so1Object.creditAgent.name;
            $scope.so1Object.txType = {};
            $scope.so1Object.txType.id;
            $scope.so1Object.txType.name;
            $scope.so1Object.amount;
            $scope.so1Object.comment;
            $scope.so1Object.relatedMTCN;
            $scope.so1Object.MTCNDate;
            $scope.so1Object.entryDate;
            $scope.so1Object.excludedEntryFromDailyStatement;


            $scope.sendForm = function(){
                $log.debug("Object to send: " + angular.toJson($scope.so1Object, true));
            };
            //Example: You can validate data in controller as well, eg against server
           /* $scope.sendForm = {
                onSubmit: function(event) {
                    $log.debug("Object to send: " + angular.toJson($scope.so1Object, true));
                    if (dataIsntValid) {
                        displayErrors();
                        event.preventDefault();
                    }else {
                        submitData();
                    }
                }
            };*/

            $scope.resetForm = function(){
                $scope.so1Object = {};


                $log.debug("Form has been reset.");
            };

/*            myApp.factory('myRestService', ['Restangular', function(Restangular) {
                return {
                    myFunction: function(varA, varB, varC) {
                        var path = "rest/primaryPath/" + varA + "/" + varB + "/" + varC;
                        var restObject = Restangular.all(path);
                        var thePromise = restObject.getList();

                        return thePromise;
                    }
                };
            }]);*/

}]);

