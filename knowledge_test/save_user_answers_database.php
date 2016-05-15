<?php
function write_result ($personID,$group,$total_score,$computer_score,$internet_score,$office_score) {
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
   
    
  if ($save_test_to_teacher = $conn->prepare("UPDATE xxx SET gesamtpunktzahl=?,internetpunkte=?,officepunkte=?,computerpunkte=? WHERE id=?"))
  {
   // Bind the variables to the parameter as strings. 
      $save_test_to_teacher->bind_param("iiiiii", $total_score,$internet_score,$office_score,$computer_score,$group,$personID);
      // Execute the statement.
      $save_test_to_teacher->execute();                          
      // Close the prepared statement.
      $save_test_to_teacher->close();
  }
  
  $conn->close();
       
}
   

   

$personID = $_POST['personID'];
$total_score = $_POST['total_score'];
$computer_score = $_POST['computer_score'];
$internet_score = $_POST['internet_score'];
$office_score = $_POST['office_score'];


write_result($personID,$group,$total_score,$computer_score,$internet_score,$office_score);
   
   

   
?>