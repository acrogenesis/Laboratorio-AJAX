<?php
require 'config.php';

$id = $_REQUEST["id"];

mysqli_query($con,"DELETE FROM registrados WHERE id=$id");

mysqli_close($con);

?>
