<?php  
	

	// 	randomize the type of question we will be asking from the database.
	$typesArray=array("GuessYear","MCQ");
	shuffle($typesArray);
	$type=$typesArray[0];
 	$returnArray=array();
 	
	// connect using host, username, password and databasename
    $link = mysqli_connect('localhost', 'movin', 'movin-2012','movin');

	//check connection 
	if (mysqli_connect_errno()) {
    	printf("Connect failed: %s\n", mysqli_connect_error());
    	exit();
	}
    
	
// 	//Check if there's an ongoing session for this user.
// 	if(isset($_COOKIE['QuestionsAsked']) {
// 		for i in $_COOKIE["nQuestions"]{
			
// 		}
// 	}	
	
// 	//If not, create a cookie for this user.
// 	setcookie("QuestionsAsked", "", time()+360);
// 	setcookie("nQuestions", 0, time()+360);
	
	
	//if the randomed type is a Multiple Choice Question
	if ($type=="MCQ") {
		$query = "SELECT * FROM Table_MCQ ORDER BY RAND() LIMIT 1";
	
		// Execute the query
		if (($result = mysqli_query($link,$query)) == FALSE) {
			printf("Query failed: %s\n",  $query);
		}
		// Loop over the resulting lines
		while ($line = $result->fetch_object()) {
			// Store results from each row in variables
	
			$returnArray["Correct"]=$line->Correct;
			$returnArray["QId"]=$line->QId;
			$returnArray["QImage"]=$line->QImage;
			$returnArray["Alt1"]=$line->Alt1;
			$returnArray["Alt2"]=$line->Alt2;
			$returnArray["Alt3"]=$line->Alt3;
			$returnArray["Alt4"]=$line->Alt4;
			$returnArray["QText"]=$line->QText;
			$returnArray["Type"]="MCQ";
		}
	} elseif ($type=="GuessYear") {

		// The SQL query
    	$query = "SELECT * FROM Table_GuessYear ORDER BY RAND() LIMIT 1";

	    // 	Execute the query
		if (($result = mysqli_query($link,$query)) == FALSE) {
    	   	printf("Query failed: %s\n",  $query);
			}
       
	    // 	Loop over the resulting lines
    	while ($line = $result->fetch_object()) {
	        // Store the result we want by appending strings to the variable $returnstring
	        $returnArray["Correct"]=$line->Correct;
	        $returnArray["QId"]=$line->QId;
	        $returnArray["QImage"]=$line->QImage;
	        $returnArray["QText"]=$line->QText;
	        $returnArray["Type"]="GuessYear";
    		}
 		} else{
 			$returnArray["Type"]=$type;
 		}
 	
 		
	//	Make the array into a JSON object
	$returnJson =json_encode($returnArray);
	// 	Free result and return
	mysqli_free_result($result);
	echo($returnJson);
	
	// Update the user's cookie so that the question will be added to
	
	//If the number of questions are 10, delete the cookie.
	
	
	
    ?>