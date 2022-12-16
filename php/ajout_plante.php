<?php

$mysqli = new mysqli("localhost", "root", "root", "plantes");

$nom = preg_replace("/'/", "\\", $_POST["nom"]);
$nom = preg_replace('/"/', "", $nom); // to avoid SQL injections
$nom = preg_replace('/;/', "", $nom); // to avoid SQL injections
$genre = preg_replace("/'/", "\\", $_POST["genre"]);
$genre = preg_replace('/"/', "", $genre); // to avoid SQL injections
$genre = preg_replace('/;/', "", $genre); // to avoid SQL injections
$espece = preg_replace("/'/", "\\", $_POST["espece"]);
$espece = preg_replace('/"/', "", $espece); // to avoid SQL injections
$espece = preg_replace('/;/', "", $espece); // to avoid SQL injections
$famille = preg_replace("/'/", "\\", $_POST["famille"]);
$famille = preg_replace('/"/', "", $famille); // to avoid SQL injections
$famille = preg_replace('/;/', "", $famille); // to avoid SQL injections

function exists($data, $sql, $mysqli)
{
  if ($data->num_rows >= 1) {
    while ($row = $data->fetch_assoc()) {
      $id = $row["id"];
      print_r("~ Cette entrée existe déja ! ~");
    }
  } else {
    $res = $mysqli->query($sql);
    $id = $mysqli->insert_id;
    print_r("~ Entrée ajoutée ! ~");
  }
  return $id;
}

$is_famille = $mysqli->query("SELECT * FROM familles WHERE famille = '$famille'");
$famille_sql = "INSERT INTO familles(famille) VALUES ('$famille')";
$famille_id = exists($is_famille, $famille_sql, $mysqli);

$is_genre = $mysqli->query("SELECT * FROM genres WHERE genre = '$genre' AND famille_id = '$famille_id'");
$genre_sql = "INSERT INTO genres(genre, famille_id) VALUES ('$genre', '$famille_id')";
$genre_id = exists($is_genre, $genre_sql, $mysqli);

$is_espece = $mysqli->query("SELECT * FROM especes WHERE espece = '$espece' AND famille_id = '$famille_id' AND genre_id = '$genre_id'");
$espece_sql = "INSERT INTO especes(espece, genre_id, famille_id) VALUES ('$espece', '$genre_id', '$famille_id')";
$espece_id = exists($is_espece, $espece_sql, $mysqli);

$is_plante = $mysqli->query("SELECT * FROM plantes WHERE nom = '$nom' AND espece_id = '$espece_id' AND famille_id = '$famille_id' AND genre_id = '$genre_id'");
$plante_sql = "INSERT INTO plantes(nom, genre_id, espece_id, famille_id) VALUES ('$nom', '$genre_id', '$espece_id', '$famille_id')";
$plante_id = exists($is_plante, $plante_sql, $mysqli);