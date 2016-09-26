app = angular.module('myApp',[]);


app.controller('myController', ['$scope', function($scope){
    
    $scope.lagOrdsky = function(){
        var inputWords = {};
        $scope.wordsky = [];
        $scope.colors = [
            "#ff0000",
            "#ff8000",
            "#b1b11b",
            "#40ff00",
            "#00ffff",
            "#0080ff",
            "#4000ff",
            "#bf00ff",
            "#ff0080"
        ];
        $scope.inputList = $scope.input.split(" ");
        $scope.inputList.forEach(function(x) {
            inputWords[x] = (inputWords[x] || 0)+1;   
        });
        $scope.inputList = [];
        for(word in inputWords){
            $scope.inputList.push({word:word,number:inputWords[word] });
        }
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
                return array;
            } 
        $scope.inputList = shuffleArray($scope.inputList);
        for(word in $scope.inputList){
            $scope.wordsky.push(
                {
                    margin:Math.floor((Math.random() * 50) + 10),
                    word:$scope.inputList[word].word,fontSize: ($scope.inputList[word].number*4)+20 ,
                    color:$scope.colors[Math.floor((Math.random() * ($scope.colors.length-1)) )]}
            );
           
        }
    }

}]);
