'use strict';

////////////////////////////////////////////////////////////////////////////
// COMMON API - 0.1
// INTEGRATED REST CLIENT MODULE (AppREST)
////////////////////////////////////////////////////////////////////////////
// The Integrated REST module includes communication.
// It is based on Restangular.
// Params configuration are set in app-configuration file as constants.
//
// SERVICES CLIENT CONFIGURATION
// The common API includes configuration for one set of REST resources client (1 base URL).
// This is the most common approach in the most of projects.
// In order to build several sets of REST resources (several base URLs) you should
// create scoped configurations. Please, review the below snnipet:
/*
 var MyRestangular = Restangular.withConfig(function(RestangularConfigurer) {
 RestangularConfigurer.setDefaultHeaders({'X-Auth': 'My Name'})
 });

 MyRestangular.one('place', 12).get();
 */
// The MyRestangular object has scoped properties of the Restangular on with a different
// configuration.
////////////////////////////////////////////////////////////////////////////

angular.module('AppREST', ['restangular', 'AppCache', 'AppConfiguration'])
    .run(['Restangular', 'CacheFactory', 'REST_CONFIG', 'CACHE_CONFIG',
        function (Restangular, CacheFactory, REST_CONFIG, CACHE_CONFIG) {

            console.log('AppREST run');

            /*
            The cache for http calls
            */
            CacheFactory.setDefaultHttpCacheStorage(CACHE_CONFIG.HttpCache_duration, CACHE_CONFIG.HttpCache_capacity);

            Restangular.setBaseUrl(REST_CONFIG.BaseUrl);
            Restangular.setExtraFields(REST_CONFIG.ExtraFields);
            Restangular.setParentless(REST_CONFIG.Parentless);
            Restangular.setDefaultHttpFields(REST_CONFIG.DefaultHttpFields);
            Restangular.addElementTransformer(REST_CONFIG.ElementTransformer);
            Restangular.setOnElemRestangularized(REST_CONFIG.OnElemRestangularized);
            Restangular.setResponseInterceptor(
                function (response) {
                    for (var operation in REST_CONFIG.NoCacheHttpMethods) {
                        if (operation === true) {
                            CacheFactory.removeDefaultHttpCacheStorage();
                        }
                    }
                    return response;
                }
            );
            Restangular.setRequestInterceptor(REST_CONFIG.RequestInterceptor);
            Restangular.setFullRequestInterceptor(REST_CONFIG.FullRequestInterceptor);
            Restangular.setErrorInterceptor(REST_CONFIG.ErrorInterceptor);
            Restangular.setRestangularFields(REST_CONFIG.RestangularFields);
            Restangular.setMethodOverriders(REST_CONFIG.MethodOverriders);
            Restangular.setDefaultRequestParams(REST_CONFIG.DefaultRequestParams);
            Restangular.setFullResponse(REST_CONFIG.FullResponse);
            Restangular.setDefaultHeaders(REST_CONFIG.DefaultHeaders);
            Restangular.setRequestSuffix(REST_CONFIG.RequestSuffix);
            Restangular.setUseCannonicalId(REST_CONFIG.UseCannonicalId);
            Restangular.setEncodeIds(REST_CONFIG.EncodeIds);
        }])
/*
 * Factory Name: 'RESTConnect'
 * Contains methods for data finding (demo).
 * This module provides basic quick standard access to a REST API.
 * For a more flexible
 *
 * findById: Util for finding an object by its 'id' property among an array
 * newRandomKey: Util for returning a randomKey from a collection that also isn't the current key
 */
.factory('RESTFactory', ['$log', 'Restangular',
    function ($log, Restangular) {

        ////////////////////////////////////////////////////////////////////////////////////
        // ADVICE ABOUT PROMISES
        // All Restangular requests return a Promise. Angular's templates
        // are able to handle Promises and they're able to show the promise
        // result in the HTML. So, if the promise isn't yet solved, it shows
        // nothing and once we get the data from the server, it's shown in the template.
        // If what we want to do is to edit the object you get and then do a put, in
        // that case, we cannot work with the promise, as we need to change values.
        // If that's the case, we need to assign the result of the promise to a $scope variable.
        ////////////////////////////////////////////////////////////////////////////////////

        var factory = {};

        /*
        @function
        @param path String with the item URL
        @description Returns a complete list from a REST resource.
        Use to get data to a scope var. For example:
            $scope.people = rest_getAll('people');
        Then, use the var in templates:
            <li ng-repeat="person in people">{{person.Name}}</li>
        */
        factory.rest_getAll = function (path) {
            return Restangular.all(path).getList().then(function (data) {
                return data[0];
            });
        };

        /*
        @function
        @param path String with the item URL
        @param data Key of the given item
        @description Returns a unique value.
        */
        factory.rest_getItem = function (path, key) {
            console.log("RESTFactory rest_getItem:", path);
            return Restangular.one(path, key).get().then(function (data) {
                console.log("RESTFactory rest_getItem then:", data);
                return data;
            });
        };

        /*
        @function
        @param path String with the item URL
        @param data Array of key with keys of the given items
        @description Returns a list of values from the provided params.
        */
        factory.rest_getItems = function (path, keys) {
            return Restangular.several(path, keys).getList().then(function (data) {
                return data;
            });
        };

        /*
        @function
        @param path String with the item URL
        @param data Item data  to be posted
        @description Returns result code.
        */
        factory.rest_postItem = function (path, newData) {
            this.rest_getAll(path).post(newData);
        };

        /*
        @function
        @param path String with the item URL
        @param data Item data  to be deleted
        @description Returns result code.
        */
        factory.rest_deleteItem = function (path, key) {
            var item = this.rest_getItem(path, key);
            item.remove();
        };

        return factory;
    }]);
