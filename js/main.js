app = angular.module('myApp',[]);


app.controller('myController', ['$scope', function($scope){
    
$scope.makeWordsky = function(){
        $scope.wordsky = [];
        var inputWords = {};
        var colors = [
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
      
        var cleanString = $scope.input.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            cleanString = cleanString.replace(/(\r\n|\n|\r)/g," ");
        var inputList = cleanString.split(' ');
    console.log(inputList)
        inputList.forEach(function(x) {
            inputWords[x] = (inputWords[x] || 0)+1;   
        });
        inputList = [];
        for(word in inputWords){
            inputList.push({word:word,number:inputWords[word] });
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
        inputList = shuffleArray(inputList);
        for(word in inputList){
            $scope.wordsky.push(
                {
                    margin:Math.floor((Math.random() * 50) + 10),
                    word:inputList[word].word,fontSize: (inputList[word].number*4)+20 ,
                    color:colors[Math.floor((Math.random() * (colors.length-1)) )]}
            );  
        }
    }
}]);
