<?php
function write_result ($test_date,$personID) {
  $db_host = "xxx";
  $db_user = "xxx";
  $db_passwort = "xxx";
  $db_name = "xxx";
  
  // Create connection
  $conn = new mysqli($db_host,$db_user,$db_passwort,$db_name);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } 
   
    
  if ($save_test_to_teacher = $conn->prepare("UPDATE xxx SET last_test_date=? WHERE id=?"))
  {
   // Bind the variables to the parameter as strings. 
      $save_test_to_teacher->bind_param("ii", $test_date,$personID);
      // Execute the statement.
      $save_test_to_teacher->execute();                          
      // Close the prepared statement.
      $save_test_to_teacher->close();
  }
  
  $conn->close();
       
}
   

   

$personID = $_POST['personID'];
$test_date = $_POST['test_date'];


write_result($test_date,$personID);
   
   

   
?>