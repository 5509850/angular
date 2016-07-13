var myApp = angular.module('SimpleModule', []);
myApp.controller('MyController', ['$scope', function($scope) {
    $scope.title = 'mudule calculator';
    $scope.result = 0;

    $scope.add = function (a, b) {
	    if (a == null || b == null)
		    $scope.result = 'error'
	    else
		    $scope.result = a + b;
    };

    $scope.subtract = function (a, b) {
        if (a == null || b == null)
            $scope.result = 'error'
        else
            $scope.result = a - b;
    };

    $scope.multiple = function (a, b) {
	    if (a == null || b == null)
		    $scope.result = 'error'
	    else
		    $scope.result = a * b;
    };

    $scope.devide = function (a, b) {
	    if (a == null || b == null)
		    $scope.result = 'error'
	    else
		    $scope.result = a / b;
    };
    }]);
