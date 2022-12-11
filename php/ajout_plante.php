<?php 
  $plante = $_POST;

  $id = $plante["id"];
  echo($id);
  $nom = $plante["nom"];
  echo($nom);
  $genre = $plante["genre"];
  echo($genre);
  $espece = $plante["espece"];
  echo($espece);
  $famille = $plante["famille"];
  echo($famille);

  $sql = "INSERT INTO `plantes`(`nom`, `genre`, `espece`, `famille`, `id`) 
          VALUES ('$nom', '$genre', '$espece', '$famille', '$id');";
  

  $mysqli = new mysqli("localhost", "root", "root", "Plantes");
  $mysqli -> query($sql);