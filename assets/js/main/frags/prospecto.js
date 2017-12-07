var app = angular.module('myapp');

app.controller('prospectoCtrl', function($scope, $rootScope, $mdDialog, mdDialog, $state, alertas, $stateParams, Prospecto, $analytics) {


	console.log($stateParams.topico);

	var topico = $stateParams.topico

	$rootScope.seccion = 'Formulario'

    $scope.nuevoProspecto = function(prospecto){

		$analytics.eventTrack('prospecto', {  category: 'prospecto', label: topico.nombre });

		$state.go('home.respuesta', {topico: $stateParams.topico });

        Prospecto.crearProspecto(prospecto).then(res => {
            alertas.mostrarToastEstandar("Se ha enviado tu solicitud");
			$rootScope.prospecto = res.data;
            $state.go('home.respuesta', {id: $stateParams.topico.id });
        })

    }

});
