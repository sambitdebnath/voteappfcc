(function(){
    var appHome=angular.module('home',[]);
    var apiUrl="https://voteappfcc-sambitdebnath.c9users.io";
    appHome.controller('homeCtrl',function($scope,$http){
        $http.get(apiUrl+'/api/:id').then(function(response){
            $scope.username=response.data.displayname;
            //console.log("json"+JSON.stringify(response));
        });
    });
    appHome.controller('pollPostCtrl',function($scope,$http){
        $scope.showPoll=false;
        $scope.choices=[{id:'choice1'},{id:'choice2'}];
        $scope.addChoice=function(){
            var nch=$scope.choices.length+1
            $scope.choices.push({id:'choice'+(nch)})
        };
        $scope.deleteChoice=function(){
            $scope.choices.splice($scope.choices.length-1);          
        };
        $scope.postPoll=function(){
            var data={},n=0;
            while(n<$scope.choices.length)
                data[$scope.choices[n].id]=$scope.choices[n++].name;
            data.polltopic=$scope.polltopic;
            $http.post(apiUrl+"/home",data).then(function(resp){
                $http.get(apiUrl+"/api/polls/"+resp.data.pid).then(function(res){
                    console.log(res.data.polltopic);
                    $scope.showPoll=true;
                    $scope.ptShow=res.data.polltopic;
                    $scope.chShow=res.data.pollchoices;
                });
            });
        }
    });
})();