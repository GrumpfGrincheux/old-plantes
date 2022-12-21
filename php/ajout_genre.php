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
$genre = $post["genre"];

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

if ($post["genre"] != "" || null) {
  $is_genre = $mysqli->query("SELECT * FROM genres WHERE genres.name = '$genre' AND famille_id = '$famille_id'");
  $genre_sql = "INSERT INTO genres(genres.name, famille_id) VALUES ($genre, $famille_id)";
  $genre_id = exists($is_genre, $genre_sql, $mysqli);
}
