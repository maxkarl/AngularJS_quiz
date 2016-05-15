<?php
   $personID = $_POST['personID'];
   $test_length_feedback = $_POST['test_length_feedback'];
   $test_level_feedback = $_POST['test_level_feedback'];
   $text='{ "personID" : '.$personID.', "test_length_feedback" : '.$test_length_feedback.', "test_level_feedback" : '.$test_level_feedback.'},';
   $file = fopen(__DIR__ . '/user_feedback/'.$personID.'_user_feedback.json','a');
   fwrite($file, $text);
   fclose($file);
   
     

?>