<?php
include("databaseConnection.php");

//You should also perform a user-check here to prevent unathorized access.
if (isset($_POST)) {
  $id = mysql_real_escape_string($_POST['id']);
  $classes = mysql_real_escape_string($_POST['classes']);
  $new_content = mysql_real_escape_string($_POST['content']);
 
  $query = "UPDATE table_name SET column_name = '".$new_content."' WHERE id = '.$id.'";
  mysql_query($query) or die(mysql_error());
  
  //The save was successful
  echo json_encode(array());

  //The save was unsuccessful
  //echo json_encode(array("error" => "This is where the error message should be which will be displayed to the user."));
}
?>