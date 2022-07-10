/*
## User's Story

- The user preses start
- A question apears
- The user choses from the 4 options
- Presses check button
- Then preses next button
- repeat...

*/


/*
## Program pseudocode

- Parse a JSON file and grab all the 10 cards
	- JSON file will contain an array of card objects
	- Each card object will have
		- question object
			- picture data
			- paragraph data
		- answer object
			- picture data
			- paragraph data
- Make an array of objects with that data
- Loop through that array and ask a question for each card
	- To ask quesiton use card[0].cardQuestion object
	- To answer the question use card[0].cardAnswer object
	- To build the DOM section, for a question use properties foudn in `cardAnswer` object
	- Properties such as:
		- questionImage a picture that helps the user to get the context
		- questionPara some paragraph that puts the question

	- When the user preses `check` button, see if he chose the corect answer.
		- If corect option:
			- Then: Make it green
			- Else: Make it red
		- And at the same time display a more indepth answer on why the answer is the way it is. With a picture too..
		- To display the answwer and the picture use the same technique like you used for the question.
- During this iteration of the array always display and update the score
- At the end of the 10 cards array display a "Congratiulation" or "Try again" message and the final score in large font..
- TODO... I will see what I need more...
*/

//----------------------------------------------------------------------


//- Parse a JSON file and grab all the 10 cards
let cards; // Will be an array of cards objects

// DOM Manipulation:
// Grab elements from question card
let questionImage=document.querySelector(".questionImage");
let questionPara=document.querySelector(".questionPara");
console.log("questionPara=",questionPara);

// Grab elements from answer card
let answerImage=document.querySelector(".answerImage");
let answerPara=document.querySelector(".answerPara");


// Use an XHR object to read the `json` file
const xhr = new XMLHttpRequest();

try {
  xhr.open('GET', 'scripts/cards.json');

  xhr.responseType = 'json';

  xhr.addEventListener('load', () => mainData(xhr.response));
  xhr.addEventListener('error', () => console.error('XHR error'));

  xhr.send();

} catch(error) {
  console.error(`XHR error ${xhr.status}`);
}
//console.log("xhr.status=", xhr.status)


// This is the function where all my program will live
function mainData(data){
	//console.log("data=",data);
	// - Make an array of objects with that data
	cards = data;
	console.log("cards=", cards);
	//console.log("cards[0].question.image=", cards[0].question.image);
	// - Loop through that array and ask a question for each card
	for (let i=0; i<cards.length; i++){
		//	- To ask quesiton use cards[0].question object
		//	- To answer the question use cards[0].answer object
		questionPara.textContent= cards[i].question.para;
		//console.log("questionPara.textContent=", questionPara.textContent);
		// Load a new image in my Question areas
		/*
		Method:
		const button = document.querySelector("button");
		button.setAttribute("name", "helloButton");
		*/

		//questionImage.setAttribute= cards[0].question.image;
		questionImage.setAttribute("src",cards[i].question.image);
		//console.log("questionImage=", cards[0].question.image);

		// Set answer
		answerPara.textContent= cards[i].answer.para;
		answerImage.setAttribute("src",cards[i].answer.image);



	}



}

























