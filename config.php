<?php
$con=mysqli_connect("127.0.0.1","root","root","usuarios");
// Check connection
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
$sql="SELECT * FROM registrados";
$result=mysqli_query($con,$sql)
?>
