<?php

$post = preg_replace("/'/", "\\'", $_POST["search"]);
$post = preg_replace('/"/', "", $post);
$post = preg_replace('/;/', "", $post); // to avoid SQL injections

if (mb_strlen($post) == 2) {
  $post = str_replace($post[1], "_", $post);
}
if (mb_strlen($post) == 4) {
  $post = str_replace($post[random_int(1, 3)], "_", $post);
  $post = str_replace($post[random_int(1, 3)], "_", $post);
}

$order = $_POST["order"];

if ($order == "all") {
  $clause = "WHERE familles.name LIKE \"$post%\" 
              OR genres.name LIKE \"$post%\" 
              OR especes.name LIKE \"$post%\"";
} else if ($order == "nom") {
  $clause = "WHERE especes.nom_commun LIKE \"$post%\"";
} else {
  $clause = "WHERE ".$order."s.name LIKE \"$post%\"";
}

$mysqli = new mysqli("localhost", "root", "root", 'plantes');
$result = $mysqli->query("SELECT DISTINCT familles.name AS famille, genres.name AS genre, especes.name AS espece, especes.nom_commun AS nom
                          FROM especes
                          INNER JOIN familles ON especes.famille_id = familles.id
                          INNER JOIN genres ON especes.genre_id = genres.id
                          ORDER BY famille, genre, espece;");

$arr = [];
foreach ($result as $row) {
  $arr[] = $row;
}

$json = json_encode($arr, JSON_UNESCAPED_UNICODE, 2);
echo $json;
