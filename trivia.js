$(document).ready(function() {
    // Handler for .ready() called.
    console.log('Game is running!!');
    displayCurrentQuestion();

    $('#resetButton').on("click", function() {
        restart();
    })

});

// Game Variables
var timesWon = 0;
var timesLost = 0;
var triviaUnaswered = 0;
var trivia;
var triviaIndex = 0;

// Restart the game
function restart() {
    timesWon = 0;
    timesLost = 0;
    triviaUnaswered = 0;
    triviaIndex = 0;
    $('.wins').remove();
    $('.lose').remove();
    $('.unAns').remove();
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    var currentQuestion = trivia[triviaIndex].question;
    //display the current question
    $(".current-question").text(currentQuestion);
    //clear answers
    $(".possible-answers").empty();
    var answer;
    var $possibleAnswers = $(".possible-answers")

    for (var i = 0; i < trivia[triviaIndex].possibleAnswers.length; i++) {
        answer = trivia[triviaIndex].possibleAnswers[i];
        $('<a class="possibleAnswer">' + answer + '</a>').appendTo($possibleAnswers)
    }
    checkClickValue();
}

function checkClickValue() {
    $('.possibleAnswer').on("click", function() {
        checkSelected(this.textContent);
    })
}


//checks the user's clicked answer
function checkSelected(answerClicked) {

    if (trivia[triviaIndex].correctAnswer === answerClicked.trim()) {
        timesWon++;
        var resetWinLose = setTimeout(resetWL, 1000);
    } else if (answerClicked === "") {
        //markdown of unanswered questions
        triviaUnaswered++;
        var resetWinLose = setTimeout(resetWL, 1000);
    } else {
        timesLost++;
        var resetWinLose = setTimeout(resetWL, 1000);
    }
}

function resetWL() {
    triviaIndex++;
    if (triviaIndex > trivia.length - 1) {
        outputStats();
    } else {
        displayCurrentQuestion();
    }
}

// Display Game State
function outputStats() {
    var winText = '<h3>Correct answers = '+timesWon+'</h3>';
    var loseText = "Wrong answers = " + timesLost;
    var unanswerText = "Unanswered questions = " + triviaUnaswered;
    $('#winLose').append("<div>" + winText + "</div>");
    $('#winLose').append("<div>" + loseText + "</div>");
    $('#winLose').append("<div>" + unanswerText + "</div>")
}


var trivia = [{
    question: "What is the name of Doctor Who's home planet?",
    possibleAnswers: ["Earth",
        "Adipose",
        "Gallifrey",
        "Vulcan"
    ],
    correctAnswer: "Gallifrey",
}, {
    question: "Where does Doctor Who meet Martha Jones?",
    possibleAnswers: ["In a Hospital",
        "Walking down the street",
        "At the mall",
        "Bonooru"
    ],
    correctAnswer: "Walking down the street"
}, {
    question: "What part of his body does the Doctor keep in a jar on the Tardis?",
    possibleAnswers: ["Left Ear",
        "Hand",
        "Nose",
        "Right Foot"
    ],
    correctAnswer: "Hand"
}, {
    question: "What color is the Tardis?",
    possibleAnswers: ["Purple",
        "Gallifrey Orange",
        "Blue",
        "Silver"
    ],
    correctAnswer: "Blue"
}, {
    question: "What is broken in the TARDIS that prevents it from blending in to any and every place",
    possibleAnswers: ["The chameleon circuit",
        "The quantum alternator",
        "The timey-wimey exhaust",
        "The particle matrix"
    ],
    correctAnswer: "The chameleon circuit"
}, {
    question: "What is the Shadow Proclomation?",
    possibleAnswers: ["Dalek's plan to kill the doctor",
        "Intergalactic police",
        "Last planet at the end of the universe",
        "Timelord law book"
    ],
    correctAnswer: "Intergalactic police"
}, {
    question: "The doctor loves to eat fish fingers and?",
    possibleAnswers: ["Tartar sauce",
        "Custard",
        "Pudding",
        "Sriracha"
    ],
    correctAnswer: "Custard"
}];
