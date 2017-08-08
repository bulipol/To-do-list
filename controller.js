angular.module('todo')
    .controller('TodoCtrl', function TodoCtrl($scope, $filter, store) {
        'use strict';

        var todos = $scope.todos = store.todos;
        $scope.newTodo = '';
        $scope.editedTodo = null;
        $scope.statusFilter = {};
        $scope.activeMenu = 1;

        $scope.$watch('todos', function (model) {
            $scope.remainingCount = $filter('filter')(todos, {completed: false}).length;
            $scope.completedCount = todos.length - $scope.remainingCount;
            store.save();
        }, true);


        $scope.addTodo = function () {
            var newTodo = {
                title: $scope.newTodo.trim(),
                completed: false
            };

            if (!newTodo.title) {
                return;
            }

            store.insert(newTodo);
            $scope.newTodo = '';
        };

        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            $scope.originalTodo = angular.extend({}, todo);
        };

        $scope.saveEdits = function (todo) {

            todo.title = todo.title.trim();

            if (todo.title !== $scope.originalTodo.title) {
                store[todo.title ? 'save' : 'delete'](todo);
            }
            $scope.editedTodo = null;
        };

        $scope.removeTodo = function (todo) {
            store.delete(todo);
        };

        $scope.clearCompletedTodos = function () {
            store.clearCompleted();
        };

        $scope.markAll = function (completed) {
            todos.forEach(function (todo) {
                if (todo.completed !== completed) {
                    todo.completed = completed;
                }
            });
        };

        $scope.filter = function (completed, active) {
            $scope.statusFilter.completed = completed;
            $scope.activeMenu = active;
        };
    });