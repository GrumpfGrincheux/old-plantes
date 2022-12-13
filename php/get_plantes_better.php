<?php

$mysqli = new mysqli("localhost", "root", "root", "plantes");
$familles = $mysqli->query("SELECT * FROM familles");
foreach ($familles as $row) {
  print_r($row);
}
$genres = $mysqli->query("SELECT * FROM genres");
foreach ($genres as $row) {
  print_r($row);
}
$especes = $mysqli->query("SELECT * FROM especes");
foreach ($especes as $row) {
  print_r($row);
}
$plantes = $mysqli->query("SELECT * FROM plantes");
foreach ($plantes as $row) {
  print_r($row);
}
$varietes = $mysqli->query("SELECT * FROM varietes");
foreach ($varietes as $row) {
  print_r($row);
}