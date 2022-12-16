<?php

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

$query_nom = ' plantes.nom LIKE "'.$nom.'%"'." ";
$query_genre = ' genres.genre LIKE "'.$genre.'%"'." ";
$query_espece = ' especes.espece LIKE "'.$espece.'%"'." ";
$query_famille = ' familles.famille LIKE "'.$famille.'%"'." ";

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

$queries = writeQuery($query_nom, $nom, $queries);
$queries = writeQuery($query_genre, $genre, $queries);
$queries = writeQuery($query_espece, $espece, $queries);
$queries = writeQuery($query_famille, $famille, $queries);


$sql = "SELECT plantes.nom, plantes.id AS plante_id,
                genres.genre, genres.id AS genre_id, genres_ids,
                especes.espece, especes.id AS espece_id, especes_ids,
                familles.famille, familles.id AS famille_id
        FROM plantes
        INNER JOIN genres ON genres_ids REGEXP '\"$genre*[a-z]*\": \"[0-9]{1,8}\"'
        INNER JOIN especes ON especes_ids REGEXP '\"$espece*[a-z]*\": \"[0-9]{1,8}\"'
        INNER JOIN familles ON plantes.famille_id = familles.id
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