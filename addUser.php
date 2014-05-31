<html>
<body>

Welcome <?php echo $_POST["username"]; ?><br>
Your email address is: <?php echo $_POST["password1"]; ?>

</body>
</html>


<?php  
    // connect using host, username, password and databasename
    $link = mysqli_connect('localhost', 'movin', 'movin-2012','movin');
    echo 'Current PHP version: ' . phpversion();
	//check connection 
	if (mysqli_connect_errno()) {
    	printf("Connect failed: %s\n", mysqli_connect_error());
    	exit();
	}

    // escape variables for security
    $username = mysqli_real_escape_string($link, $_POST['username']);
    $password1 = mysqli_real_escape_string($link, $_POST['password1']);
    $password2 = mysqli_real_escape_string($link, $_POST['password2']);

    if ($password1 == $password2){
        echo "right password.";
         $sql="INSERT INTO Table_Users (Name, Password)
        VALUES ('$username', '$password1')";

        if (!mysqli_query($link,$sql)) {
            die('Error: ' . mysqli_error($link));
        }
        echo "1 record added";
    }

   else{
    ?> <h1> hej </h1> <?php
   }


    mysqli_close($link);
?>