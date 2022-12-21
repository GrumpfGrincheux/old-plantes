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
$famille = $post["famille"];

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

if ($post["famille"] != "" || null) {  
  $is_famille = $mysqli->query("SELECT * FROM familles WHERE familles.name = '$famille'");
  $famille_sql = "INSERT INTO familles(familles.name) VALUES ($famille)";
  $famille_id = exists($is_famille, $famille_sql, $mysqli);
}