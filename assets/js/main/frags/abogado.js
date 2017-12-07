var app = angular.module('myapp');

app.controller('abogadoCtrl', function($scope, $mdDialog, mdDialog, $state, $stateParams, Abogados) {
    var id = $stateParams.id;
    console.log(id);

    Abogados.one(id).then(res => {
        $scope.abogado = res.data;
        $scope.$digest();
        console.log(res.data);
    })
});
