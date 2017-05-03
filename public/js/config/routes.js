/*
Create Angular config in app.config module
*/
export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
    'use strict'
    // Define prefix
    $locationProvider.hashPrefix('!');
    // For each url not found redirection to '/'
    $urlRouterProvider.otherwise('/posts/');
    /*
      Define a state with name 'app' this state is abstract and url is empty (root of application)
      template is ui-view it's used to display nested views
    */
    $stateProvider.state('app', {
            url: '',
            abstract: true,
            template: '<navbar /><div class="container"><ui-view></ui-view></div>'
        })
        .state('callback', {
            url: '/auth/callback/:token',
            template: '',
            controller: ['UsersService', '$stateParams', '$state', function(UsersService, $stateParams, $state) {
                if ($stateParams.token) {
                    UsersService.setToken($stateParams.token).then((user) => {
                        let toastContent = `Welcome ${user.name} !`
                        Materialize.toast(toastContent, 4000, 'toast-success')
                        $state.go('blog.list')
                    })
                } else {
                    $state.go('blog.list')
                }
            }]
        })
        .state('algo1', {
            url: '/algo1',
            controller : ['$scope', function($scope){
               let friend = (friends) => {
                    let trueFriends = []
                    for (let friend of friends)
                        if (friend.length === 4)
                            trueFriends.push(friend);
                        console.log(trueFriends)
                    return(trueFriends);
                }
                $scope.myfriends = friend(["Ryan","Kieran", "Mark"]);
            }],
            template: "{{myfriends}}"
        })
        .state('algo2', {
            url: '/algo2',
            controller: ['$scope', function($scope){
                function foldTo(distance) {
                    let fold = 0;
                    if(distance > 0){
                        while (Math.pow(2, fold) * 0.0001 < distance)
                            fold++;
                            return fold;
                    }
                    return null;
                }
                $scope.dist= foldTo(14928418679754190000);
            }],
            template: "{{dist}}"
        })
}]
