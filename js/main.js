app = angular.module('myApp',[]);



app.controller('myController', ['$scope', function($scope){
    
    $scope.lagOrdsky = function(){
        var inputOrd = {};
        var multiplier = 0;
        $scope.ordsky = [];
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
        ]
        
        function shuffleArray(array) {
             for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
            return array;
        }
        
        function calcMultiplier(liste){
            if(liste.length > 1000 ){
                return 10;
               }
            else{
                return 15;
            }
        }
            
        
        
        
        $scope.inputListe = $scope.input.split(" ");
        multiplier = calcMultiplier($scope.inputListe);
        $scope.inputListe.forEach(function(x) { inputOrd[x] = (inputOrd[x] || 0)+1; });
        $scope.inputListe = [];
         for( i in inputOrd){
            $scope.inputListe.push({ord:i,number:inputOrd[i]});
        }
        $scope.inputListe = shuffleArray($scope.inputListe);
       
        
        for(ord in $scope.inputListe){
            $scope.ordsky.push(
                {margin:Math.floor((Math.random() * 50) + 10),ord:$scope.inputListe[ord].ord,fontSize: $scope.inputListe[ord].number*multiplier ,color:$scope.colors[Math.floor((Math.random() * ($scope.colors.length-1)) )]}
            );
           
        }
    }

}]);
