
 

/* Caesar's cipher
==================== */

function caesar(text, shift = 0) {
 	let alphabetBig = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
 		alphabetSmall = "abcdefghijklmnopqrstuvwxyz",
 		cipher = '',
 		index = null;
 	text.split("").forEach(char => {

 		if (alphabetBig.includes(char))
 		{
 			index = alphabetBig.indexOf(char);
 			char = alphabetBig.charAt(indexNormalizer(index+shift));	
 		};

 		if (alphabetSmall.includes(char))
 		{
 			index = alphabetSmall.indexOf(char);
 			char = alphabetSmall.charAt(indexNormalizer(index+shift));
 		};
 		cipher += char;
 	});

 	function indexNormalizer(index) {
 		if (index > 25)
 		{
 			index -= 26;
 		}

 		else if (index < 0)
 		{
 			index += 26;
 		}

 		return index;
 	};

 	return cipher;
 };


/* Fibonacci
===================== */

function fibonacci(indexOfNumber) {
	if (indexOfNumber < 0 )
	{
		return "OOPS!"
	}
	else 
	{
		let number = 1,
			currentNumber,
			prevNumber = 0;
		for (let index = 2; index <= indexOfNumber; index++) {
			currentNumber = number + prevNumber;
			prevNumber = number;
			number = currentNumber;
		};
		return currentNumber;
	}
};

/* reverseString
================== */

function reverseString(string) {
	let reversedString = string.split('').reverse().join("");
	return reversedString; 
};


/* Is string a palindrome?
================================ */

function isPalindrome(string) {
	string = string.toLowerCase();//Registry not important
	string = string.replace(/\W/g, '');//Drop all except letters
	string1 = string.slice(0, Math.floor(string.length/2));
	string2 = reverseString(string.slice(Math.ceil(string.length/2)));
	return (string1 == string2);
};


/* Returns Title of books 
========================*/

function getTheTitles(array) {
	let titles = [];

	array.forEach(book => {
		titles.push(book.title);
	})

	return titles;
}


/* Finds the oldest person 
===============================*/

function findTheOldest(arrayOfPeople) {
	let maxAge = 0,
		name,
		age,
		oldestPeople;

	arrayOfPeople.forEach(people => {
		if ('yearOfDeath' in people)
		{
		age = people.yearOfDeath - people.yearOfBirth;
		}
		else 
		{
		let currentYear = new Date();
		age	= currentYear.getFullYear() - people.yearOfBirth;
		};

		if (age > maxAge)
		{
		maxAge = age;
		oldestPeople = people;
		};
	});

	return oldestPeople;
}




let calculator = {
	add: function(a, b) {
		return (a + b);
	},
	subtract: function(a, b) {
		return (a - b);
	},
	sum: function(array = [0]) {
		let sum = 0;
		array.forEach(function(element) {
			sum += element;
		});
		return sum;

	},
	multiply: function(array = [0]) {
		let sum = array[0];
		array.shift();	
		array.forEach(function(element) {
			sum *= element;
		});
		return sum;
	},
	divide: function(a, b) {
		return a/b;
	},
	factorial: function(a) {
		let factorial = a;
		while (a>1) {
			factorial *= (a-1);
			a--;
		};
		return factorial; 
	},
};

function operate(operator, a, b) {
	switch (operator) {
		case '+':
			return calculator.add(a,b);
			break;
		case '-':
			return calculator.subtract(a,b);
			break;
		case '*':
			return calculator.multiply([a,b]);
			break;
		case '/':
			return calculator.divide(a,b);
			break;
		default:
			return '';
			break;
	};
};


/* Calculator with interface */

function calcWithInterface() {

let calcDisplay = document.querySelector('#calculatorDisplay'),
	calcDisplayValue = calcDisplay.value,
	buttons= document.querySelectorAll('.calculator__button'),
	operator = '',
	currentValue = '',
	arg1 = null,
	arg2 = null;

buttons.forEach(button => {
	button.addEventListener('click', function() {
		if ('0123456789.'.includes(button.value)) {
			if (button.value != '.' | !calcDisplayValue.includes('.')) {
			console.log(button.value, calcDisplay.value = calcDisplayValue + button.value);
			calcDisplayValue = calcDisplay.value;
			currentValue += button.value;
			arg2 = Number(currentValue);
			console.log('currVA ', currentValue);
			}
			else {console.log('. already exist')}
		}
		else {
			switch (button.value) {
				case 'result':

					function result() {
						if (currentValue != '') 
						{
						console.log('arg1 ', arg1, 'Operator: ', operator, 'arg2', arg2, currentValue);
						arg1 = operate(operator, arg1, arg2);
						currentValue = '';
						calcDisplay.value = arg1;
						calcDisplayValue = calcDisplay.value;

						console.log('Result: ', arg1, 'Operator: ', operator);
						console.log('res ',arg1, arg2, 'currVA: ',currentValue);
						}
						else {console.log('arg2 not exist')}
						
					}


					result();
					break;
				case 'back':
					break;
				case 'reset':
					calcDisplay.value = '';
					calcDisplayValue = '';
					operator = '';
					currentValue = '';
					arg1 = null;
					arg2 = null;
					break;
				default:
					if (operator != '') {
						console.log('call result()');
						result();
					}
					
					if (button.value != calcDisplayValue.slice(-1))
					{
					arg1 = Number(calcDisplay.value.match(/-?\d+\.?[\d]{0,}/));
					console.log('extract arg1:', arg1, 'display: ', calcDisplay.value);
					currentValue = '';
					operator = button.value;
					if ('+-*/'.includes(calcDisplayValue.slice(-1))) {
						calcDisplay.value = calcDisplay.value.replace(/.$/m,"");
					}
					calcDisplayValue = calcDisplay.value + operator;
					calcDisplay.value = calcDisplayValue;
					console.log(arg1, operator, arg2);
					}  
					break;
			}
		}
		return console.log('return  ',calcDisplayValue, calcDisplay.value, operator);
		
	})
})



}

calcWithInterface();