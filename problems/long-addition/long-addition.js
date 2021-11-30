// Long Addition Solved Step-By-Step


function addOneProblem(){
	var input1 = parseInt(document.querySelector("#input1").value);
	var input2 = parseInt(document.querySelector("#input2").value);
	addProblem(long_addition(input1, input2));
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
		addProblem(long_addition(input1, input2));
	}
}


function long_addition(input1, input2){
	// ensure correct length orientation
	if (input2 > input1){
		var temp = input1;
		input1 = input2;
		input2 = temp;
	}
	
	// Setup space needed
	var final_output = parseInt(input1) + parseInt(input2);
	final_output = String(final_output).split('').reverse().map(digit => parseInt(digit));
	var final_len = final_output.length;
	
	// Set the lists of digits
	var input1 = String(input1).split('').reverse().map(digit => parseInt(digit));
	var input2 = String(input2).split('').reverse().map(digit => parseInt(digit));
	var carries = input1.map(digit => null);
	var output = final_output.map(digit => null);
	
	// Set up the equation
	var input1_latex = output.map((digit,index) => index < input1.length ? String(input1[index]) : String.raw`\phantom{0}`);
	var input2_latex = output.map((digit,index) => index < input2.length ? String(input2[index]) : String.raw`\phantom{0}`);
	var output_latex = output.map(digit => "");
	
	function complete_addition_latex(input1, input2, output){
		var input1_latex = input1.slice();
		var input2_latex = input2.slice();
		var output_latex = output.slice();

		// Add the + sign
		input1_latex.push('');
		input2_latex.push('+');
		output_latex.push('');
		
		// Format for the Latex array
		input1_latex = input1_latex.reverse().join(' & ');
		input2_latex = input2_latex.reverse().join(' & ');
		output_latex = output_latex.reverse().join(' & ');

		// Set up the document
		var doc = [];
		doc.push(String.raw`\begin{array}{*{COLUMNS}{c}}`.replace('COLUMNS', String(final_len+1)));
		doc.push(input1_latex + String.raw`\\`);
		doc.push(input2_latex + String.raw`\\`);
		doc.push(String.raw`\hline`);
		doc.push(output_latex);
		doc.push(String.raw`\end{array}`);
		
		return doc.join('\n');
	}
	
	// Go through the solution steps
	var stepList = [];
	stepList.push({
		'description': "Start by setting up the problem in a table, with the larger number on top.",
		'latex': complete_addition_latex(input1_latex, input2_latex, output_latex)
		});
	for (var digit_step = 0; digit_step < final_len; digit_step++){
		// Find the solution digit and carry
		var input1_digit = digit_step < input1.length ? input1[digit_step] : 0;
		var input2_digit = digit_step < input2.length ? input2[digit_step] : 0;
		var old_carry = digit_step > 0 ? carries[digit_step-1] : 0;
		output[digit_step] = (input1_digit + input2_digit + old_carry) % 10;
		carries[digit_step] = (input1_digit + input2_digit + old_carry) >= 10 ? 1 : 0;

		// Latexify
		if (digit_step >= input1.length) input1_digit = String.raw`\phantom{0}`;
		if (old_carry > 0) input1_digit = String.raw`\overset{CARRY}{DIGIT}`.replace('CARRY',old_carry).replace('DIGIT',input1_digit);
		
		if (carries[digit_step] > 0) input1_latex[digit_step+1] = String.raw`\overset{CARRY}{DIGIT}`.replace('CARRY',carries[digit_step]).replace('DIGIT',input1_latex[digit_step+1]);
		
		if (digit_step >= input2.length) input2_digit = String.raw`\phantom{0}`;
		
		// Set
		input1_latex[digit_step] = input1_digit;
		input2_latex[digit_step] = input2_digit;
		output_latex[digit_step] = output[digit_step];
		
		
		// Construct the description
		var description = "";
		if (digit_step < input1.length){
			description += input1[digit_step];
			if (digit_step < input2.length) description += " + " + input2[digit_step];
			if (old_carry > 0) description += " + " + old_carry;
			if (digit_step >= input2.length && old_carry == 0){
				description += " is a remaining digit,";
			}
			else{
				description += " = ";
				if (carries[digit_step] > 0) description += carries[digit_step];
				description += output[digit_step] + ",";
			}
			description += " so " + output[digit_step] + " becomes the next digit of the result";
			if (carries[digit_step] > 0) description += ", with a carry of " + carries[digit_step];
			description += "."
		}
		else{
			description = "There is a remaining carry of "+ old_carry + ", so that becomes the final digit of the result.";
		}
		
		stepList.push({
			'description': description,
			'latex': complete_addition_latex(input1_latex, input2_latex, output_latex)
			});
	}
	
	return stepList;
}
