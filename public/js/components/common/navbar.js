import moment from "moment"
let navbar = {
    templateUrl: 'js/components/common/navbar.html',
    controller: ['UsersService', '$state', '$interval', function(UsersService, $state, $interval) {
        'use strict'

        this.now = moment().toString();
        angular.extend(this, {
            $onInit() {
                UsersService.getCurrent().then((user) => {
                    this.user = user
                }).catch((err) => {

                })
            },
            disconnect() {
                UsersService.disconnect().then(() => {
                    Materialize.toast('Disconnected', 4000, 'toast-warning')
                    this.user = null
                    $state.reload()
                })
            }
            
        })
        $interval(() => {this.now = moment().toString()}, 1000)
       
    }]
}

export default navbar
