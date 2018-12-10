//initialising num squares as it's already set to hard
var numSquares = 6;
//calls function to make array of random colors
var colors = [];
//calls pickColor() function to get and save a random color
var pickedColor;
//selects all the html squares
var squares = document.querySelectorAll(".square");
//selects colorDisplay
var colorDisplay = document.querySelector("#colorDisplay");
//selects status message for correct or try again
var messageDisplay = document.querySelector("#message");
//sets colorDisplay to color selected by randomColor() function
colorDisplay.textContent = pickedColor;
//select h1
var h1 = document.querySelector("h1");
//select and store reset button
var resetButton = document.querySelector("#reset");
//select and store mode buttons
var modeButtons = document.querySelectorAll(".mode");


init();

//below function contains all code that is run to initialise the page
function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	//mode buttons event listeners
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//the below is the same as an if statement functionally
			//called "the ternary" operator
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
};

function setupSquares(){
		//loops through squares list
	for(var i = 0; i < squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//get color of clicked square then compare to selected color
			var clickedColor = this.style.backgroundColor;
			//if clicked color is the correct color
			if(clickedColor === pickedColor){
				//change message to correct
				messageDisplay.textContent = "Correct!"
				//call function to loop through squares and color them all
				changeColors(clickedColor);
				//change h1 to correct color also
				h1.style.backgroundColor = pickedColor;
				//change reset button text
				resetButton.textContent = "Play Again?"
			} else {
				//if incorrect then change current square color to background color
				this.style.backgroundColor = "#232323";
				//change message to try again
				messageDisplay.textContent = "Try Again"
			}

		});
	}
}

function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change display color to match picked color
	colorDisplay.textContent = pickedColor;
	//change h1 background color to new color
	h1.style.backgroundColor = "steelblue";
	//change button content back to original text
	resetButton.textContent = "New Game";
	//change status message back to nothing
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

//assign behaviour for button on click
resetButton.addEventListener("click", function(){
	reset();
})


//loops through squares changing all to specified color
function changeColors(color){
		for(var i = 0; i < squares.length; i++){
				squares[i].style.backgroundColor = pickedColor;
			}
}

//picks a random color from the color array
function pickColor(){
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = [];
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into array
		arr.push(randomColor());
	}
	//return array
	return arr;
}

function randomColor(){
	//pick each RGB from 0 - 255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	//construct into single string
	return "rgb(" + r + ", " + g + ", " + b +")";
}