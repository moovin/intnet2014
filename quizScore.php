<?php  
		$jsonArray = array();
		$i = 0;
		$questionsAsked = stripslashes($_COOKIE['questionsAsked']);
		$rightIds = stripslashes($_COOKIE['rightIds']);
		$questionsAsked = str_replace(",", "",$questionsAsked);
		$Tables = array('Y' => 'Table_GuessYear',
				'M'=> 'Table_MCQ');
		// connect using host, username, password and databasename
		$link = mysqli_connect('localhost', 'movin', 'movin-2012','movin');
			
		//check connection
		if (mysqli_connect_errno()) {
			printf("Connect failed: %s\n", mysqli_connect_error());
			exit();
		}
		
		while (empty($questionsAsked)==FALSE) {
			
			//echo 'substr: ' . substr($questionsAsked, 3,1);
			if (substr($questionsAsked, 3,1)=="'"){
				//if the id is made with a number under 10.
				$id = substr($questionsAsked, 0,4);
				$tableKey=substr($id, 1,1);
			}
			else{
				//if the id is made with a number with two numbers (over 10).
				$id = substr($questionsAsked, 0,5);
				$tableKey=substr($id, 1,2);
			}
			$array = array();
			
			// The SQL query
			$query = 'SELECT QId, QText, Correct FROM ' . $Tables[$tableKey] . ' WHERE QId = ' . $id;
			// 	Execute the query
			if (($result = mysqli_query($link,$query)) == FALSE) {
				printf("Query failed: %s\n",  $query);
			}
			 
			// 	Loop over the resulting lines
			while ($line = $result->fetch_object()) {
				// Store the result we want by appending strings to the variable $returnstring
				
				//put stuff in a json object
				$array["QText"]=$line->QText;
				$array["QId"]=$line->QId;
				$array["Correct"]=$line->Correct;
			}
				//an if statement that checks if the question was answered correctly, that is if the QId is in the rightIDs cookie
				if (strpos($rightIds,str_replace("'", "",$id))) {
					$array["Right"]=True;
				}
				else {
					$array["Right"]=False;
				}
				
				//make array into Json object
				$json = json_encode($array);
				//put the finished JSON object in an array
				$jsonArray[$i]=$json;
				$i++;
				//strip the questionsAsked of the last QId
				$questionsAsked=substr($questionsAsked, 4);
			
			}
		
 		echo $returnJson =json_encode($jsonArray);
 		//echo $jsonArray;
?>