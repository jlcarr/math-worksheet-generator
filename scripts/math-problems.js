// Generating Math Problem Worksheets


window.addEventListener("load", main, false);

async function main(){
	var max = 999;
	var min = 1;
	var input1 = Math.floor(Math.random() * (max - min + 1) + min);
	var input2 = Math.floor(Math.random() * (max - min + 1) + min);
	var stepList = long_addition(input1, input2);
	addToPage(stepList);
}


function addOneProblem(){
	var input1 = parseInt(document.querySelector("#input1").value);
	var input2 = parseInt(document.querySelector("#input2").value);
	console.log(input1);
	addProblem(input1, input2);
}

function addMultipleProblems(){
	var input1_min = parseInt(document.querySelector("#input1-min").value);
	var input1_max = parseInt(document.querySelector("#input1-max").value);
	var input2_min = parseInt(document.querySelector("#input2-min").value);
	var input2_max = parseInt(document.querySelector("#input2-max").value);
	var num = parseInt(document.querySelector("#number-new-problems").value);
	
	for(var i=0; i<num; i++){
		var input1 = Math.floor(Math.random() * (input1_max - input1_min + 1) + input1_min);
		var input2 = Math.floor(Math.random() * (input2_max - input2_min + 1) + input2_min);
		addProblem(input1, input2);
	}
}

function addProblem(input1, input2){
	var stepList = long_addition(input1, input2);
	addToPage(stepList);
}

function addToPage(stepList){
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
