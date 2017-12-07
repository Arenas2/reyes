app.controller('mainCtrl', function ($scope, $rootScope, $http, mdDialog, AuthService, $localStorage, $timeout) {

    $localStorage.usuario = false;


    $scope.registro = function(usuario){
        AuthService.registro(usuario);
    }

    $scope.login = function(x){
        AuthService.login(x);
    }

	_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });

    $scope.iniciosesion = function (ev) {
        mdDialog.mostrardialog('login', 'mainCtrl', $scope.customFullscreen);
    };

    $scope.registrarse = function() {
        mdDialog.mostrardialog('registro', 'mainCtrl', $scope.customFullscreen);
    }

    $scope.botones = [{
           title: 'Home',
           icon: 'whatshot',
           color: 'red',
           sref: 'home'
    }];

    var ary = ['img/background.jpeg', 'img/background1.jpg', 'img/background2.jpg'];

    background(ary[0])
    function background(url){

        $scope.background =  url;

    }

    console.log(ary.length)

    var timer;

    var indice = 1;
    var tiempo = 5000;

    var sliderFunc = function() {

        timer = $timeout(function() {

            background( ary[   indice   ] )

            indice >= (ary.length - 1) ? indice = 0 : indice++;

            timer = $timeout(sliderFunc, tiempo);


        }, tiempo);

    };

    sliderFunc();



});
