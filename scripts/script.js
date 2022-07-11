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

/*
Need to implement this:

- Initially there are no pictures or questiosn/answers on the interface
- The user preses [Start] button
- Then the start button disapears and the first question appers
- The user presses [Show Answer!] then the "Show Answer" button dissapears.
- The answer card will be displayed
- And the 2 buttons apper the [Correct] button and the [Wrong] button
- After the user will press one "Correct" or "Wrong"
	- Then the Answer of the question will disapear
			-And a new question will appear
			-And the "Show Answer" button will appear again

*/

//----------------------------------------------------------------------


	// Declare and define some global variables

	let cards; // Will be an array of cards objects

	// The program has reference to a card using a cardIndex variable
	let cardIndex = 0;

	// Set the score variable to zero
	let score= 0;

	// DOM Manipulation:
	// Grab elements from question card
	let questionImage=document.querySelector(".questionImage");
	let questionPara=document.querySelector(".questionPara");
	console.log("questionPara=",questionPara);

	// Grab elements from answer card
	let answerImage=document.querySelector(".answerImage");
	let answerPara=document.querySelector(".answerPara");

	//Grab the Buttons
	let startBtn= document.querySelector(".startBtn");
	let showAnswerBtn= document.querySelector(".showAnswerBtn");
	let correctBtn= document.querySelector(".correctBtn");
	let wrongBtn= document.querySelector(".wrongBtn");

	//Grab the score element
	let scoreElement = document.querySelector(".score");

	// When the interface initially starts, make all the buttons hidden.
	showAnswerBtn.style.display="none";
	correctBtn.style.display="none";
	correctBtn.style.display="none";
	wrongBtn.style.display="none";

	// Initiate the score elemet
	scoreElement.textContent= score;




//- Parse a JSON file and grab all the 10 cards
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




// SLICE MY PROGRAM INTO MULTIPLE FUNCTIONS
// BECAUSE I NEED TO USE NORMAL FUNCTIONS WITH `addEventListener()`
// IF I WANT TO REMOVE THE EVENT LISTENER ANYWHERE I WANT
// AND BECAUSE YOU CAN'T REMOVE AN EVENT LISTENER WITH AN anonymous FUNCTION BEING PASSED TO addEventListener().. long story..


// This is the function where all my program will "live"
function mainData(data){
	//console.log("data=",data);



	// - Make an array of objects with that data
	cards = data;


	console.log("cards=", cards);
	//console.log("cards[0].question.image=", cards[0].question.image);
	//startBtn.addEventListener("click",()=>{console.log("clicked!!!")});

	console.log("cardIndex= before initialFrame() call", cardIndex);
	// Call the initialFrame() here.
	initialFrame();



}


// For each cart to be displayed this function will be callsed
function initialFrame(){
	// Start looping throgh the object of questions and answers
	startBtn.addEventListener("click",showCard);



}



// This function will be run each time the user presses the START button
function showCard(){
	//console.log("cards inside moveThroughCards() function =", cards);
	startBtn.style.display="none";
	showAnswerBtn.style.display="block";
	// - Loop through that array and ask a question for each card

		//	- To ask quesiton use cards[0].question object
		//	- To answer the question use cards[0].answer object
		questionPara.textContent= cards[cardIndex].question.para;
		//console.log("questionPara.textContent=", questionPara.textContent);

		// Load a new image in my Question areas
		//questionImage.setAttribute= cards[0].question.image;
		questionImage.setAttribute("src",cards[cardIndex].question.image);
		//console.log("questionImage=", cards[0].question.image);

		/*
		- The user presses [Show Answer!] then the "Show Answer" button dissapears.
		- The answer card will be displayed
		- And the 2 buttons apper the [Correct] button and the [Wrong] button
		*/
		showAnswerBtn.addEventListener("click",showMeTheAnswer);



}



// This function will show me the answer card
function showMeTheAnswer(){


	// Set answer
	answerPara.textContent= cards[cardIndex].answer.para;
	answerImage.setAttribute("src",cards[cardIndex].answer.image);

	// Make [Show Answer] button disappear
	showAnswerBtn.style.display="none";

	// - And the 2 buttons apper the [Correct] button and the [Wrong] button
	correctBtn.style.display="block";
	wrongBtn.style.display="block";

	/*
	- After the user will press one "Correct" or "Wrong"
		- Then the Answer of the question will disapear
				-And a new question will appear
				-And the "Show Answer" button will appear again

	*/
	correctBtn.addEventListener("click", correctAnswer);

	wrongBtn.addEventListener("click", wrongAnswer);


}


// Correct answer:
function correctAnswer(){
	// Set answer
	answerPara.textContent= " ";
	answerImage.setAttribute("src"," ");

	//Set question to nothing
	questionPara.textContent= " ";
	questionImage.setAttribute("src", " ");

	// Remove the [Correct] and [Wrong] buttons
	correctBtn.style.display="none";
	wrongBtn.style.display="none";

	// Update the score
	score = score + 1;
	scoreElement.textContent= score;

	//Increase the card index
	cardIndex++;

	// Lets try something:
	startBtn.style.display="block";

	console.log("cardIndex= inside correctBtn.addEventListener()", cardIndex);

	//Here I need to call a function that will render the next question card
	// initialFrame()
	checkForEndOfcardsArray();

}




// Wrong answer function
function wrongAnswer(){
	// Set answer
	answerPara.textContent= " ";
	answerImage.setAttribute("src"," ");

	//Set question to nothing
	questionPara.textContent= " ";
	questionImage.setAttribute("src", " ");

	// Remove the [Correct] and [Wrong] buttons
	correctBtn.style.display="none";
	wrongBtn.style.display="none";

	// Update the score
	score = score - 1;
	scoreElement.textContent= score;

	//Increase the card index
	cardIndex++;

	// Lets try something:
	startBtn.style.display="block";


	//Here I need to call a function that will render the next question card
	// initialFrame()
	checkForEndOfcardsArray();



}



// Check if I am at the end of the array
function checkForEndOfcardsArray(){
	if (cardIndex < cards.length){
		initialFrame();
	}else{
		displayFinalMessage();
	}
}




// This function will display the final message for the user
function displayFinalMessage(){
	// Stop the user becasue is at the end:
	startBtn.style.display="none";

	// Display the "Congratulations" or "Try Again" message based on score
	questionPara.textContent= "GAME OVER";
	console.log("game over");
}







