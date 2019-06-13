var myApp = angular.module("myApp", [])
    .controller("AppCtrl", function ($scope, $http) {
        var refresh = function () {

            $http({
                method: 'GET',
                url: '/employeeslist'
            }).then(function (response) {
                $scope.employeeslist = response.data[0];
            }, function (error) {

            });

        }

        refresh();

        $scope.addemployee = function () {
            $http.post('/employeeslist', $scope.employee).then(function (response) {
                refresh();
            }, function (error) {

            });

        }

        $scope.remove = function(id){
            console.log(id);
            $http.delete('/employeeslist/'+id).then(function(response){
                refresh();
            });
        }

        $scope.edit = function(id){
            $http.get('/employeeslist/'+id).then(function(response){
                var emp = response.data[0];
                $scope.employee=emp[0];
            });
        }

        $scope.update = function(){
            $http.put('/employeeslist/'+$scope.employee.Employee_ID, $scope.employee).then(function(response){
                refresh();
            });
        }

        $scope.deselect = function(){
            $scope.employee = { name: "", email:"", number:"", _id:"" }
        }
    });

    