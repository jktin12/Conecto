window.onload = function()
{
/*********** CANVASES and CONTEXTS *******************/
	var boardSize = 400;
	
	/*** HEADER CANVAS ***/
	var headerCanvas = document.getElementById('headerBoard');
	headerCanvas.onselectstart = function () { return false; }//no double click highlighting
	headerCanvas.width = 400;
	headerCanvas.height = 90;
		/*** Context for header canvas ***/
		var ctx2 = headerCanvas.getContext('2d');
	
	/*** GAME CANVAS ***/
	var canvas = document.getElementById('gameBoard');
	canvas.onselectstart = function () { return false; }//no double click highlighting
	canvas.width = boardSize;
	canvas.height = boardSize;
		/*** Context for game canvas ***/
		var ctx = canvas.getContext('2d');

	/*** NOTIFICATIONS CANVAS ***/
	var notifyCanvas = document.getElementById('notifyBoard');
	notifyCanvas.onselectstart = function () { return false; }//no double click highlighting
	notifyCanvas.width = boardSize;
	notifyCanvas.height = 75;
		/*** Context for game canvas ***/
		var ctx3 = notifyCanvas.getContext('2d');

/*********** VARIABLES, ETC. *************************/		
	
	/*** COOKIE INFORMATION ***/
	var cPname = "gameProgress";
	var cDuration = 365; //days
	var cookieFound = false;

	//
	var mode = 1; //1 is main menu, 2 is settings, 3 is game
	var enterNeeded;
	var typeFinished;

	/*** MAIN MENU VARIABLES ***/
	var xBox, yBox, widthBox, heightBox;
	var instructX, instructY, instructW, instructH;
	var playX, playY, playW, playH;
	var resetX, resetY, resetW, resetH;
	var instructionsPrinted = false;
	var moveMade = false;
	var confirm = false, progressMade = false;
	var gridSizeButtonsPrint = 3;

	/*** GAME INFORMATION ***/	
	var clickAllowed = true;
	var gridSize = 3;
	var levelToPlay = 1;
	var packageToPlay = 1;
	var contGame = false;
	var changeSize = false;
	var bonusFinished = false;

	/*** GRID/CELL INFORMATION ***/
	var cellSize = boardSize/gridSize;
	var lineLength = cellSize/2;		//represents 1/2 of a cellSize

	/*** COLOURS ***/
	var threeC = "orange";
	var fourC = "red";
	var fiveC = "green";
	var sixC = "purple";
	var completedChar = "D";
	var buttonFillColor = "yellow";
	var buttonHighColor = threeC;
	var completedColor = "#19cf59";
	
	var buttonBorderColor = "777";
	var squareFillColor = "yellow";
	var squareNoColor = "yellow"; //#fed700
	var lineFillColor = "black";
	var lineNoColor = "green";
	var lineFillWidth = 1;
	var lineNoWidth = 3;
	var squareBorderColor = "#eee";
	var borderWidth = 2;	//border width around squares
	var DEFAULT = 1;		//default line width

	/******* FILL CANVAS ********/	
	ctx.fillStyle = "#999";		//background fill color
	ctx.fillRect(0,0, canvas.width, canvas.height);		//fills the background with the above color

/*********** LEVELS: ARRANGED BY GRID SIZE ***********/

	/*** CREATING ARRAY FOR LEVELS ***/
		var numSizes = 4; //smallest is 3x3 (therefore, 5 sizes are 3x3, ..., 7x7)
		
		var level = new Array();
		for(var m = 0; m < numSizes; m++){
			level[m] = new Array();
		}

		level[7] = new Array();
	/** BONUS LEVEL **/ //1 level
		var bonus = 1;
		var bonusSize = 10;
		level[7][0] = new Array(/*row1*/2,1,1,2,1,1,2,1,1,1,/*row1*/3,2,1,0,1,2,1,2,2,2,/*row1*/2,0,3,2,4,1,2,2,1,3,/*row1*/3,2,1,0,1,1,2,1,2,1,/*row1*/2,1,2,2,1,0,3,3,1,0,/*row1*/1,1,0,1,4,2,1,2,3,2,/*row1*/2,3,3,1,3,2,1,1,4,2,/*row1*/1,1,3,2,1,0,1,2,1,0,/*row1*/1,2,4,1,1,2,1,1,2,2,/*row1*/2,2,1,1,1,1,3,1,2,2);

	/** Size: 3x3 ***/ //24 levels
		var three = 24;
		/******/
		level[0][0] = new Array(/*row1*/1,3,4,/*row2*/0,1,1,/*row3*/3,2,3);
		level[0][1] = new Array(/*row1*/3,2,4,/*row2*/1,1,2,/*row3*/3,2,3);
		level[0][2] = new Array(/*row1*/2,3,3,/*row2*/1,4,1,/*row3*/2,1,1);
		level[0][3] = new Array(/*row1*/3,2,1,/*row2*/1,3,2,/*row3*/1,1,1);
		level[0][4] = new Array(/*row1*/3,2,1,/*row2*/3,4,1,/*row3*/3,3,3);
		level[0][5] = new Array(/*row1*/1,3,3,/*row2*/3,4,1,/*row3*/3,3,1);
		level[0][6] = new Array(/*row1*/3,2,3,/*row2*/2,1,3,/*row3*/2,1,3);
		level[0][7] = new Array(/*row1*/1,1,3,/*row2*/0,1,3,/*row3*/1,2,4);
		level[0][8] = new Array(/*row1*/2,1,2,/*row2*/1,3,3,/*row3*/3,2,1);
		level[0][9] = new Array(/*row1*/3,2,3,/*row2*/1,1,2,/*row3*/2,1,3);
		level[0][10] = new Array(/*row1*/3,1,3,/*row2*/3,3,2,/*row3*/3,1,2);
		level[0][11] = new Array(/*row1*/2,1,3,/*row2*/1,1,2,/*row3*/1,2,3);
		level[0][12] = new Array(/*row1*/3,1,2,/*row2*/1,4,3,/*row3*/1,3,3);
		level[0][13] = new Array(/*row1*/3,1,4,/*row2*/2,2,2,/*row3*/2,2,1);
		level[0][14] = new Array(/*row1*/1,3,4,/*row2*/2,3,1,/*row3*/2,1,2);
		level[0][15] = new Array(/*row1*/3,1,1,/*row2*/2,1,1,/*row3*/3,2,1);
		level[0][16] = new Array(/*row1*/1,2,1,/*row2*/3,3,1,/*row3*/1,0,3);
		level[0][17] = new Array(/*row1*/1,2,3,/*row2*/2,2,3,/*row3*/3,2,3);
		level[0][18] = new Array(/*row1*/2,1,1,/*row2*/1,4,2,/*row3*/3,3,2);
		level[0][19] = new Array(/*row1*/2,3,3,/*row2*/0,2,2,/*row3*/2,1,1);
		level[0][20] = new Array(/*row1*/4,2,3,/*row2*/2,1,3,/*row3*/2,2,3);
		level[0][21] = new Array(/*row1*/1,3,4,/*row2*/1,1,2,/*row3*/4,2,3);
		level[0][22] = new Array(/*row1*/3,1,1,/*row2*/1,4,1,/*row3*/3,1,3);
		level[0][23] = new Array(/*row1*/4,2,4,/*row2*/3,1,2,/*row3*/3,1,3);


				

	/** Size: 4x4 ***/ 
		var four = 24;
		/*******/
		level[1][0] = new Array(/*row1*/2,1,2,2,/*row2*/1,3,1,2,/*row3*/1,4,4,1,/*row4*/2,3,3,3);
		level[1][1] = new Array(/*row1*/4,1,3,1,/*row2*/2,2,2,3,/*row3*/3,3,1,2,/*row4*/2,3,2,3);
		level[1][2] = new Array(/*row1*/1,1,2,0,/*row2*/3,4,1,1,/*row3*/3,3,2,1,/*row4*/1,2,2,1);
		level[1][3] = new Array(/*row1*/3,3,1,2,/*row2*/3,3,1,2,/*row3*/3,2,4,1,/*row4*/0,1,1,1);
		level[1][4] = new Array(/*row1*/4,2,1,2,/*row2*/2,1,1,3,/*row3*/3,1,1,2,/*row4*/2,1,3,1);
		level[1][5] = new Array(/*row1*/1,2,3,1,/*row2*/3,2,1,1,/*row3*/3,3,2,1,/*row4*/1,1,0,2);
		level[1][6] = new Array(/*row1*/3,3,3,2,/*row2*/1,1,2,2,/*row3*/2,3,3,3,/*row4*/0,3,2,3);
		level[1][7] = new Array(/*row1*/2,2,2,2,/*row2*/1,2,2,2,/*row3*/4,1,1,2,/*row4*/1,1,1,3);
		level[1][8] = new Array(/*row1*/2,1,1,0,/*row2*/3,1,1,2,/*row3*/4,3,2,1,/*row4*/1,1,0,1);
		level[1][9] = new Array(/*row1*/3,3,2,2,/*row2*/2,1,1,1,/*row3*/4,2,3,3,/*row4*/1,1,0,3);
		level[1][10] = new Array(/*row1*/3,3,2,1,/*row2*/2,3,1,3,/*row3*/3,3,4,1,/*row4*/1,4,3,2);
		level[1][11] = new Array(/*row1*/1,3,3,1,/*row2*/2,3,2,4,/*row3*/3,3,1,2,/*row4*/1,2,3,3);
		level[1][12] = new Array(/*row1*/4,1,2,2,/*row2*/2,3,4,4,/*row3*/3,2,2,2,/*row4*/1,1,1,3);
		level[1][13] = new Array(/*row1*/3,1,2,1,/*row2*/3,4,2,3,/*row3*/2,3,3,3,/*row4*/1,4,3,1);
		level[1][14] = new Array(/*row1*/3,1,2,1,/*row2*/1,3,1,3,/*row3*/2,3,3,3,/*row4*/2,2,2,3);
		level[1][15] = new Array(/*row1*/3,3,2,2,/*row2*/1,3,3,1,/*row3*/3,3,4,3,/*row4*/1,4,3,4);
		level[1][16] = new Array(/*row1*/2,2,3,2,/*row2*/1,3,3,3,/*row3*/2,1,1,2,/*row4*/1,2,2,3);
		level[1][17] = new Array(/*row1*/1,1,3,2,/*row2*/1,1,1,3,/*row3*/2,2,3,2,/*row4*/2,3,3,2);
		level[1][18] = new Array(/*row1*/1,3,2,1,/*row2*/3,4,2,4,/*row3*/2,3,1,2,/*row4*/1,1,1,3);
		level[1][19] = new Array(/*row1*/1,2,3,0,/*row2*/2,2,3,3,/*row3*/1,3,1,2,/*row4*/1,3,1,4);
		level[1][20] = new Array(/*row1*/3,2,3,2,/*row2*/2,1,2,1,/*row3*/3,3,2,0,/*row4*/1,3,1,1);
		level[1][21] = new Array(/*row1*/2,3,1,2,/*row2*/1,1,2,2,/*row3*/2,0,3,3,/*row4*/1,1,1,4);
		level[1][22] = new Array(/*row1*/1,2,4,2,/*row2*/2,1,3,1,/*row3*/3,1,1,2,/*row4*/1,1,2,1);
		level[1][23] = new Array(/*row1*/3,2,3,1,/*row2*/3,2,4,3,/*row3*/4,3,4,3,/*row4*/2,1,3,4);
		

				


	/** Size: 5x5 ***/ 
		var five = 24;
		/********/
		level[2][0] = new Array(/*row1*/3,2,3,3,3,/*row2*/2,1,3,1,1,/*row3*/3,4,3,2,2,/*row4*/2,2,1,3,1,/*row5*/3,1,2,1,1);
		level[2][1] = new Array(/*row1*/3,2,1,1,3,/*row2*/1,2,2,4,1,/*row3*/2,2,1,3,4,/*row4*/1,1,2,1,3,/*row5*/1,3,3,2,3);
		level[2][2] = new Array(/*row1*/2,2,4,1,3,/*row2*/2,2,3,3,1,/*row3*/1,1,1,3,3,/*row4*/3,4,2,4,1,/*row5*/3,3,3,1,1);
		level[2][3] = new Array(/*row1*/4,2,4,3,1,/*row2*/3,1,3,1,2,/*row3*/3,1,1,3,4,/*row4*/2,1,3,1,2,/*row5*/2,1,1,0,3);
		level[2][4] = new Array(/*row1*/1,2,3,2,2,/*row2*/2,3,3,1,2,/*row3*/3,3,3,3,2,/*row4*/2,2,1,3,1,/*row5*/4,1,3,1,2);
		level[2][5] = new Array(/*row1*/3,2,2,2,1,/*row2*/2,3,3,3,2,/*row3*/2,3,1,3,3,/*row4*/1,1,2,1,1,/*row5*/2,2,3,2,4);
		level[2][6] = new Array(/*row1*/1,3,4,3,3,/*row2*/2,2,1,3,2,/*row3*/3,3,1,3,3,/*row4*/0,1,3,2,2,/*row5*/3,2,1,1,3);
		level[2][7] = new Array(/*row1*/3,1,1,2,3,/*row2*/2,1,3,3,1,/*row3*/3,1,3,4,1,/*row4*/1,3,2,2,2,/*row5*/1,1,2,2,3);
		level[2][8] = new Array(/*row1*/3,2,2,2,4,/*row2*/1,3,2,3,3,/*row3*/3,3,3,4,3,/*row4*/1,3,3,2,2,/*row5*/1,3,3,1,3);
		level[2][9] = new Array(/*row1*/1,2,3,2,4,/*row2*/2,1,2,1,1,/*row3*/3,2,3,2,1,/*row4*/3,3,4,3,3,/*row5*/1,3,3,2,3);
		level[2][10] = new Array(/*row1*/3,2,3,1,4,/*row2*/1,1,2,2,2,/*row3*/3,1,2,1,4,/*row4*/1,1,1,2,3,/*row5*/1,1,1,2,3);
		level[2][11] = new Array(/*row1*/4,3,3,1,4,/*row2*/3,3,2,2,2,/*row3*/2,2,3,4,4,/*row4*/2,2,2,2,2,/*row5*/3,3,3,3,1);
		level[2][12] = new Array(/*row1*/1,1,3,1,3,/*row2*/2,2,2,1,2,/*row3*/3,3,3,2,3,/*row4*/2,1,3,3,1,/*row5*/3,2,1,1,2);
		level[2][13] = new Array(/*row1*/3,2,3,1,1,/*row2*/3,3,3,4,1,/*row3*/4,4,3,2,1,/*row4*/3,4,3,4,1,/*row5*/2,1,2,3,1);
		level[2][14] = new Array(/*row1*/3,2,3,2,2,/*row2*/2,1,1,1,2,/*row3*/1,3,3,1,1,/*row4*/1,2,2,1,2,/*row5*/2,0,1,1,3);
		level[2][15] = new Array(/*row1*/3,3,3,1,3,/*row2*/2,2,2,2,2,/*row3*/1,4,3,4,3,/*row4*/1,3,1,1,1,/*row5*/2,0,3,2,3);
		level[2][16] = new Array(/*row1*/1,3,4,3,4,/*row2*/1,3,3,3,3,/*row3*/1,1,4,2,3,/*row4*/2,2,4,2,1,/*row5*/1,0,3,2,1);
		level[2][17] = new Array(/*row1*/3,2,1,1,4,/*row2*/1,3,3,1,2,/*row3*/1,1,3,2,3,/*row4*/3,1,3,1,2,/*row5*/4,1,3,3,3);
		level[2][18] = new Array(/*row1*/4,1,3,3,1,/*row2*/2,3,3,3,1,/*row3*/4,1,2,3,1,/*row4*/2,1,3,3,2,/*row5*/4,1,1,3,1);
		level[2][19] = new Array(/*row1*/3,2,3,1,2,/*row2*/3,1,1,3,2,/*row3*/2,2,2,2,3,/*row4*/2,1,4,3,3,/*row5*/1,2,3,2,1);
		level[2][20] = new Array(/*row1*/3,2,4,1,1,/*row2*/1,2,1,3,1,/*row3*/3,2,1,3,1,/*row4*/1,1,3,1,2,/*row5*/2,1,1,2,3);
		level[2][21] = new Array(/*row1*/3,2,3,2,2,/*row2*/3,1,1,1,0,/*row3*/3,3,1,1,1,/*row4*/3,1,2,1,3,/*row5*/2,1,3,1,3);
		level[2][22] = new Array(/*row1*/3,1,2,1,1,/*row2*/3,4,2,1,0,/*row3*/1,3,3,2,2,/*row4*/2,3,4,2,2,/*row5*/2,3,4,2,1);
		level[2][23] = new Array(/*row1*/2,0,2,2,3,/*row2*/3,2,1,3,1,/*row3*/3,2,1,2,1,/*row4*/3,2,3,3,2,/*row5*/3,2,1,1,3);
			
				

	/** Size: 6x6 ***/
		var six = 24;
		/*******/
		level[3][0] = new Array(/*row1*/3,2,2,1,1,1,/*row2*/0,1,3,3,3,3,/*row3*/1,3,4,3,2,2,/*row4*/1,4,4,4,3,2,/*row5*/1,4,1,2,1,3,/*row6*/1,3,2,3,2,1);
		level[3][1] = new Array(/*row1*/3,2,3,2,4,1,/*row2*/2,1,1,1,1,3,/*row3*/2,2,1,1,1,1,/*row4*/1,1,3,2,4,3,/*row5*/1,0,3,3,1,2,/*row6*/1,2,3,3,0,3);
		level[3][2] = new Array(/*row1*/2,2,1,1,2,1,/*row2*/0,1,4,4,2,4,/*row3*/1,3,3,4,3,3,/*row4*/2,1,3,1,2,2,/*row5*/4,1,1,1,2,2,/*row6*/2,1,1,3,1,2);
		level[3][3] = new Array(/*row1*/3,2,3,3,2,1,/*row2*/1,1,2,1,2,3,/*row3*/1,3,1,1,2,1,/*row4*/1,4,3,1,1,3,/*row5*/1,3,3,0,3,3,/*row6*/2,3,1,1,1,1);
		level[3][4] = new Array(/*row1*/1,3,1,1,1,2,/*row2*/3,4,1,3,3,3,/*row3*/2,1,1,3,2,3,/*row4*/2,1,3,3,3,1,/*row5*/3,4,1,2,3,2,/*row6*/0,3,2,3,3,2);
		level[3][5] = new Array(/*row1*/3,3,2,3,1,0,/*row2*/2,1,1,3,3,2,/*row3*/4,3,1,2,1,1,/*row4*/2,3,2,3,1,3,/*row5*/4,3,2,3,3,2,/*row6*/1,2,2,3,1,4);
		level[3][6] = new Array(/*row1*/2,1,2,2,3,0,/*row2*/2,1,2,1,2,1,/*row3*/1,1,1,3,3,2,/*row4*/1,3,1,1,3,3,/*row5*/1,1,2,4,4,3,/*row6*/0,1,2,3,1,3);
		level[3][7] = new Array(/*row1*/2,1,1,1,3,0,/*row2*/2,3,3,1,2,1,/*row3*/2,2,1,1,2,2,/*row4*/3,1,1,3,3,4,/*row5*/3,2,3,3,2,2,/*row6*/1,1,0,1,3,4);
		level[3][8] = new Array(/*row1*/3,2,3,3,4,2,/*row2*/1,2,1,2,1,2,/*row3*/2,1,1,4,3,2,/*row4*/1,4,2,4,4,3,/*row5*/3,2,1,3,3,1,/*row6*/1,1,1,1,1,2);
		level[3][9] = new Array(/*row1*/3,1,3,3,4,1,/*row2*/2,2,3,3,3,1,/*row3*/1,2,1,3,3,2,/*row4*/1,3,1,2,2,1,/*row5*/1,3,3,3,1,2,/*row6*/2,3,1,2,0,1);
		level[3][10] = new Array(/*row1*/1,0,1,1,2,0,/*row2*/3,2,4,1,2,1,/*row3*/4,1,3,3,3,2,/*row4*/2,2,2,2,2,2,/*row5*/4,1,2,3,1,2,/*row6*/1,2,3,3,2,3);
		level[3][11] = new Array(/*row1*/3,3,3,2,2,2,/*row2*/2,3,1,3,4,1,/*row3*/3,4,2,1,2,0,/*row4*/2,4,2,2,3,1,/*row5*/3,4,1,0,1,3,/*row6*/1,3,1,1,2,1);
		level[3][12] = new Array(/*row1*/2,2,3,3,3,1,/*row2*/1,1,0,2,2,2,/*row3*/1,3,3,3,3,2,/*row4*/0,3,1,1,1,1,/*row5*/2,4,1,3,2,1,/*row6*/0,2,1,4,2,1);
		level[3][13] = new Array(/*row1*/3,2,3,1,1,2,/*row2*/2,3,4,3,2,1,/*row3*/4,3,1,2,3,3,/*row4*/1,2,2,1,2,2,/*row5*/3,1,1,3,3,3,/*row6*/2,1,3,3,0,2);
		level[3][14] = new Array(/*row1*/1,0,2,2,1,2,/*row2*/2,2,4,3,4,1,/*row3*/1,3,4,3,3,2,/*row4*/2,3,3,1,3,3,/*row5*/3,1,2,1,1,2,/*row6*/0,1,1,1,2,4);
		level[3][15] = new Array(/*row1*/3,3,3,2,3,2,/*row2*/2,2,1,2,2,3,/*row3*/3,1,3,2,2,3,/*row4*/2,1,1,1,1,3,/*row5*/3,3,2,1,2,2,/*row6*/1,3,2,2,1,3);
		level[3][16] = new Array(/*row1*/3,3,1,1,1,2,/*row2*/2,2,2,1,3,1,/*row3*/2,2,1,3,3,1,/*row4*/3,3,3,3,2,2,/*row5*/4,1,1,3,3,1,/*row6*/1,3,2,1,2,1);
		level[3][17] = new Array(/*row1*/3,2,3,3,3,1,/*row2*/3,2,4,4,3,3,/*row3*/2,1,3,3,2,1,/*row4*/3,1,1,3,2,1,/*row5*/2,1,3,2,3,2,/*row6*/1,3,2,1,1,1);
		level[3][18] = new Array(/*row1*/2,2,1,3,4,1,/*row2*/1,4,3,2,2,1,/*row3*/2,4,3,2,1,1,/*row4*/2,1,3,4,3,3,/*row5*/2,2,3,2,1,1,/*row6*/0,1,3,1,0,1);
		level[3][19] = new Array(/*row1*/1,3,4,2,3,1,/*row2*/1,3,3,3,4,1,/*row3*/2,2,2,3,4,2,/*row4*/3,4,3,4,4,3,/*row5*/1,4,1,2,3,1,/*row6*/2,4,1,2,1,3);
		level[3][20] = new Array(/*row1*/1,3,3,2,3,2,/*row2*/0,2,2,1,1,2,/*row3*/1,1,1,3,1,2,/*row4*/2,1,1,1,4,4,/*row5*/1,2,1,3,1,3,/*row6*/0,3,2,4,2,1);
		level[3][21] = new Array(/*row1*/3,2,3,3,3,0,/*row2*/1,2,3,2,3,3,/*row3*/2,1,3,3,3,1,/*row4*/3,4,2,4,3,2,/*row5*/3,4,3,4,2,2,/*row6*/0,1,3,4,2,2);
		level[3][22] = new Array(/*row1*/1,2,1,3,1,0,/*row2*/1,3,1,3,3,1,/*row3*/3,4,1,0,1,3,/*row4*/1,4,3,1,0,2,/*row5*/2,3,2,1,2,3,/*row6*/0,2,1,2,2,3);
		level[3][23] = new Array(/*row1*/1,3,3,1,3,2,/*row2*/0,1,1,1,4,3,/*row3*/1,1,2,1,1,2,/*row4*/2,2,2,3,3,3,/*row5*/2,1,3,1,1,2,/*row6*/1,3,1,1,2,4);		
		



				


/*********** COOKIES (Used to save progress between visits on same browser) ***********/

function ProgressCookie() // simply a string that uses a combination of symbols to remember completed levels
{
	var cookieString = "*"; // each completed level is separated by a comma (,) ex. of string is "3:14,3:15,3:24,5:18,4:24,*"
	this.resumeProgress = function(cString)
	{
		cookieString = cString;
	}
	this.addProgress = function(grid, level)
	{
		cookieString = cookieString.substring(0, cookieString.length - 1) // removes the * so that a new end can be defined
		cookieString= cookieString+grid+":"+level+",*";
		//alert("adding progress, cookieString:"+cookieString);
	}
	this.removeProgress = function()
	{
		cookieString = "*";
	}
	this.getString = function()
	{
		return cookieString;
	}
	this.checkCookie = function(){
		var pastCookie=this.getCookie(cPname);
		//alert(pastCookie);
		if (pastCookie!=null && pastCookie!="" &&pastCookie!="*"){
			progressMade = true;
			ctrl.congratulate(3, "Welcome back!", "");
			enterNeeded = false; //required because enterNeeded is set to true in congratulate()
			this.resumeProgress(pastCookie);
			cookieFound = true;
		}
		//alert("Checking for cookie");
	}
	this.setCookie = function(c_name,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(this.getString()) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
		//alert("Setting cookie");
	}
	this.getCookie = function(c_name)
	{
		//alert("Getting cookie");
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + c_name + "=");
		if (c_start == -1){
			c_start = c_value.indexOf(c_name + "=");
		}
		if (c_start == -1){
			c_value = null;
		}
		else{
			c_start = c_value.indexOf("=", c_start) + 1;
			var c_end = c_value.indexOf(";", c_start);
			if (c_end == -1){
				c_end = c_value.length;
			}
			c_value = unescape(c_value.substring(c_start,c_end));
		}
		return c_value;
	}
	this.progressFromCookie = function()
	{
		var currentIndex = 1;
		var gridString="", levelString="";
		var gridInt, levelInt;
		//cookieString = "4:9,3:1,3:2,3:24,3:21,5:1,5:2*";
		//cookieString="*";
		//alert(cookieString+"  length:"+cookieString.length);

		do
		{
			//alert("index: "+currentIndex+ "; length: "+cookieString.length+"; cookieString:"+cookieString);
			gridString=""; levelString="";
			if(cookieString.charAt(currentIndex) == ":"){
				
				gridString += cookieString.charAt(currentIndex-1);
				levelString += cookieString.charAt(currentIndex+1);
				if(cookieString.charAt(currentIndex+2) != ","){
					levelString += cookieString.charAt(currentIndex+2);
				}
				gridInt = parseInt(gridString);
				levelInt = parseInt(levelString);
				//alert("grid:"+gridInt+"; level:"+levelInt);
				levelButton[gridInt-3][levelInt-1].complete(true, true, false);
			}
			currentIndex++;
		}
		while(currentIndex<cookieString.length);
	}
}

