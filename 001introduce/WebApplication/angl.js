var app = angular.module('app', []);
app.controller("appCTRL", myController);
app.controller("app2CTRL", my2Controller);
app.controller("MainCtrl", MainCtrl);
app.controller('composeEmail', composeEmail);

function myController($scope) {
    $scope.angulartext = 'Angular begin HERE';
    $scope.items = [{
        name: 'Набор ныряльщика',
        id: 7297510
    }, {
        name: 'Шноркель',
        id: 0278916
    }, {
        name: 'Гидрокостюм',
        id: 2389017
    }, {
        name: 'Полотенце',
        id: 1000983
    }];
}
///-****************************************this
function my2Controller() {
    this.angulartext = 'Angular begin HERE';
    this.items = [{
        name: 'Набор ныряльщика2',
        id: 7297510
    }, {
        name: 'Шноркель2',
        id: 0278916
    }, {
        name: 'Гидрокостюм2',
        id: 2389017
    }, {
        name: 'Полотенце2',
        id: 1000983
    }];
}
//----------------------------------------- remove from array by click
function MainCtrl() {
    this.items = [{
        name: 'Набор ныряльщика3',
        id: 7297510
    }, {
        name: 'Шноркель3',
        id: 0278916
    }, {
        name: 'Гидрокостюм3',
        id: 2389017
    }, {
        name: 'Полотенце3',
        id: 1000983
    }];

    var viewmodel = this;
    this.show = false;
    var deleted = 0
    viewmodel.removeFromStock = function (item, index) {
        viewmodel.items.splice(index, 1);
        this.show = true;
        deleted++;
        this.deleted = deleted + ' шт. удалено';
    };    
    this.clickable = 'элементы кликабельны для удаления'
    
}
//-------------------------------------------------------------------------email
function composeEmail() {
    return {
        restrict: 'EA',
        replace: true,
        scope: true,
        controllerAs: 'compose',
        controller: function () {

        },
        link: function ($scope, $element, $attrs) {

        },
        template: [
          '<div class="compose-email">',
            '<input type="text" placeholder="To..." ng-model="compose.to">',
            '<input type="text" placeholder="Subject..." ng-model="compose.subject">',
            '<textarea placeholder="Message..." ng-model="compose.message"></textarea>',
          '</div>'
        ].join('')
    };
}