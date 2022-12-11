<?php 
  $plante = $_POST;

  $id = $plante["id"];
  $nom = $plante["nom"];
  $genre = $plante["genre"];
  $espece = $plante["espece"];
  $famille = $plante["famille"];

  $sql = "INSERT INTO `plantes`(`nom`, `genre`, `espece`, `famille`, `id`) 
          VALUES ('$nom', '$genre', '$espece', '$famille', '$id');";

  $mysqli = new mysqli("localhost", "root", "root", "Plantes");
  $mysqli -> query($sql);