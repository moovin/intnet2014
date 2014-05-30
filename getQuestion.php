<?php  
    // connect using host, username, password and databasename
    $link = mysqli_connect('localhost', 'movin', 'movin-2012','movin');

	//check connection 
	if (mysqli_connect_errno()) {
    	printf("Connect failed: %s\n", mysqli_connect_error());
    	exit();
	}
    
    // The SQL query
    $query = "SELECT Correct,QId FROM Table_GuessYear WHERE QId='1'";

    // Execute the query
	if (($result = mysqli_query($link,$query)) == FALSE) {
       	printf("Query failed: %s\n",  $query);
	}
       $returnArray=array();
    // Loop over the resulting lines
    	while ($line = $result->fetch_object()) {
    // Store results from each row in variables
        $correct = $line->Correct;
        $QId = $line->QId;
        // Store the result we want by appending strings to the variable $returnstring
        $returnArray["Correct"]=$correct;
        $returnArray["QId"]=$QId;
    	}
    
    $returnJson =json_encode($returnArray);
    
    // Free result and just in case encode result to utf8 before returning
    mysqli_free_result($result);
    echo($returnJson); 
    ?>