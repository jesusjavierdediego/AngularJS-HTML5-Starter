//////////////////////////////////////////////////
// The main module configuration section shows  //
// how to define when (redirects) and otherwise //
// (invalid urls) to arrangesite navigation     //
// using ui-router.                             //
//////////////////////////////////////////////////

'use strict';

angular.module('App')
    .config(
    ['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

                ///////////////////////////////
                // 1-Redirects and Otherwise //
                ///////////////////////////////

                // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
                $urlRouterProvider

                .otherwise('/multiform');

                // We must configure states using $stateProvider.
                $stateProvider

                
                //////////////////////
                // State: Multiform //
                //////////////////////

                .state('multiform', {
                    abstract: true,
                    url: '/multiform',
                    templateUrl: 'views/multiform/multiform.html',
                    controller: 'SideMenuCtrl'
                })

                .state('multiform.list', {
                    url: '',
                    templateUrl: 'views/multiform/partials/initial.html'
                })

                .state('multiform.detail', {
                    url: '/{multiformId:[0-9a-zA-Z]{1,4}}',
                    views: {
                        '': {
                            templateUrl: function (stateParams){
                                return 'views/multiform/partials/' + stateParams.multiformId + '.html';
                            },
                            controller: 'MultiformController'
                        }
                    }
                })

                
            }]);
