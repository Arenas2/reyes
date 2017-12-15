var app = angular.module('myapp');

app.controller('homeCtrl', function($scope, $mdDialog, mdDialog, $state, $stateParams, Topicos, $timeout) {

	$scope.retroceder = () => {

		console.log('mira')

	}


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
