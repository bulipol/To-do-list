angular.module('todo')
    .factory('localStorage', function () {
        'use strict';

        var STORAGE_ID = 'todos';

        var store = {
            todos: [],

            _getFromLocalStorage: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            _saveToLocalStorage: function (todos) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
            },

            clearCompleted: function () {

                var incompleteTodos = store.todos.filter(function (todo) {
                    return !todo.completed;
                });

                angular.copy(incompleteTodos, store.todos);
            },

            delete: function (todo) {

                store.todos.splice(store.todos.indexOf(todo), 1);

            },

            insert: function (todo) {

                store.todos.push(todo);
            },

            save: function () {

                store._saveToLocalStorage(store.todos);
            }
        };

        return store;
    });