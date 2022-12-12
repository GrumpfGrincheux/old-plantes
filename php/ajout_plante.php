<?php 

  $plante = $_POST;

  $nom = $plante["nom"];
  $genre = $plante["genre"];
  $espece = $plante["espece"];
  $famille = $plante["famille"];

  $famille_sql = "INSERT INTO familles(famille) VALUES ('$famille')";

  
  $msqli = new mysqli("localhost", "root", "root", "plantes");
  
  $res_famille = $msqli -> query($famille_sql);

  if ($res_famille) {
    $famille_id = $msqli -> insert_id;
    $genre_sql = "INSERT INTO genres(genre, famille_id) VALUES ('$genre', '$famille_id')";
    $res_genre = $msqli -> query($genre_sql);

    if ($res_genre) {
      $genre_id = $msqli -> insert_id;
      $espece_sql = "INSERT INTO especes(espece, genre_id, famille_id) VALUES ('$espece', '$genre_id', '$famille_id')";
      $res_espece = $msqli -> query($espece_sql);

      if ($res_espece) {
        $espece_id = $msqli -> insert_id;
        $nom_sql = "INSERT INTO plantes(nom, espece_id, genre_id, famille_id) VALUES ('$nom', '$espece_id', '$genre_id', '$famille_id')";
        $res_plante = $msqli -> query($nom_sql);
      }
    }
  }