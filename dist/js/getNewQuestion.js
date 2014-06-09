 function newQuestion() {

     var cookie = document.cookie;
     //console.log("cookie: " + cookie);
     var nQuestions = getCookie("nQuestions"); //Number of questions
     console.log("nQuestions: " + nQuestions);
     //document.cookie = "username=John Smith; expires=Thu, 18 Dec 2016 12:00:00 GMT; path=/";
     var questions = [];

     var number = 3;


     if (nQuestions < 10) {
         var jsonObj = "Loading question";
         var xmlhttp = new XMLHttpRequest();

         xmlhttp.onreadystatechange = function() {
             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                 jsonObj = JSON.parse(xmlhttp.responseText);

                 if (jsonObj.Type == "GuessYear") {
                     guessYearQuestion(jsonObj);
                 } else if (jsonObj.Type == "MCQ") {
                     mcQuestion(jsonObj);
                 } else if (jsonObj.Type == "Freetext") {
                     textQuestion(jsonObj);
                 } else {
                     element = $("#question").append("div").html("<h1> No question matched. </h1>");
                 }

             }
         }
         var element = $("#question").append("div").html("<h1> id =" + jsonObj + "</h1>");
         xmlhttp.open("GET", "getQuestion.php");
         xmlhttp.send();
     }

     // If the game is over:
     else {

         //Load in the json object with all asked questions from db:
         var xmlhttp = new XMLHttpRequest();
         var obj;
         xmlhttp.onreadystatechange = function() {
             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                 obj = JSON.parse(xmlhttp.responseText); //obj cointains objects, but those objects contains strings.

                 for (o in obj) {
                     var q = JSON.parse(obj[o]); //We make each inner object a json object.
                     questions.push(q); //These are added to the list 'questions'.
                 }

                 //We get the username from the cookie and store it in 'username':
                 var username = getCookie("username");
                 console.log(username);
                 var htmlstr = "";


                 //We iterate over each question in the question-list and create the html for it:
                 for (q in questions) {
                     var result;
                     var resultcolor;
                     if (questions[q].Right == true) {
                         //For the right answers, we want the color to be green
                         result = "Right";
                         resultcolor = "green";
                     } else {
                         //For the wrong answers, we want the color to be red
                         result = "Wrong";
                         resultcolor = "red";
                     }

                     //n is a counter to write out the corresponding number before each question in the table.
                     var n = q;
                     n++;

                     //We build on the htmlstr:
                     htmlstr = htmlstr + "<tr><td>" + n + "</td><td>" + questions[q].QText + "</td><td>" + questions[q].Correct + "</td><td style='color:" + resultcolor + "'>" + result + "</td></tr>";
                 }

                 //Finally all html is added to the #question-div:
                 var element = $("#question").html("<br/><div class='panel panel-default'><div class='panel-heading'>Results</div><div class='panel-body'>" +
                     "<p>Well played " + username + "! Here are your results:</p></div>" +
                     "<table class='table'><thead><tr><th> # </th><th> Question </th><th> Correct answer </th><th> Your result </th></tr></thead>" +
                     "<tbody>" + htmlstr +
                     "</tbody></table></div></div>");
             }
         }

         xmlhttp.open("GET", "quizScore.php");
         xmlhttp.send();

     }

 }