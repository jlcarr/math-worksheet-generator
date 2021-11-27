// Generating Math Problem Worksheets


var problems;

window.addEventListener("load", main, false);

async function main(){
	var params = new URLSearchParams(window.location.search);
	problems = JSON.parse(params.get('problem'));
	addProblems();
}

function addProblems(){
	for(var i=0; i<problems.length; i++){
		var problem = problems[i];
		
		var problem_div = document.querySelector('#problem-template').content.cloneNode(true);
		
		problem_div.querySelector('.problem-title').textContent = "Problem #"+(document.getElementsByClassName('problem').length+1);
		problem_div.querySelector('.problem-definition').textContent =  '$$' + problem[0]['latex'] + '$$';
	
		document.querySelector('#worksheet').appendChild(problem_div);
	}
	MathJax.typeset();
}
