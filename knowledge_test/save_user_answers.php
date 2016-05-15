<?php
   $json = $_POST['json'];
   $personID = $_POST['personID'];
   if (json_decode($json) != null) { /* sanity check */
     $file = fopen(__DIR__ . '/user_answers/'.$personID.'_user_answers.json','a');//hier war ein w+
     fwrite($file, $json);
     fclose($file);
   } else {
     // handle error 
   }
?>