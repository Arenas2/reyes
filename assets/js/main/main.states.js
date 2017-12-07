app.run([
    '$rootScope',
    '$state',
    '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);

app.config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {

        function template(url, template, controller, oz, params) {
    		let obj = {
    			url: url,
    			params: params,
    			views: {
    				'main': {
    					templateUrl: template,
    					controller: controller + ' as ctrl'
    				}
    			},
    			resolve: {
    				loadMyCtrl: [
    					'$ocLazyLoad',
    					function($ocLazyLoad) {
    						return $ocLazyLoad.load([oz]);
    					}
    				]
    			}
    		}
    		return obj
    	}

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
                url: '/',
                redirectTo: 'home.topico',
                views: {
                    'main': {
                        templateUrl: '/main/home',
                        controller: 'homeCtrl as ctrl'
                    }
                },
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['mainhome']);
                        }
                    ]
                }
            })
        .state('home.topico', template('topico', '/main/homechilds/topico', 'topicosCtrl', 'maintopico', { 'id' : null}))
        .state('home.prospecto', template('prospecto', '/main/homechilds/prospecto', 'prospectoCtrl', 'mainprospecto', { 'topico' : null}))
        .state('home.respuesta', template('respuesta', '/main/homechilds/respuesta', 'respuestaCtrl', 'mainrespuesta', { 'topico' : null}))
        .state('nosotros', template('/nosotros', '/main/nosotros', 'nosotrosCtrl', 'mainnosotros'))
        .state('abogado', template('/abogado', '/main/abogado', 'abogadoCtrl', 'mainabogado', { 'id' : null}))
        .state('servicios', template('/servicios', '/main/servicios', 'serviciosCtrl', 'mainservicios'))
        .state('servicio', template('/servicio/:id/:titulo', '/main/servicio', 'servicioCtrl', 'mainservicio', { 'id' : null}))
    }
]);
