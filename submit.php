<?php
require 'config.php';

$arr =  explode("-",$_REQUEST['key']);
$value = $_REQUEST['value'];

file_put_contents("prueba.txt", $arr[0]." " . $arr[1]." " . $value );
mysqli_query($con,
  "UPDATE registrados SET $arr[0]='$value'
  WHERE id=$arr[1]"
);

mysqli_close($con);

?>
