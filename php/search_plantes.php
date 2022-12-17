<?php

$genre = preg_replace("/'/", "\\", $_POST["genre"]);
$genre = preg_replace('/"/', "", $genre); // to avoid SQL injections
$genre = preg_replace('/;/', "", $genre); // to avoid SQL injections
$espece = preg_replace("/'/", "\\", $_POST["espece"]);
$espece = preg_replace('/"/', "", $espece); // to avoid SQL injections
$espece = preg_replace('/;/', "", $espece); // to avoid SQL injections
$famille = preg_replace("/'/", "\\", $_POST["famille"]);
$famille = preg_replace('/"/', "", $famille); // to avoid SQL injections
$famille = preg_replace('/;/', "", $famille); // to avoid SQL injections

$query_genre = ' genres.name LIKE "'.$genre.'%"'." ";
$query_espece = ' especes.name LIKE "'.$espece.'%"'." ";
$query_famille = ' familles.name LIKE "'.$famille.'%"'." ";

$queries = "";

function writeQuery($query, $val, $queries) {
  if ($val !== '') {
    if ($queries == "") {
    $queries = " WHERE ".$query;
    } else {
      $queries = $queries." AND ".$query;
    }
  }
  return $queries;
}

$queries = writeQuery($query_genre, $genre, $queries);
$queries = writeQuery($query_espece, $espece, $queries);
$queries = writeQuery($query_famille, $famille, $queries);


$sql = "SELECT familles.id AS famille_id, familles.name AS famille, genres.id AS genre_id, genres.name AS genre, especes.id AS espece_id, especes.name AS espece
        FROM especes
        INNER JOIN genres ON especes.genre_id = genres.id
        INNER JOIN familles ON especes.famille_id = familles.id
        $queries
        ORDER BY familles.id";

$mysqli = new mysqli("localhost", "root", "root", 'plantes');
$result = $mysqli->query($sql);

$arr = [];
foreach ($result as $row) {
   $arr[] = $row;
}

$json = json_encode($arr, JSON_UNESCAPED_UNICODE, 2);
echo $json;