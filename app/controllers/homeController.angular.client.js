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
        $scope.vote={};
        $scope.vote.vote="blye";
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
                    $scope._pid=resp.data.pid;
                    $scope.showPoll=true;
                    $scope.ptShow=res.data[0].polltopic;
                    $scope.chShow=res.data[0].pollchoices;
                    $scope.voted=res.data[1].voted;
                });
            });
        };
        $scope.postVote=function(pollid){
            var data={};
            console.log($scope.vote.vote);
            data.vchoice=$scope.vote.vote;
            $http.post(apiUrl+"/api/polls/"+pollid,data).then(function(response){
               console.log(JSON.stringify(response.data)); 
            });
        };
    });
})();