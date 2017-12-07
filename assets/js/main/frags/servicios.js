var app = angular.module('myapp');

app.controller('serviciosCtrl', function($scope, $mdDialog, mdDialog, $state, $stateParams, Servicios) {

    Servicios.obtener().then(res => {
        $scope.servicios = res.data;
        $scope.$digest();
        console.log(res.data);
    })


    $scope.irServicio = function(servicio){

        let titulo  =  _.snakeCase(servicio.nombre);

        $state.go('servicio', { id: servicio.id, titulo: titulo})

    }

});