/*********** CLASSES *********************************/
	
	function getNumberLevels(size)
	{
		if(size == 3)
			return(three);
		if(size == 4)
			return(four);
		if(size == 5)
			return(five);
		if(size == 6)
			return(six)
		//will need to implement for other grid sizes
	}
	function changeMode(newMode)
	{
		mode = newMode; // 1 is main menu, 2 is settings, 3 is game, 4 is package select
	}

	function bonusWon(bonusVal)
	{
		bonusFinished = bonusVal;
		if(bonusFinished){
			restartIcon.src = "logo5.png";
		}
		else{
			restartIcon.src = "logo4.png";
		}
	}
	function removeWelcome(){
		xBox = 0, yBox = 0, widthBox = boardSize, heightBox = 70;
		ctx3.fillStyle = "red";
		ctx3.fillRect(xBox, yBox, widthBox, heightBox);
		cookieFound = false;
	}

	/**** Level buttons ****/
	var numberSizes = numSizes;				//the number of grid size buttons that will be displayed
	var selectedSize = gridSize;			//originally, the current grid size will be the selected grid size
	var numberLevels = getNumberLevels(selectedSize)		//the number of level buttons that will be displayed
	var distBetween = 10;

	function Button(num, buttonSize, levelB, compl)
	{
		var number;
		var Bsize = buttonSize - distBetween;
		var completed = compl;
		var selected = false;

		this.print = function(BGcolor)
		{
			var colOff = distBetween+((num%6)*(Bsize+distBetween));				//offset is used to print the square at the appropriate (x,y) coordinate
			var rowOff = distBetween+((Math.floor(num/6))*(Bsize+distBetween));	//in relation to the squares around it.
			if(levelB){
				rowOff += ((boardSize/4)+distBetween);
				number = num+1;
			}
			else{
				number = num+3;
			}
			/***** Button Fill Colour *****/
			if(completed){
				if(gridSize!= 10){
					ctx.fillStyle = completedColor;
				}
				else{
					ctx.fillStyle = BGColor;
				}
			}
			else{	
				if(selected){
					ctx.fillStyle = buttonHighColor;
				}
				else{
					ctx.fillStyle = BGcolor;
				}
			}
				
			/*** Button Outline Colour/Width ***/
			ctx.strokeStyle = buttonBorderColor;
			ctx.lineWidth = borderWidth;
			/*******/
			ctx.fillRect(colOff, rowOff, Bsize, Bsize);
			ctx.strokeRect(colOff, rowOff, Bsize, Bsize);

			//alert(completed);
			/*if(completed){
				ctx.font="14px Arial";
				ctx.fillStyle = completedColor;
				ctx.fillText(number,colOff+(Bsize/3),rowOff+(Bsize/2));
			}*/
			//else{
				ctx.font="14px Arial";
					ctx.fillStyle = "black";
				if(levelB){
					ctx.fillText(number,colOff+(Bsize/3),rowOff+(Bsize/2));
				}
				else{
					ctx.fillText(number+" x "+number,colOff+(Bsize/3),rowOff+(Bsize/2));
				}
			//}
		}
		this.select = function(yesNo)
		{
			selected = yesNo;
		}
		this.getSelect = function()
		{
			return(selected);
		}
		this.complete = function(completeYN, fromCookie, loop)
		{
			completed = completeYN;
			if(!fromCookie && !loop){
				gameCookie.addProgress(gridSize, levelToPlay);
			}
			
		}
		this.getComplete = function()
		{
			return(completed);
		}
	}


	function Square(type, xPos, yPos)	//sets vertices according to type
	{													
		if(type == 1){
				this.top = true; this.right = true; this.bottom = false; this.left = false;}	
			else if(type == 2){
				this.top = true; this.right = false; this.bottom = true; this.left = false;}
			else if(type == 3){
				this.top = true; this.right = true; this.bottom = false; this.left = true;}
			else if(type == 4){
				this.top = true; this.right = true; this.bottom = true; this.left = true;}
			else{
				this.top = false; this.right = false; this.bottom = false; this.left = false;}

		this.changeType = function(newType)	//used when the level changes
		{
			if(newType == 1){
				this.top = true; this.right = true; this.bottom = false; this.left = false;}	
			else if(newType == 2){
				this.top = true; this.right = false; this.bottom = true; this.left = false;}
			else if(newType == 3){
				this.top = true; this.right = true; this.bottom = false; this.left = true;}
			else if(newType == 4){
				this.top = true; this.right = true; this.bottom = true; this.left = true;}
			else{
				this.top = false; this.right = false; this.bottom = false; this.left = false;}
		}
		
		this.rotate = function()	//rotates the values of the calling Square
		{
			var extra = this.top;
			this.top = this.left; this.left = this.bottom; this.bottom = this.right; this.right = extra;
		};

		this.print = function(bgColor, lColor, lWidth)
		{
			var xOffset = xPos*cellSize;		//offset is used to print the square at the appropriate (x,y) coordinate
			var yOffset = yPos*cellSize;				//in relation to the squares around it.

			/***** Square Fill Colour *****/
			ctx.fillStyle = bgColor;
			/*** Square Outline Colour/Width ***/
			ctx.strokeStyle = squareBorderColor;
			ctx.lineWidth = borderWidth;
			/*******/
			ctx.fillRect(xOffset, yOffset, cellSize, cellSize);
			ctx.strokeRect(xOffset, yOffset, cellSize, cellSize);
			//Change width back to default
			ctx.lineWidth = lWidth;

			//If there is a vertex in a particular square, then the line from that vertex to the center will be drawn
			if(this.top)
				this.line(lColor, xOffset+lineLength, yOffset, xOffset+lineLength, yOffset+lineLength);	
			if(this.right)
				this.line(lColor, xOffset+lineLength, yOffset+lineLength, xOffset+cellSize, yOffset+lineLength);
			if(this.bottom)
				this.line(lColor, xOffset+lineLength, yOffset+lineLength, xOffset+lineLength, yOffset+cellSize);
			if(this.left)
				this.line(lColor, xOffset, yOffset+lineLength, xOffset+lineLength, yOffset+lineLength);
		};

		//A function used to draw a line, must pass in the color, start x and y, end x and y
		this.line = function(color, startX, startY, endX, endY)
		{
			ctx.strokeStyle = color;
			ctx.moveTo(startX, startY);
			ctx.lineTo(endX, endY);
			ctx.stroke();
		};
	}
	
	function getMousePos(canvas, event) 
	{
		var rect = canvas.getBoundingClientRect();
		return {x: event.clientX - rect.left, y: event.clientY - rect.top};
  	}
  	function allowClick(allowed)
  	{
  		clickAllowed = allowed;
  		if(clickAllowed){
	  		xBox = 0, yBox = 0, widthBox = boardSize, heightBox = 70;
			ctx3.fillStyle = "red";
			ctx3.fillRect(xBox, yBox, widthBox, heightBox);
			enterNeeded = false;
		}
		else{
			enterNeeded = true;
		}
  	}

	function ControlScreen()
	{
		this.changeGrid = function(newGridSize)
		{
			//used each time the grid changes, i.e. level change menu or once level 24 is finished
			gridSize = newGridSize;
			cellSize = boardSize/gridSize;
			lineLength = cellSize/2;
			var r;
			var c;

			var count = 1;
			do
			{
				// create a far right column of the previous grid size's height (r<gridSize-1)
				c = gridSize-count;
				for(r = 0; r<gridSize-count; r++){
					square[c][r] = new Square(0, c, r);
					//alert("!");
				}
				//create a far bottom row of the new grid size's width
				r = gridSize-count;
				for(c = 0; c<gridSize; c++){
					square[c][r] = new Square(0, c, r);
					//alert("!");
				}
				count++;
			}
			while(count<=(gridSize-3));
			
			this.printHeader();
			ctx2.font="20px Arial";
			ctx2.fillStyle = "black";
			if(gridSize != 10){
				ctx2.fillText("Grid: "+gridSize+"x"+gridSize,12,70);
				ctx2.fillText("Level: "+levelToPlay, 120,70);
			}
			else{
				ctx2.fillText("BONUS LEVEL", 30, 70);
			}

			for(var i=0; i<4; i++)
			{
				sizeButton[i].select(false);
			}
			if(gridSize!=10){
				sizeButton[gridSize-3].select(true);
			}

			switch(gridSize-2)
			{
				case 1: buttonHighColor = threeC;
					break;
				case 2: buttonHighColor = fourC;
					break;
				case 3: buttonHighColor = fiveC;
					break;
				case 4: buttonHighColor = sixC;
					break;
				case 8: buttonHighColor = "yellow";
					break;
			}
			allowClick(true);

		}
		this.changeLevel = function(newLevel)
		{
			levelToPlay = newLevel;
		}
		this.changeValues = function()
		{
			//CHANGING THE VALUES OF THE ELEMENTS OF square
			for(var r=0; r<gridSize; r++){
				for(var c=0; c<gridSize; c++){
					square[c][r].changeType(level[gridSize-3][levelToPlay-1][r*gridSize+c]);
					/********* The complex stuff after level is used to determine which type of configuration the square should be
					based on the information above in 'LEVELS: ARRANGED.....' ******/
				}
			}
			allowClick(true);
		}

		this.reprint = function(squareBGcolor, linePcolor, linePwidth)
		{
			ctx.canvas.width = ctx.canvas.width; //clears the gameBoard canvas
			//ctx2.headerCanvas.width = ctx2.headerCanvas.width; //clears the header of the gameBoard
			for(var row=0; row<gridSize; row++)
			{
				for(var col=0; col<gridSize; col++)
				{
					square[row][col].print(squareBGcolor, linePcolor, linePwidth);
					square[row][col].print(squareBGcolor, linePcolor, linePwidth); //to ensure brightness
				}
			}
			this.printHeader();
			ctx2.font="20px Arial";
			ctx2.fillStyle = "black";
			if(gridSize!=10){
				ctx2.fillText("Grid: "+gridSize+"x"+gridSize,12,70);
				ctx2.fillText("Level: "+levelToPlay, 120,70);
			}
			else{
				ctx2.fillText("BONUS LEVEL", 30, 70);
			}
			if(enterNeeded){

			}
			else{
				xBox = 0, yBox = 0, widthBox = boardSize, heightBox = 70;
				ctx3.fillStyle = "red";
				ctx3.fillRect(xBox, yBox, widthBox, heightBox);
			}

			mode = 3;
		}

		this.printHeader = function()
		{
			var midPoint = 40;

			ctx2.strokeStyle = "black";
			ctx2.moveTo(0, headerCanvas.height/2);
			ctx2.lineTo(gameBoard, headerCanvas.height/2);
			ctx2.stroke();
			ctx2.fillStyle = "red";
			ctx2.fillRect(0,0, headerCanvas.width, headerCanvas.height);
			ctx2.fillStyle = "#003498";
			ctx2.fillRect(0,0, headerCanvas.width, midPoint);
			ctx2.strokeStyle = "#0064C8";
			ctx2.moveTo(0, midPoint);
			ctx2.lineTo(boardSize, midPoint);
			for(var i=0;i<3;i++){
				ctx2.stroke();
			}
		}

		this.congratulate = function(levelGridMenu, line1, line2) //levelGridMenu is used to determine if the "press enter..." should be displayed
		{
			enterNeeded = true;
			var enterPressed = false;
			xBox = 0, yBox = 0, widthBox = boardSize, heightBox = 70;
			
			ctx3.fillStyle = "red";
			ctx3.fillRect(xBox, yBox, widthBox, heightBox);
			ctx3.strokeStyle = "red";
			ctx3.strokeRect(xBox, yBox, widthBox, heightBox);

			ctx3.font = "12px Arial";
			ctx3.fillStyle = "white";
			ctx3.fillText(line1, xBox+10, yBox+20);
			ctx3.fillText(line2, xBox+10, yBox+36);
			//ctx3.fillText(line3, xBox+10, yBox+66);
			if(levelGridMenu<3){
				ctx3.fillText("Press enter or click this box to continue...", xBox+20, yBox+56);
			}
			typeFinished = levelGridMenu;

			progressMade = true;
		}

		this.printSettings = function()
		{
			if(gridSize != 10){
				gridSizeButtonsPrint = gridSize;
			}
			else{
				gridSizeButtonsPrint = 3;
			}
			
			ctx.canvas.width = ctx.canvas.width; //clears the gameBoard canvas
			ctx.fillStyle = "#003498";
			ctx.fillRect(0,0,boardSize,boardSize);
			for(var col = 0; col<numSizes; col++){
				sizeButton[col].print(buttonFillColor);
			}
			for(var row = 0; row< 4; row++){
				for(var col = 0; col<6; col++){
					levelButton[gridSizeButtonsPrint-3][(row*6)+col].print(buttonHighColor);
				}
			}

			this.printHeader();
			ctx2.font="20px Arial";
			ctx2.fillStyle = "black";
			if(gridSize!=10){
				ctx2.fillText("Grid: "+gridSize+"x"+gridSize,12,70);
				ctx2.fillText("Level: "+levelToPlay, 120,70);
			}
			else{
				ctx2.fillText("BONUS LEVEL", 30, 70);
			}
		}

		this.printMenu = function()
		{
			ctx.canvas.width = ctx.canvas.width; //clears the gameBoard canvas
			ctx.fillStyle = "yellow";
			ctx.fillRect(0,0,boardSize,boardSize);
			
			xBox = 60, yBox = 110, widthBox = 280, heightBox = 140;
			instructX = xBox+30, instructY = yBox+heightBox+20, instructW = 100, instructH = 30;
			playX = instructX + instructW + 20, playY = instructY; playW = 100, playH = 30;
			resetW = 130, resetX = instructX + (instructW+20+playW-resetW)/2, resetY = instructY+instructH+20, resetH = 30;

			//var enterPressed = false;
			ctx.fillStyle = "#003498";
			ctx.fillRect(xBox, yBox, widthBox, heightBox);
			ctx.strokeStyle = "red";
			ctx.strokeRect(xBox, yBox, widthBox, heightBox);

			ctx.font = "12px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("Welcome to Conecto!", xBox+10, yBox+26);
			ctx.fillText("Please select one of the options below to ", xBox+10, yBox+56);
			ctx.fillText("begin.", xBox+10, yBox+72);
			ctx.fillText("", xBox+10, yBox+92);

			
			ctx.fillStyle = "red";
			ctx.fillRect(instructX, instructY, instructW, instructH);
			ctx.fillRect(playX, playY, playW, playH);
			if(progressMade){
				ctx.fillRect(resetX, resetY, resetW, resetH);
			}
			ctx.font = "16px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("Instructions", instructX+10, instructY+20);
			ctx.fillText("Play", playX+30, playY+20);
			if(progressMade){
				ctx.fillText("Reset Progress", resetX+8, resetY+20);
			}
		}

		this.printInstructions = function()
		{
			instructionsPrinted = true;

			ctx.canvas.width = ctx.canvas.width; //clears the gameBoard canvas
			ctx.fillStyle = "yellow";
			ctx.fillRect(0,0,boardSize,boardSize);
			
			xBox = 60, yBox = 110, widthBox = 280, heightBox = 140;

			ctx.fillStyle = "#003498";
			ctx.fillRect(xBox, yBox, widthBox, heightBox);
			ctx.strokeStyle = "red";
			ctx.strokeRect(xBox, yBox, widthBox, heightBox);

			ctx.font = "12px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("Instructions", xBox+10, yBox+26);
			ctx.fillText("Connect the paths to advance to the next level.", xBox+10, yBox+56);
			ctx.fillText("A completed path may end on the edge of the", xBox+10, yBox+72);
			ctx.fillText("board, but not in the middle. There may be more", xBox+10, yBox+88);
			ctx.fillText("than one path. Rotate path segments by clicking", xBox+10, yBox+104);
			ctx.fillText("on them. Click the settings icon to choose a level.", xBox+10, yBox+120);

			ctx.fillStyle = "red";
			ctx.fillRect(instructX, instructY, instructW, instructH);
			ctx.fillRect(playX, playY, playW, playH);
			if(progressMade){
				ctx.fillRect(resetX, resetY, resetW, resetH);
			}
			ctx.font = "16px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("Menu", instructX+30, instructY+20);
			ctx.fillText("Play", playX+30, playY+20);
			if(progressMade){
				ctx.fillText("Reset Progress", resetX+8, resetY+20);
			}
		}

		this.printConfirm = function()
		{
			ctx.canvas.width = ctx.canvas.width; //clears the gameBoard canvas
			ctx.fillStyle = "yellow";
			ctx.fillRect(0,0,boardSize,boardSize);
			
			xBox = 60, yBox = 110, widthBox = 280, heightBox = 140;

			ctx.fillStyle = "#003498";
			ctx.fillRect(xBox, yBox, widthBox, heightBox);
			ctx.strokeStyle = "red";
			ctx.strokeRect(xBox, yBox, widthBox, heightBox);

			ctx.font = "12px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("Are you sure?", xBox+10, yBox+26);
			ctx.fillText("If you click confirm, your progress on", xBox+10, yBox+56);
			ctx.fillText("all grid sizes and all levels will be", xBox+10, yBox+72);
			ctx.fillText("lost. Click confirm to continue; Click", xBox+10, yBox+88);
			ctx.fillText("cancel to return to the main menu.", xBox+10, yBox+104);

			ctx.fillStyle = "red";
			ctx.fillRect(instructX, instructY, instructW, instructH);
			ctx.fillRect(playX, playY, playW, playH);
			ctx.font = "16px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("Confirm", instructX+30, instructY+20);
			ctx.fillText("Cancel", playX+30, playY+20);

			confirm = true;
		}

		this.clickSquare = function(x,y)
		{
			//alert("x:"+x+", y:"+y);

			var xFound = false, yFound = false;
			var a = 1, b = 1;
			
			var cellSizeOffsetX = cellSize+borderWidth; //includes the width of the borders of each square
			var cellSizeOffsetY = cellSize;

			var clickX = x;
			var clickY = y-3;

			//alert(clickX+","+clickY);
			do 													//loop in which the value of a is incremented by 1
			{													//continues until the row has been found (index is a-1)		
				if(clickX/cellSizeOffsetX < a) 
	    		{
		    		do 											//loop in which the value of b is incremented by 1
		    		{ 											//continues until the column has been found (index is b-1)
			    		if(clickY/cellSizeOffsetY < b)					//if the pixel y coordinate/cellSize of the click is less than b, the b value is the number of the column
			    		{
			    			square[a-1][b-1].rotate();			//rotates the square
			    			ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth);						//reprints the board
			    			yFound = true;						//tells the loop that a column has been found
			    		}
			    		b++;
			    		if(b>gridSize)							//if the click is outside (something wrong happened)
			    		{
			    			yFound = true;
			    		}
			    	}
			    	while(!yFound);
			    	xFound = true;								//tells the loop that the row has been found
	    		}
	    		a++;
	    		if(a>gridSize)
			    		{
			    			xFound = true;
			    		}
	    	}
	    	while(!xFound); 
		}

		this.clickButton = function(x,y)
		{
			var cFound = false, rFound = false, gFound = false;
			var gC, gR=1, lC=0, lR=0;
			var gbSize = (boardSize)/4;
			var lbSize = (boardSize)/6;

			for(gC = 1; gC <= 4; gC++)
			{
				if(!gFound){
					//if a grid size button is pressed
					if(x/gbSize < gC){
						if(y/gbSize<gR){
							ctrl.changeGrid(gC+2);
							ctrl.changeLevel(1);
							ctrl.changeValues();
							gFound = true;

							for(var i=0; i<4; i++)
							{
								sizeButton[i].select(false);
							}

							sizeButton[gC-1].select(true);
							switch(gC)
							{
								case 1: buttonHighColor = threeC;
									break;
								case 2: buttonHighColor = fourC;
									break;
								case 3: buttonHighColor = fiveC;
									break;
								case 4: buttonHighColor = sixC;
									break;
							}
							ctrl.printSettings();
						}
					}
				}
			}

			if(!gFound){
				do 													//loop in which the value of a is incremented by 1
				{													//continues until the row has been found (index is a-1)		
					if(x/lbSize < lC) 
		    		{
			    		do 											//loop in which the value of b is incremented by 1
			    		{ 											//continues until the column has been found (index is b-1)
				    		if(((y-gbSize)-10)/lbSize < lR){					//if the pixel y coordinate/cellSize of the click is less than b, the b value is the number of the column
				    			//alert(lC+(6*(lR-1)));
				    			
						    	ctrl.changeLevel(lC+(6*(lR-1)));
								ctrl.changeValues();
								ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth); //reprints after the level changes

				    			rFound = true;						//tells the loop that a column has been found
				    		}
				    		lR++;
				    		if(lR>4){						//if the click is outside (something wrong happened)
				    			rFound = true;
				    		}
				    	}
				    	while(!rFound);
				    	cFound = true;								//tells the loop that the row has been found
		    		}
		    		lC++;
		    		if(lC>6)
				    		{
				    			cFound = true;
				    		}
		    	}
		    	while(!cFound); 
		    }
		}	
	}
  	
  	function CheckWin()
  	{
  		this.checkConnect = function()
  		{
  			//alert("!");

  			var currentR = 0, currentC = 0;


  			var finished = true;
  			//alert("finished set to true");
  			do
  			{
  				do
  				{
	  				var topRow = false, bottomRow = false, leftCol = false, rightCol = false;
		  			if(currentR == 0){
		  				topRow = true;}
		  			if(currentR == gridSize-1){
		  				bottomRow = true;}
		  			if(currentC == 0){
		  				leftCol = true;}
		  			if(currentC == gridSize-1){
		  				rightCol = true;}
		  			
		  			/* below could be made more elegent by making a universal checker
	  				requiring certain parameters, not necessary at the moment, but
	  				possibly if the game becomes more complicated, it will need to be. */
	  				if(!topRow){
	  					if(square[currentC][currentR].top){
	  						if(square[currentC][currentR-1].bottom == false){
	  							finished = false;
	  						}
	  					}
	  				}
	  				if(!rightCol){
	  					if(square[currentC][currentR].right){
	  						if(square[currentC+1][currentR].left == false){
	  							finished = false;
	  						}
	  					}
	  				}
	  				if(!bottomRow){
	  					if(square[currentC][currentR].bottom){
	  						if(square[currentC][currentR+1].top == false){
	  							finished = false;
	  						}
	  					}
	  				}
	  				if(!leftCol){
	  					if(square[currentC][currentR].left){
	  						if(square[currentC-1][currentR].right == false){
	  							finished = false;
	  						}
	  					}
	  				}
	  				currentC++;	
	  			}
	  			while(finished == true && currentC < gridSize);
	  			currentC = 0;
	  			currentR++;
  				
  			} 
  			while(finished == true && currentR < gridSize);
  			
  			if(finished)
  			{
  				return(true); //i.e. if all the squares are checked and none of them have unpaired vertices
  			}
  			else
  			{
  				return(false); //if at least one of the squares did not have all paired vertices
  			}
  		}
  	}

