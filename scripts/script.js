

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
- Make an array of objects with that data
- Loop through that array and ask a question for each card
	- To ask quesiton use card[0].cardQuestion object
	- To answer the question use card[0].cardAnswer object
	- To build the DOM section, for a question use properties foudn in `cardAnswer` object
	- Properties such as:
		- questionImage a picture that helps the user to get the context
		- questionPara some paragraph that puts the question
		- questionOptions should be the 4 bullet options that the user can chose from like:
			- OptionA
			- OptionB
			- OptionC
			- OptionD
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























