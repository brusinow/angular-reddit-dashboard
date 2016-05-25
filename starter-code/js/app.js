var app = angular.module('MyApp', []);

console.log('this file is running.');

app.controller("RedditCtrl", ['$scope', '$http', function($scope, $http){
  
  $scope.searchTerm = '';
  $scope.lastSearch = '';
  $scope.lastIndex = '';
  $scope.results = [];

  if(localStorage.length === 0) {
    $scope.history = [];
  } else {
    $scope.history = JSON.parse(localStorage.getItem('$scope.history'));
  }

  $scope.remove = function(index){
  $scope.history.splice(index, 1);
  localStorage.setItem('$scope.history', JSON.stringify($scope.history));
  }
  



  $scope.clearStorage = function(){
    localStorage.clear();
  }


  $scope.search = function(){
    $scope.research($scope.searchTerm)
  }

  $scope.research = function(q){
    $scope.searchTerm = q;
    console.log(q)
    var req = {
      url: "http://www.reddit.com/search.json",
      method: 'GET',
      params: {
        q: q
      }
    }
    $http(req).then(function success(res){
      // console.log($scope.history)
      $scope.results = [];
      var redditData = res.data.data.children
        $scope.history.unshift($scope.searchTerm);
      localStorage.setItem('$scope.history', JSON.stringify($scope.history));

      for (i=0; i<redditData.length; i++){
        var singleEntry = redditData[i].data;
        // console.log(singleEntry);
        $scope.results.push(singleEntry);
      }

      // console.log($scope.results);
    }, function error(res){
      console.log("error: ",res)
    })
  }

  $scope.comments = function(url){
    var req = {
      url: url + ".json",
      method: "GET"
    }
    $http(req).then(function success(res){
      $scope.commentResults = res.data.children[0].data;


    }, function error(res){
      console.log("error: ",res)
    })
  }

}]);


