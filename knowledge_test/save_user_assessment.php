<?php
   $personID = $_POST['personID'];
   $test_computer_assessment = $_POST['test_computer_assessment'];
   $test_online_assessment = $_POST['test_online_assessment'];
   $test_office_assessment = $_POST['test_office_assessment'];
   $test_computer_assessment_prozedural = $_POST['test_computer_assessment_prozedural'];
   $test_online_assessment_prozedural = $_POST['test_online_assessment_prozedural'];
   $test_office_assessment_prozedural = $_POST['test_office_assessment_prozedural'];
   $test_assessment_assessment = $_POST['test_assessment_assessment'];
   $text='{ "personID" : '.$personID.', "test_computer_assessment" : '.$test_computer_assessment.', "test_online_assessment" : '.$test_online_assessment.', "test_office_assessment" : '.$test_office_assessment.', "test_computer_assessment_prozedural" : '.$test_computer_assessment_prozedural.', "test_online_assessment_prozedural" : '.$test_online_assessment_prozedural.', "test_office_assessment_prozedural" : '.$test_office_assessment_prozedural.', "test_assessment_assessment" : '.$test_assessment_assessment.'},';
   $file = fopen(__DIR__ . '/user_answers/'.$personID.'_user_assessment.json','a');
   fwrite($file, $text);
   fclose($file);
   
     

?>