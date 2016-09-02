(function () {

    'use strict';

    /**
     * angular
     * Description: Angular!
     */
    var app = angular

    /**
     * app
     * Description: Устанавливаем первоначальное состояние приложения
     */
    .module('app', []);

 /**
   * AppController
   * Description: Sets up a controller
   */
  app.controller('AppController', ['$scope', function ($scope) {      
      $scope.changeUsername = function (username) {
          $scope.username = username;      

      };
      //-------------------------
    $scope.usersArray = [
  ['BB', 'King'],
  ['Ray', 'Charles'],
  ['Muddy', 'Waters'],
  ['Lightnin', 'Hopkins'],
  ['Howlin', 'Wolf1']
      ];
      //------------------------------------
    $scope.usersObject = [
          {
              firstname: 'BB',
              lastname: 'King'
          },
          {
              firstname: 'Ray',
              lastname: 'Charles'
          },
          {
              firstname: 'Muddy',
              lastname: 'Waters'
          },
          {
              firstname: 'Lightnin',
              lastname: 'Hopkins'
          },
          {
              firstname: 'Howlin',
              lastname: 'Wolf2'
          }
                             ];

      //-------------------------    

    var dog = {}; //object
    dog.name = "Benji"; //property    
    dog.getName = function () //method    
    {        
        //return dog.name;
        return "Volvo" + 16;
    }

    $scope.randomUserModel = 'myText';
    $scope.randomUserModelAlert = function () {           
        alert($scope.randomUserModel);
        
    };
      //---------------------------
 
        $scope.textClass = '';
        $scope.changeTextClass = function (name) {
            //console.log("test", 1, {}, [1,2,3]);
            console.dir({ one: 1, two: { three: 3 } });
            console.log({ one: 1, two: { three: 3 } });
            //console.log(window.name === window['name']);
        $scope.textClass = name;
        }

        $scope.textmy = "OK";

        var setup = function () {
            alert(1);
            return function () {              
                alert(2);
            };
        };

        var scareMe = function () {
            alert("Boo!");
            scareMe = function () {
                alert("Double boo!");
            };
        };     
      
        var alien = {
            sayHi: function (who) {
                return "Hello" + (who ? ", " + who : "") + "!";
            }
        };

        var fn = (function () {
            var numberOfCalls = 0;
            return  function () {
                return ++numberOfCalls;
            }
        })();

        var f = function ()
        {
            var n = 10;
            var x = 5;

            
                var sd = Boolean(1); //            true
                var fd = Boolean(0);  //      false    
                var fdd = Boolean(-1);  //true              
                        
            while (n--)
            {
                var sds = Boolean(x--)                 
            }
            return x;
        }

        function arr()
        {
            var names = ['HTML', 'CSS', 'JavaScript'];

            var nameLengths = names.map(function (name) {
                return name.length;
            });

            return nameLengths;
        }

        $scope.myClick = function () {
            $scope.textmy = "press";
            //var my = setup(); // выведет диалог с текстом “1”
            //my(); // выведет диалог с текстом “2”

            //scareMe(); // Boo!
            //scareMe(); // Double boo!

            //alert(alien.sayHi('world')); // “Hello, world!”
            //alert(alien.sayHi.apply(alien, ["humans"])); // “Hello, humans!”
            //alert(alien.sayHi.call(alien, "man"));

            //alert(fn());

            //   alert(arr());
            var a = '5' + - '2';
            alert(a);
        }
      //---------------------------------------------
  }]);   
    //end controller AppController 
})();