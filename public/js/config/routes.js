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
        .state('algo3', {
            url: '/algo3',
            controller: ['$scope', function($scope){
                function battle(player1, player2) {
                    let game1 = [];
                    let game2 = [];
                    let battle = 0;
  
                    for ( battle = 0; battle < player1.length && battle < player2.length; battle ++){
                        let victory = fight(player1[battle], player2[battle]);
                        if (victory === "both alive"){
                            game1.push(player1[battle]);
                            game2.push(player2[battle]);
                        }else if (victory === "card1")
                            game1.push(player1[battle]);
                        else if (victory === "card2")
                            game2.push(player2[battle]);
                    }
                    if (battle < player1.length)
                        for(battle; battle < player1.length; battle++)
                            game1.push(player1[battle]);
                    else if (battle < player2.length)
                        for(battle; battle < player2.length; battle++)
                            game2.push(player2[battle]);
                    return {"player1": game1, "player2": game2};
                }

                function fight (card1, card2){
                    card1[1] -= card2[0];
                    card2[1] -= card1[0];
  
                    if (card1[1] > 0 && card2[1] > 0){
                        card1[1] += card2[0];
                        card2[1] += card1[0];
                        return("both alive");
                    }else if (card1[1] > 0){
                        card1[1] += card2[0];
                        card2[1] += card1[0];
                        return ("card1")
                    }else if (card2[1] > 0){
                        card2[1] += card1[0];
                        card1[1] += card2[0];
                        return "card2";
                    }
                    card2[1] += card1[0];
                    card1[1] += card2[0];
                }
                $scope.myGame = battle([ [ 1, 3 ], [ 3, 4 ] ], [ [ 2, 8 ], [5, 2] ]);
            }],
            template: "{{myGame}}"
        })
}]