/*********** EXECUTES ON LOAD OF WINDOW **************/
	check = new CheckWin();
	ctrl = new ControlScreen();		
	ctrl.printHeader();
		
	xBox = 0, yBox = 0, widthBox = boardSize, heightBox = 70;
	ctx3.fillStyle = "red";
	ctx3.fillRect(xBox, yBox, widthBox, heightBox);
	/****** PROGRESS TRACKING *******/

	// Checks if there is previous progress in order to print the menu with the 'reset progress' option if necessary ***/
	var gameCookie = new ProgressCookie();
	gameCookie.checkCookie();

	/************** BUTTONS ****************/

		//alert(numberSizes);
		/** LEVEL BUTTONS **/
		var levelButton = new Array();
		for(var g = 0; g < numberSizes; g++){
			levelButton[g] = new Array();
			for(var h = 0; h < numberLevels; h++){
				levelButton[g][h] = new Button(h, (boardSize-distBetween)/6, true, false);
			}
		}
		/** SIZE BUTTONS **/
		var sizeButton = new Array();
		for(var i = 0; i < numberSizes; i++){
			sizeButton[i] = new Button(i, (boardSize-distBetween)/4, false, false);
		}

		sizeButton[0].select(true);

	//CREATING A TWO-DIMENSIONAL ARRAY, called square, which represents the squares on the board
	var square = new Array();
	for(var i = 0; i < 10; i++){
		square[i] = new Array();
	}

	//INITIALIZING THE ELEMENTS OF square
	for(var c=0; c<gridSize; c++){
		for(var r=0; r<gridSize; r++){
			square[c][r] = new Square(level[gridSize-3][levelToPlay-1][r*gridSize+c], c, r);
			/********* The complex stuff after level is used to determine which type of configuration the square should be
			based on the information above in 'LEVELS: ARRANGED.....' ******/
		}
	}



	if(mode == 3){
		ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth); //used to print the first screen (before the first click)
	}
	else if(mode == 1){
		ctrl.printMenu();
	}
	else{
		ctrl.printSettings();
	}
	//tutorial - http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/




	
	/********* PROGRESS TRACKING ***********/
	//sets previously completed levels to complete
	if(gameCookie.getString() != null && gameCookie.getString() != "" && gameCookie.getString() != "*"){
		gameCookie.progressFromCookie();
	}

