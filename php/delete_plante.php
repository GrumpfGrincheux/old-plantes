<?php 


$plante = $_GET;
echo $plante;
$id = $plante["id"];
echo $i;

$sql = "DELETE FROM plantes WHERE id = $id";
echo $sql;

$mysqli = new mysqli("localhost", "root", "root", "Plantes");
$mysqli->query($sql);