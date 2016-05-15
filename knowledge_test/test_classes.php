<?php

    

class Teacher {
  public $personID;
  public $last_test_date;
  private $db_host = "xxx";
  private $db_user = "xxx";
  private $db_passwort = "xxx";
  private $db_name = "xxx";
  private $username;
    
  function get_values() {
    
    $this->username = $_SESSION["username"];
    // Create connection
    $conn = new mysqli($this->db_host,$this->db_user,$this->db_passwort,$this->db_name);

    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    //echo '<h1>'.$this->username.'</h1>';
    $sql = "SELECT id, last_test_date, last_test_group FROM lehrer WHERE email = '".$this->username."'";
    $result = $conn->query($sql); 
    $profile = $result->fetch_assoc();
   
    $this->personID = $profile['id'];
    $this->last_test_date = $profile['last_test_date'];
    
    $sql1 = "SELECT COUNT(*) AS group_one FROM lehrer WHERE last_test_group=1";
    $result1 = $conn->query($sql1); 
    $count1 = $result1->fetch_assoc();
    
    $group_one = $count1['group_one'];
    
    $sql2 = "SELECT COUNT(*) AS group_two FROM lehrer WHERE last_test_group=2";
    $result2 = $conn->query($sql2); 
    $count2 = $result2->fetch_assoc();
    
    $group_two = $count2['group_two'];
    
    if($group_one<$group_two){
      $group=1;
    }else{
      $group=2;
    }
    
    $this->group = $group;
    
    $conn->close();
  }
}
  




class Test {
  public $test_date;
 
  function get_test_values (){
    $this->test_date = time(); 
  }
  
}



?>