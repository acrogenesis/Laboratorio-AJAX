<!DOCTYPE html">
<?php require 'config.php'; ?>
<html>
<head>
	<meta http-equiv="Content-Type" content="utf-8" />

	<title>Modificación "en línea" desde una página web</title>

	<link rel="StyleSheet" type="text/css" href="tabla.css"/>
	<script type="text/javascript" src="modificacion.js"></script>

</head>

<body>
	<h1>Lista de usuarios</h1>


	<table id="tabla-usuarios">
		<tr>
			<th>Nombre</th>
			<th>Apellido</th>
			<th>Dirección</th>
			<th>Código Postal</th>
			<th>Ciudad</th>
			<th>Hijos</th>
			<th>Email</th>
			<th>Borrar</th>

		</tr>
		<?php
			while ($row = mysqli_fetch_array($result)) {
				echo "<tr>";
				echo "<td id='nombre-" . $row["id"] . "' class='celda' ondblclick='modificar(this)'>" . $row["nombre"] . "</td>";
				echo "<td id='apellido-" . $row["id"] . "' class='celda' ondblclick='modificar(this)'>" . $row["apellido"] . "</td>";
				echo "<td id='direccion-" . $row["id"] . "' class='celda' ondblclick='modificar(this)'>" . $row["direccion"] . "</td>";
				echo "<td id='codigo-" . $row["id"] . "' class='celda' ondblclick='modificar(this)'>" . $row["codigo"] . "</td>";
				echo "<td id='ciudad-" . $row["id"] . "' class='celda' ondblclick='modificar(this)'>" . $row["ciudad"] . "</td>";
				echo "<td id='hijos-" . $row["id"] . "' class='celda' ondblclick='modificar(this)'>" . $row["hijos"] . "</td>";
				echo "<td id='email-" . $row["id"] . "' class='celda' ondblclick='modificar(this)'>" . $row["email"] . "</td>";
				echo "<td class='celda'><button onclick='borrar(" . $row["id"] .")'>Borrar</button></td>";
				echo "</tr>";
			}
		 ?>
	</table>
	<button onclick="insertRow()">Insertar fila</button>
<?php mysqli_close($con); ?>
</body>
</html>
