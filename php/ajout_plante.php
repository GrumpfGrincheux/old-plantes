<?php

$mysqli = new mysqli("localhost", "root", "root", "plantes");

$plante = $_POST;

$nom = $plante["nom"];
$genre = $plante["genre"];
$espece = $plante["espece"];
$famille = $plante["famille"];

$is_famille = $mysqli->query("SELECT * FROM familles WHERE famille = '$famille'");
if ($is_famille->num_rows == 1) {
  $row = $is_famille->fetch_assoc();
  $famille_id = $row["id"];
  echo "Cette famille existe déja !";
} else {
  $famille_sql = "INSERT INTO familles(famille) VALUES ('$famille')";
  $res_famille = $mysqli->query($famille_sql);
  echo "La famille a bien été ajoutée à la base de données";
  $famille_id = $mysqli->insert_id;
}

$is_genre = $mysqli->query("SELECT id FROM genres WHERE genre = '$genre'");
if ($is_genre->num_rows == 1) {
  $row = $is_genre->fetch_assoc();
  $genre_id = $row["id"];
  echo "Ce genre existe déja !";
} else {
  $genre_sql = "INSERT INTO genres(genre, famille_id) VALUES ('$genre', '$famille_id')";
  $res_genre = $mysqli->query($genre_sql);
  echo "Le genre a bien été ajouté à la base de données";
  $genre_id = $mysqli->insert_id;
}

$is_espece = $mysqli->query("SELECT id FROM especes WHERE espece = '$espece'");
if ($is_espece->num_rows == 1) {
  $row = $is_espece->fetch_assoc();
  $espece_id = $row["id"];
  echo "Cette espèce existe déja !";
} else {
  $espece_sql = "INSERT INTO especes(espece, genre_id, famille_id) VALUES ('$espece', '$genre_id', '$famille_id')";
  $res_espece = $mysqli->query($espece_sql);
  echo "L'espèce a bien été ajoutée à la base de données";
  $espece_id = $mysqli->insert_id;
}

$is_plante = $mysqli->query("SELECT id FROM plantes WHERE nom = '$nom'");
if ($is_plante->num_rows == 1) {
  echo "Cette plante existe déjà dans la base de données !";
} else {
  $plante_sql = "INSERT INTO plantes(nom, genre_id, espece_id, famille_id) VALUES ('$nom', '$genre_id', '$espece_id', '$famille_id')";
  $res_plante = $mysqli->query($plante_sql);
  echo "La plante a bien été ajoutée à la base de données";
}
