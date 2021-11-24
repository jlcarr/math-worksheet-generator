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

function addToPage(stepList){
	for (var step = 0; step < stepList.length; step++){
		var problem_div = document.querySelector('#problem-step-template').content.cloneNode(true);
		problem_div.querySelector(".step-title").textContent = "Step " + (step+1) + ".";
		problem_div.querySelector(".step-description").textContent = stepList[step]['description'];
		problem_div.querySelector(".step-math").textContent =  '$$' + stepList[step]['latex'] + '$$';
		
		document.querySelector('#worksheet').appendChild(problem_div);
	}
	var description_div = document.createElement('div');
	description_div.innerHTML = "\n<div>Done.</div>";
	document.querySelector('#worksheet').appendChild(description_div);
	
	MathJax.typeset();
}
