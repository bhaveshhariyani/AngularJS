var app=angular.module("angularapp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){

var words=["rat","cat","mat","respect","detail","remember","india","house"];
$scope.incorrectLettersChosen=[];
$scope.correctLettersChosen=[];
$scope.guesses = 6;
$scope.displayWord = '';
$scope.input = {
	letter: ''
}

var selectRandomWord = function(){
	var index = Math.round(Math.random()*words.length);
	return words[index];
}

var newGame = function() {
	$scope.incorrectLettersChosen=[];
	$scope.correctLettersChosen=[];
	$scope.guesses = 6;
	$scope.displayWord = '';
	$scope.selectedWord;

	selectedWord = selectRandomWord();
	var tempDisplayWord = '';
	for (var i = selectedWord.length - 1; i >= 0; i--) {
		tempDisplayWord += '*';
	}
	$scope.displayWord = tempDisplayWord;
	$scope.selectedWord = selectedWord;
}

$scope.letterChosen = function()
{
// Check if $scope.input.letter is a single letter and an alphabet and not an already chosen letter.
		// Check if its correct.
		for(var i=0;i<$scope.correctLettersChosen.length;i++) {
			if($scope.correctLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
				$scope.input.letter="";
				return;
			}
		}
		for(var i=0;i<$scope.incorrectLettersChosen.length;i++) {
			if($scope.incorrectLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
				$scope.input.letter="";
				return;
			}
		}
		var correct=false;
		for(var i=0;i<selectedWord.length;i++) {
			if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase()) {
				$scope.displayWord=$scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
				correct=true;
			}
		}
		if(correct) {
			$scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
		} else {
			$scope.guesses--;
			$scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
		}
		$scope.input.letter="";
		if($scope.guesses==0) {
			// You Lose
		document.getElementById("correct").style.display="block";
		setTimeout(myFunction, 3000);
			// $timeout(function() {
			// 	newGame();
			// },500);
			function myFunction(){
				$timeout(function() {
				newGame();
				});
				document.getElementById("correct").style.display="none";
			}
			
		}
		if($scope.displayWord.indexOf("*")==-1) {
			// Show score
			$timeout(function() {
				newGame();
			},1000);
		}
}
newGame();
}]);