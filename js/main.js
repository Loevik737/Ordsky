
app = angular.module('myApp',['ui.bootstrap']);

app.directive("masonry", function () {
    var NGREPEAT_SOURCE_RE = '<!-- ngRepeat: ((.*) in ((.*?)( track by (.*))?)) -->';
    return {
        compile: function(element, attrs) {
            // auto add animation to brick element
            var animation = attrs.ngAnimate || "'masonry'";
            var $brick = element.children();
            $brick.attr("ng-animate", animation);
            
            // generate item selector (exclude leaving items)
            var type = $brick.prop('tagName');
            var itemSelector = type+":not([class$='-leave-active'])";
            
            return function (scope, element, attrs) {
                var options = angular.extend({
                    itemSelector: itemSelector
                }, scope.$eval(attrs.masonry));
                
                // try to infer model from ngRepeat
                if (!options.model) { 
                    var ngRepeatMatch = element.html().match(NGREPEAT_SOURCE_RE);
                    if (ngRepeatMatch) {
                        options.model = ngRepeatMatch[4];
                    }
                }
                
                // initial animation
                element.addClass('masonry');
                
                // Wait inside directives to render
                setTimeout(function () {
                    element.masonry(options);
                    
                    element.on("$destroy", function () {
                        element.masonry('destroy')
                    });
                    
                    if (options.model) {
                        scope.$apply(function() {
                            scope.$watchCollection(options.model, function (_new, _old) {
                                if(_new == _old) return;
                                
                                // Wait inside directives to render
                                setTimeout(function () {
                                    element.masonry("reload");
                                });
                            });
                        });
                    }
                });
            };
        }
    };
});

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
    
$scope.makeWordcloud = function(){
    
        $scope.wordcloud = [];
        var inputWords = {};
        var cleanString = $scope.input.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()\r\n|\n|\r]/g,' ');
        var inputList = cleanString.split(' ');
        inputList.forEach(function(x) {
            inputWords[x] = (inputWords[x] || 0)+1;   
        });
        inputList = [];
        for(word in inputWords){
            if(word != ""){
                inputList.push({word:word,number:inputWords[word] });
            }
            
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
            $scope.wordcloud.push(
                {
                    margin:Math.floor((Math.random() * 50) + 10),
                    word:inputList[word].word,
                    count:inputList[word].number,
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
    };
}]);
