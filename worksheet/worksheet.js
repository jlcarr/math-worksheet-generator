// Generating Math Problem Worksheets


var problems;
var showAnswers = false;

window.addEventListener("load", main, false);

async function main(){
	var params = new URLSearchParams(window.location.search);
	problems = JSON.parse(params.get('problem'));
	showAnswers = (params.get('answers') !== null)
	addProblems();
}

function addProblems(){
	if(showAnswers){
		document.querySelector('h1').textContent = "Answers";
		document.querySelector('#identifiers').style.display = "none";
	}
	else{
		document.querySelector('#score-total').textContent = problems.length;
	}

	for(var i=0; i<problems.length; i++){
		var problem = problems[i];
		
		var problem_div = document.querySelector('#problem-template').content.cloneNode(true);
		
		problem_div.querySelector('.problem-title').textContent = "Problem #"+(document.getElementsByClassName('problem').length+1);
		if(showAnswers) problem_div.querySelector('.problem-definition').textContent =  '$$' + problem[problem.length-1]['latex'] + '$$';
		else problem_div.querySelector('.problem-definition').textContent =  '$$' + problem[0]['latex'] + '$$';
	
		document.querySelector('#worksheet').appendChild(problem_div);
	}
	MathJax.typeset();
}
