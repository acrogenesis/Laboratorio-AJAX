<?php
require 'config.php';

mysqli_query($con,
  "INSERT INTO registrados (nombre, apellido, direccion, codigo, ciudad, hijos, email)
VALUES ('nombre', 'apellido', 'direccion', 'codigo', 'ciudad', 0, 'email')");

mysqli_close($con);

?>
