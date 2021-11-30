// Generating Math Problem Worksheets


var problems = [];

window.addEventListener("load", main, false);

async function main(){
	addMultipleProblems();
}


function addProblem(stepList){
	problems.push(stepList);

	var problem_div = document.querySelector('#problem-template').content.cloneNode(true);
	problem_div.querySelector('.problem-title').textContent = "Problem #"+(document.getElementsByClassName('problem').length+1);
	
	for (var step = 0; step < stepList.length; step++){
		var step_div = document.querySelector('#problem-step-template').content.cloneNode(true);
		step_div.querySelector(".step-title").textContent = "Step " + (step+1) + ".";
		step_div.querySelector(".step-description").textContent = stepList[step]['description'];
		step_div.querySelector(".step-math").textContent =  '$$' + stepList[step]['latex'] + '$$';
		
		problem_div.querySelector('.problem-steps').appendChild(step_div);
	}
	var description_div = document.createElement('div');
	description_div.innerHTML = "\n<div>Done.</div>";
	problem_div.querySelector('.problem-steps').appendChild(description_div);
	
	document.querySelector('#worksheet').appendChild(problem_div);
	MathJax.typeset();
}

function clearPage(){
	problems = [];
	document.querySelector('#worksheet').innerHTML='';
}

function openProblemWorksheet(showAnswers){
	var queryString = encodeURIComponent(JSON.stringify(problems));
	var url = "../../worksheet?";
	if(showAnswers) url+= "answers&";
	url += "problem="+queryString;
	window.open(url);
}
