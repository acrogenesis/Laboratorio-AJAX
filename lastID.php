<?php
require 'config.php';

$r= mysqli_query($con,
  "SELECT id
  FROM registrados
  ORDER BY id DESC LIMIT 1");

  echo mysqli_fetch_array($r)[0];

mysqli_close($con);

?>
