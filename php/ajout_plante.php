<?php

$mysqli = new mysqli("localhost", "root", "root", "plantes");

$nom = preg_replace("/'/", "\\'", $_POST["nom"]);
$nom = preg_replace('/"/', "", $nom); // to avoid SQL injections
$nom = preg_replace('/;/', "", $nom); // to avoid SQL injections
$genre = preg_replace("/'/", "\\'", $_POST["genre"]);
$genre = preg_replace('/"/', "", $genre); // to avoid SQL injections
$genre = preg_replace('/;/', "", $genre); // to avoid SQL injections
$espece = preg_replace("/'/", "\\'", $_POST["espece"]);
$espece = preg_replace('/"/', "", $espece); // to avoid SQL injections
$espece = preg_replace('/;/', "", $espece); // to avoid SQL injections
$famille = preg_replace("/'/", "\\'", $_POST["famille"]);
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
$is_genre = $mysqli->query("SELECT * FROM genres WHERE genre = '$genre' AND famille_id = '$famille_id' AND plante_id = '$plante_id'");
$is_espece = $mysqli->query("SELECT * FROM especes WHERE espece = '$espece' AND nom_commun = '$nom' AND famille_id = '$famille_id' AND genre_id = '$genre_id'");

$famille_sql = "INSERT INTO familles(famille) VALUES ('$famille')";
$famille_id = exists($is_famille, $famille_sql, $mysqli);
$genre_sql = "INSERT INTO genres(genre, famille_id) VALUES ('$genre', '$famille_id')";
$genre_id = exists($is_genre, $genre_sql, $mysqli);
$espece_sql = "INSERT INTO especes(espece, nom_commun, genre_id, famille_id) VALUES ('$espece', $nom '$genre_id', '$famille_id')";
$espece_id = exists($is_espece, $espece_sql, $mysqli);
