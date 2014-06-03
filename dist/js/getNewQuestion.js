 function newQuestion() {

     var cookie = document.cookie;
     console.log("cookie: " + cookie);
     var nQuestions = getCookie("nQuestions");
     console.log("nQuestions: " + nQuestions);
     // var questionsAsked = getCookie("QuestionsAsked");
     // console.log("questionsAsked" + questionsAsked);
     document.cookie = "username=John Smith; expires=Thu, 18 Dec 2016 12:00:00 GMT; path=/";

     var number = 3;
     // var rights = rightNumber;
     // console.log("rights: " + rights);
     // console.log("typ: " + typeof(rights));

     if (nQuestions < 4) {
         var jsonObj = "Loading question";
         var xmlhttp = new XMLHttpRequest();

         xmlhttp.onreadystatechange = function() {
             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                 jsonObj = JSON.parse(xmlhttp.responseText);
                 // jsonObj = {
                 //     Type: "GuessYear",
                 //     QId: "2",
                 //     Correct: "1988",
                 //     QText: "Which year is Björnen born?",
                 //     QImage: "bjorn.jpg"
                 // }
                 console.log(jsonObj);
                 if (jsonObj.Type == "GuessYear") {
                     guessYearQuestion(jsonObj);
                 } else if (jsonObj.Type == "MCQ") {
                     mcQuestion(jsonObj);
                 } else {
                     element = $("#question").append("div").html("<h1> No question matched. </h1>");
                 }

             }
         }
         var element = $("#question").append("div").html("<h1> id =" + jsonObj + "</h1>");
         xmlhttp.open("GET", "getQuestion.php");
         xmlhttp.send();
     } else {
         alert("hej");

         var obj = [{
                 QText: "Vem heter Fransson i efternamn?",
                 Correct: "Christopher",
                 Right: true
         },
             {
                 QText: "Är det sommarlov snart?",
                 Correct: "Ja",
                 Right: false
         }];

         var username = getCookie("username");
         console.log(username);
         var htmlstr = "";

         for (o in obj) {
             var result;
             var resultcolor;
             if (obj[o].Right == true) {
                 result = "Right";
                 resultcolor = "green";
                 //$(".result").css("color", "yellow");
             } else {
                 result = "Wrong";
                 resultcolor = "red";
                 // $(".result").css("color", "red");
             }

             var n = o;
             n++;

             htmlstr = htmlstr + "<tr><td>" + n + "</td><td>" + obj[o].QText + "</td><td>" + obj[o].Correct + "</td><td style='color:" + resultcolor + "'>" + result + "</td></tr>";
             console.log("htmlstr" + htmlstr);
         }

         var element = $("#question").html("<br/><div class='panel panel-default'><div class='panel-heading'>Results</div><div class='panel-body'>" +
             "<p>Well played " + username + "! Here are your results:</p></div>" +
             "<table class='table'><thead><tr><th> # </th><th> Question </th><th> Correct answer </th><th> Your result </th></tr></thead>" +
             "<tbody>" + htmlstr +
             "</tbody></table></div></div>");
     }

 }