<?php
    ob_start(); // Initiate the output buffer
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Music Quiz</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="dist/css/style.css" rel="stylesheet">

     <!-- Custom styles for this template -->
    <link href="dist/css/carousel.css" rel="stylesheet">

    
  </head>
  <body>
    
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
  		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    		<ul class="nav navbar-nav">
      			<li><a href="index.html"><span class="glyphicon glyphicon-home"></span></a></li>
                <li><a href="#logIn">Log in</a></li>
      			<li><a href="createAccount.html">Create Account</a></li>
    		</ul>
	</nav>


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
    $password = mysqli_real_escape_string($link, $_POST['password']);
    $returnArray=array();

    $query = "SELECT * 
        FROM  `Table_Users` 
        WHERE Name =  '$username'
        AND PASSWORD =  '$password'";

    if (($result = mysqli_query($link,$query)) == FALSE) {
      printf("Query failed: %s\n",  $query);
    }

      $count=mysqli_num_rows($result);
      //echo $count;
       if($count==1){
          $line = $result->fetch_object();
          $userId=$line->UserId;
          setcookie("username", $username);
          echo $userId;
          echo "<div id='sucess' class='pages'>
                <br />
                    <div class= pagetext>
                        <h2> Welcome " . $username . ", you are successfully logged in. </h2>
                         <br />
                        <a href='quiz.html'> <button type='button' class='btn btn-default btn-lg'>
                            <span class='glyphicon glyphicon-headphones'></span> Start!
                        </button> </a>
                    </div>
                </div>";
       }
       else{
        echo "wrong username or password";
        echo "<div id='error' class='pages'>
                <div class= pagetext>
                    <h3> Wrong username or password. Please try again. </h3> 
                    <br />
                    <a href='logIn.html'><button class='btn'> Log in </button> </a> <a href='createAccount.html'><button class='btn'> Create new account </button> </a>
                </div>
            </div>";
       }

      /* free result set */
      mysqli_free_result($result);?> 
    <?php
    mysqli_close($link);
?>
</body></html>
<?php
    ob_end_flush(); // Flush the output from the buffer
?>