app = angular.module('myApp',[]);

app.controller('myController', ['$scope', function($scope){

    $scope.colors = [
            {name:"red", hex:"#ff0000"},
            {name:"orange", hex:"#ff8000"},
            {name:"orange/brwn", hex:"#b1b11b"},
            {name:"green", hex:"#40ff00"},
            {name:"skyblue", hex:"#00ffff"},
            {name:"blue", hex:"#0080ff"},
            {name:"purple", hex:"#bf00ff"},
            {name:"pink", hex:"#ff0080"}   
        
    ];
    
$scope.makeWordsky = function(){
        $scope.wordsky = [];
        var inputWords = {};
        var cleanString = $scope.input.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        cleanString = cleanString.replace(/(\r\n|\n|\r)/g," ");
        var inputList = cleanString.split(' ');
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
                    word:inputList[word].word,fontSize: (inputList[word].number*3)+20 ,
                    color: function(){
                        if($scope.colorFilter == "random"){
                            return $scope.colors[Math.floor((Math.random() * ($scope.colors.length-1)) )].hex}
                        else if($scope.colorFilter == ""){
                            return "000000"}
                        else return $scope.colorFilter
                    }         
                }
            );  
        }
    }
}]);
