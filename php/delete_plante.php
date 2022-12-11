<?php 

$id = $_POST["id"];

$sql = "DELETE FROM plantes WHERE id = $id";

$mysqli = new mysqli("localhost", "root", "root", "Plantes");
$mysqli->query($sql);