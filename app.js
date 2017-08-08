angular.module('todo', ['ngRoute', 'ngResource', 'ui.sortable'])
    .config(function ($routeProvider) {
        'use strict';

        var routeConfig = {
            controller: 'TodoCtrl',
            templateUrl: 'index.html',
            resolve: {
                store: function (localStorage) {
                    localStorage.todos = JSON.parse(JSON.stringify(localStorage._getFromLocalStorage()));
                    return localStorage;
                }
            }
        };

        $routeProvider
            .when('/', routeConfig)
            .otherwise({
                redirectTo: '/'
            });
    });