var app = angular.module('myapp');

app.controller('topicosCtrl', function($rootScope, $window,  $scope, $mdDialog, mdDialog, $state, $stateParams, Topicos, Servicios, $analytics) {

    $rootScope.seccion = 'Topicos'
    self = this;

    Servicios.obtener().then(res => {
        $scope.servicios = res.data;
        $scope.$digest()
    })

    $scope.peticion = {
        offset: 0,
        limit: 5
    }

    if($window.location.search.length > 0){

        let parametro = _.chain($window.location.search)
            .replace('?', '', '/') // a=b454&c=dhjjh&f=g6hksdfjlksd
            .split('&') // ["a=b454","c=dhjjh","f=g6hksdfjlksd"]
            .map(_.ary(_.partial(_.split, _, '='), 1)) // [["a","b454"],["c","dhjjh"],["f","g6hksdfjlksd"]]
            .fromPairs() // {"a":"b454","c":"dhjjh","f":"g6hksdfjlksd"}
            .value()

            console.log(parametro.categoria)

            $scope.peticion = {
                offset: 0,
                limit: 5,
                where: {
                    IdServicio: Number(parametro.categoria)
                }
            }

    }else{
        filtro()
    }


    self.BuscarNombreChange = function(text) {}
    self.nombreSeleccionadoChange = function(item) {

        item
            ? (filtro({
                offset: 0,
                limit: 5,
                where: {
                    nombre: item.nombre
                }
            }))
            : (filtro())

    }

    self.BuscarServicioChange = function(text) {}
    self.ServicioSeleccionadoChange = function(item) {

        console.log(item)

        item
            ? (filtro({
                offset: 0,
                limit: 5,
                where: {
                    IdServicio: item.id
                }
            }))
            : (filtro())

    }

    $scope.avanzar = function(topico){

        // $analytics.eventTrack('interes', {  category: 'interes', label: topico.nombre });

        $rootScope.prospecto === undefined ? (
            $state.go('home.prospecto'),
            $rootScope.topico = topico

        ) : (
            $state.go('home.respuesta'),
            $rootScope.topico = topico
        )

    }

    function filtro(peticion) {

        let x = peticion
            ? (peticion)
            : ($scope.peticion)

        Topicos.filtro(x).then(res => {
            $scope.topicos = res.data;
            console.log($scope.topicos)
            $scope.$digest();

        })
    }

    $scope.paging = {
        total: 5,
        current: 0,
        onPageChanged: loadPages
    };

    $scope.currentPage = 0;

    function loadPages() {

        $scope.peticion.offset = $scope.paging.current;

        console.log('Current page is : ' + $scope.paging.current);

        filtro()

        $scope.currentPage = $scope.paging.current;
    }

});