/******* EVENT LISTENERS *******/


	/***** SETTINGS *****/
		//var prevMode;
		var settingsIcon = document.getElementById('settings');

		var sizeComplete;
		settingsIcon.onclick = function()
		{
			if(cookieFound){
	    		removeWelcome();
	    	}
			if(mode!=2){
				//prevMode = mode;
				changeMode(2);
				ctrl.printSettings();
				
			}
			else{
				//mode = prevMode;
				mode = 3;
				if(mode == 1){

				}
				else{
					if(!clickAllowed){
						//alert("line 1216; gamewon:"+gamewon);
						ctrl.reprint(squareNoColor, lineNoColor, lineNoWidth);
						allowClick(false);
					}
					else{
						ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth);
						allowClick(true);
					}
				}
			}
			confirm = false;
		}
		settingsIcon.onmouseover = function()
		{
			settingsIcon.src="gear4.png";
		}
		settingsIcon.onmouseout = function()
		{
			settingsIcon.src="gear.png";
		}


	/***** MENU *****/
		var menuIcon = document.getElementById('menu');
		menuIcon.onclick = function()
		{
			if(cookieFound){
	    		removeWelcome();
	    	}
			if(mode!=1){
				//prevMode = mode;
				ctrl.printMenu();
				changeMode(1);
			}
			else{
				//mode = prevMode;
				mode = 3;
				if(mode == 2){
				}
				else{
					if(!clickAllowed){
						//alert("line 1254");
						ctrl.reprint(squareNoColor, lineNoColor, lineNoWidth);
						allowClick(false);
					}
					else{
						ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth);
						allowClick(true);
					}
				}
			}
			confirm = false;
		}
		menuIcon.onmouseover = function()
		{
			menuIcon.src="menu3.png";
		}
		menuIcon.onmouseout = function()
		{
			menuIcon.src="menu4.png";
		}


	/***** RESTART *****/ //Also used for logo
		var restartIcon = document.getElementById('logo');
		restartIcon.onclick = function()
		{
			if(cookieFound){
	    		removeWelcome();
	    	}
			var allComplete = true;
			for(var i = 0; i<4; i++){
				if(!sizeButton[i].getComplete()){
					allComplete = false;
				}
			}
			if(allComplete){
				mode = 3;
				ctrl.changeGrid(10);
				ctrl.changeLevel(1);
				ctrl.changeValues();
				ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth); //reprints after the level changes		
			}

		}
		/*restartIcon.onmouseover = function()
		{
			if(bonusFinished){
				restartIcon.src="logo4.png";
			}
			else{
				restartIcon.src="logo5.png";
			}
		}
		restartIcon.onmouseout = function()
		{
			if(bonusFinished){
				restartIcon.src="logo5.png";
			}
			else{
				restartIcon.src="logo4.png";
			}
		}*/

		var confirm = false;
		var gameWon = false;
				


	/*** CANVAS CLICK ***/
		canvas.addEventListener("click", function(event) 
		{
	    	if(cookieFound){
	    		removeWelcome();
	    	}

	    	var mousePos = getMousePos(canvas, event);
	    	// canvas x is mousePos.x 
	    	// canvas y is mousePos.y

	    	switch(mode)
	    	{
		    case 1: //main menu
		    	//if the instructions button was clicked
		    	if((instructX<mousePos.x && mousePos.x<(instructX+instructW)) && (instructY<mousePos.y &&mousePos.y<(instructY+instructH)))
		    	{
			    	if(!confirm){	
			    		if(instructionsPrinted){
			    			ctrl.printMenu();
			    			instructionsPrinted = false;
			    		}
			    		else{	
			    			ctrl.printInstructions();
			    		}
			    	}
			    	else{ //confirm reset of all levels
			    		for(var g = 0; g<4; g++){
			    			for(var l = 0; l<24; l++){
			    				levelButton[g][l].complete(false, false, true);
			    			}
			    		}
			    		confirm = false;
			    		gameCookie.removeProgress();
			    		progressMade = false;
			    		bonusWon(false);
			    		ctrl.printMenu();
			    	}
		    	}
		    	else if((playX<mousePos.x && mousePos.x<(playX+playW)) && (playY<mousePos.y&& mousePos.y<(playY+playH)))
		    	{
			    	if(!confirm){	
			    		mode = 3;
			    		if(!clickAllowed){
							//alert("line 1355");
							ctrl.reprint(squareNoColor, lineNoColor, lineNoWidth);
							allowClick(false);
						}
						else{
							ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth);
							allowClick(true);
						}
					}
					else{ //canceling reset of levels
						ctrl.printMenu();
						confirm =false;
					}
		    	}
		    	else if((resetX<mousePos.x && mousePos.x<(resetX+resetW)) && (resetY<mousePos.y&& mousePos.y<(resetY+resetH)))
		    	{
			    	if(progressMade){
			    		ctrl.printConfirm();
			    		confirm = true;
			    	}
		    	}

		    	break; 
		    case 2: //settings
		    	//alert("settings");
		    	ctrl.clickButton(mousePos.x, mousePos.y);

		    	break;
		    case 3: //game
		    	if(clickAllowed){
			    	ctrl.clickSquare(mousePos.x, mousePos.y);
			    	gameWon = check.checkConnect();
			    	if(gameWon){
				    	if(gridSize != bonusSize)
				    	{	
				    		levelButton[gridSize-3][levelToPlay-1].complete(true, false, false);
				    		clickAllowed = false;
							//checks if a grid size is complete and sets the button accordingly
							for(var g = 0; g<4; g++){
				    			sizeComplete = true;
				    			for(var l = 0; l<getNumberLevels(g+3); l++){
				    				if(!levelButton[g][l].getComplete()){
										sizeComplete = false;
									}
				    			}
				    			sizeButton[g].complete(sizeComplete, false, true); //(size, from cookie, loop)
				    		}

				    		ctrl.reprint(squareNoColor, lineNoColor, lineNoWidth);
				    		//alert("line 1406");
				    		if(levelToPlay < getNumberLevels(gridSize)){
					    		//add delay (200ms)
					    		ctrl.congratulate(1,"Congratulations! You beat the level. Try level "+(levelToPlay+1)+"!","");
							}
							else{
								//add delay
								if(sizeButton[gridSize-3].getComplete()){
									ctrl.congratulate(2,"Congratulations! You have completed the "+gridSize+"x"+gridSize+" package.","Put your skills to the test and try "+(gridSize+1)+"x"+(gridSize+1)+"!");	
								}
								else{
									ctrl.congratulate(2,"Congratulations! You beat the level.  Click the settings","icon to finish levels from this package, or continue to "+(gridSize+1)+"x"+(gridSize+1)+"!");
								}
							}
						}
						else
						{
							bonusWon(true);
							ctrl.congratulate(3, "Congratulations! You beat the bonus level.","You are a Conecto master!");
							ctrl.reprint(squareNoColor, lineNoColor, lineNoWidth);
							//alert("line 1426");
							clickAllowed = false;
						}
			    	}
			    	break;
			    }
		    }


	  	}, false);


		notifyCanvas.addEventListener("click", function(event)
		{
			
			if(enterNeeded){
				//enterPressed = true;
				if(typeFinished == 1)
				{
					//change level
			    	levelToPlay++;
					ctrl.changeValues();
					ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth); //reprints after the level changes

				}	
				else
				{
					if(gridSize<=5){	
						//change grid size		
						ctrl.changeGrid(gridSize+1);
						ctrl.changeLevel(1);
						ctrl.changeValues();
						ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth);
					}
					else{
						ctrl.congratulate(3, "Congratulations! You have completed all levels!","More levels coming soon.");
					}

				}						
			}
			enterNeeded = false;
			confirm = false;
		}, false);
					
	/*** PRESS ENTER ***/
		window.addEventListener('keyup', function(e)
		{		
			if(enterNeeded){
				if(e.keyCode === 13){
					//enterPressed = true;
					if(typeFinished == 1)
					{
						//change level
				    	levelToPlay++;
						ctrl.changeValues();
						ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth); //reprints after the level changes
					}	
					else
					{
						if(gridSize<=5){	
							//change grid size		
							ctrl.changeGrid(gridSize+1);
							ctrl.changeLevel(1);
							ctrl.changeValues();
							ctrl.reprint(squareFillColor, lineFillColor, lineFillWidth);
						}
						else{
							ctrl.congratulate(3, "Congratulations! You have completed all levels!","More levels coming soon.");
						}
					}
				enterNeeded = false;
				confirm = false;						
				}
				
			}	
		}, false);
	//

	/*** CLOSE WINDOW **/ //save progress in a cookie
	window.onbeforeunload = function(){
  		gameCookie.setCookie(cPname, cDuration);
		//alert("saving cookie: ");
   		return null;
	}
};






//NOTHING PAST HERE