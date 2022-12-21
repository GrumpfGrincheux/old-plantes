<?php

$post = [];

# TO AVOID SQL INJECTIONS AND XSS
foreach($_POST as $k => $v){
  $v = preg_replace("/'/", "\\'", $v);
  $v = preg_replace('/"/', "", $v);
  $v = preg_replace('/</', "", $v);
  $v = preg_replace('/>/', "", $v);
  $v = preg_replace('/script/', "", $v);
  $post[$k] = $v;
}

$espece = $post["espece"];

function exists($data, $sql, $mysqli)
{
  if ($data->num_rows >= 1) {
    while ($row = $data->fetch_assoc()) {
      $id = $row["id"];
      print_r("Cette entrée existe déja !");
    }
  } else {
    $res = $mysqli->query($sql);
    $id = $mysqli->insert_id;
    print_r("Entrée ajoutée !");
  }
  return $id;
}

$mysqli = new mysqli("localhost", "root", "root", 'plantes');

if ($post["espece"] != "" || null) {
  $is_espece = $mysqli->query("SELECT * FROM especes WHERE especes.name = '$espece' AND famille_id = '$famille_id' AND genre_id = '$genre_id'");
  $espece_sql = "INSERT INTO especes(especes.name, genre_id, famille_id) VALUES ('$espece', '$genre_id', '$famille_id')";
  $espece_id = exists($is_espece, $espece_sql, $mysqli);
}