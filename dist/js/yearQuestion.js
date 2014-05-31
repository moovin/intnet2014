function guessYearQuestion(jsonObj, questionNumber) {
    var imageURL = "'" + "dist/img/" + jsonObj.QImage + "'";
    element = $("#question").append("div").html(
        "<div class='row'>" +
        "<div class='col-md-1'>" +
        "</div>" +
        "<div class='col-md-5'>" +
        "<h1> Question " + questionNumber + "</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-1'>" +
        "</div>" +
        "<div class='col-md-5'>" +
        "<p id='qText'>" +
        jsonObj.QText + "</p>" +
        "<div class=multipleChoice>" +
        "<input id='answer' type='number' name='quantity' min='1900' max='2050'>" +
        "</div>" +
        "<input id='submitAnswer' type='submit'>" +
        "</div>" +
        "<div class='col-md-6'>" +
        "<img class='qimg' src=" + imageURL + ">" +
        "</div>" +
        "</div>"
    );

    $("#submitAnswer").click(function(jsonObj) {
        //Save the users answer to the variable answer. This is a string (like "1988"). 
        var answer = $("#answer")[0].value;
        // Compare the answer to the correct answer.
        if (answer == jsonObj.Correct) {
            alert("rätt!");
        } else {
            alert("fel");
        }
        window.location.reload(); //reload the page again and get a new question. 
    });
};