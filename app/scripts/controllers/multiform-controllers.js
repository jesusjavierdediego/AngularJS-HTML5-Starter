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
                $scope.oneAtATime = false;
                $scope.toggle = false;
                $scope.toggleSideMenuButtonValue = "<";
                $scope.toggleSideMenu = function () {
                    $scope.toggleAction = !$scope.toggleAction;
                    $scope.toggle = !$scope.toggle;
                    if ($scope.toggleSideMenuButtonValue == "<")
                        $scope.toggleSideMenuButtonValue = ">";
                    else
                        $scope.toggleSideMenuButtonValue = "<";
                };

                $scope.groups = RESTFactory.readList('sideMenu');

                $scope.setMenuItem = function (itemId) {
                    $rootScope.menuItem = itemId;
                };

                $scope.status = {
                    isFirstOpen: true,
                    isFirstDisabled: false
                };
            }])

        .controller('PerformManualEntryCtrl', ["$log", "$scope", "$q", "RESTFactory", "$timeout",
            function ($log, $scope, $q, RESTFactory, $timeout) {
                $scope.resolved = false;
                $scope.loading = true;

                //Initialize status of controls
                $scope.debitAgentStatus = true;

                //Data sources
                $scope.debitLedgerTypes = RESTFactory.readList('debitLedgerTypes');
                $scope.creditLedgerTypes = RESTFactory.readList('creditLedgerTypes');
                $scope.debitAgents = RESTFactory.readList('debitAgents');
                $scope.creditAgents = RESTFactory.readList('creditAgents');
                $scope.txTypes = RESTFactory.readList('txTypes');

                var promises = [];
                var paths = [];
                paths.push('debitLedgerTypes');
                paths.push('creditLedgerTypes');
                paths.push('debitAgents');
                paths.push('creditAgents');
                paths.push('txTypes');

                angular.forEach(paths, function (path) {
                    promises.push(RESTFactory.readBatch(path));
                });

                $q.all(promises).then(function () {
                    $scope.loading = false;
                    $scope.resolved = true;
                });

                //capture events from UI controls and implement behavior
                $scope.changeDebitAgentStatus = function () {
                    $log.debug("change in control: " + $scope.so1Object.debitLedgerType);
                    if ($scope.so1Object.debitLedgerType) {
                        $scope.debitAgentStatus = false;
                    } else {
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


                //You can validate data in controller as well, eg against server
                /*$scope.sendForm = function(so1Object) {
                 $scope.PerformManualEntryForm.submitted = true;
                 if($scope.PerformManualEntryForm.$valid) {
                 $log.debug("Object to send: " + angular.toJson(so1Object, true));
                 } else {
                 $log.debug('Errors in form data');
                 }
                 };*/

                $scope.sendForm = function (so1Object) {
                    $scope.PerformManualEntryForm.submitted = true;
                    $log.debug("Object to send: " + angular.toJson(so1Object, true));
                };

                $scope.resetForm = function () {
                    $scope.so1Object = {};
                    $log.debug("Form has been reset.");
                };

            }])

        .controller('TypeaheadDemoCtrl', ['$scope', '$templateCache', '$http',
            function ($scope, $templateCache, $http) {

                $scope.selectedState = '';
                $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

                $scope.selectedIcon = '';

                $scope.selectedAddress = '';
                $scope.getAddress = function (viewValue) {
                    var params = {address: viewValue, sensor: false};
                    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params})
                            .then(function (res) {
                                return res.data.results;
                            });
                };

                $scope.selectedItem = '';
                $scope.items = ['FIRST', 'SECOND'];

            }]);


