<?php


$variete = $_POST['variete'];
$nom = $_POST['nom'];
$genre = $_POST['genre'];
$espece = $_POST['espece'];
$famille = $_POST['famille'];

$query_variete = ' varietes.variete LIKE "'.$variete.'%"'." ";
$query_nom = ' plantes.nom LIKE "'.$nom.'%"'." ";
$query_genre = ' genres.genre LIKE "'.$genre.'%"'." ";
$query_espece = ' especes.espece LIKE "'.$espece.'%"'." ";
$query_famille = ' familles.famille LIKE "'.$famille.'%"'." ";

$data = array($variete, $nom, $genre, $espece, $famille);
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

$queries = writeQuery($query_variete, $variete, $queries);
$queries = writeQuery($query_nom, $nom, $queries);
$queries = writeQuery($query_genre, $genre, $queries);
$queries = writeQuery($query_espece, $espece, $queries);
$queries = writeQuery($query_famille, $famille, $queries);


$sql = "SELECT plantes.nom, genres.genre, especes.espece, familles.famille, varietes.variete 
        FROM plantes 
        INNER JOIN varietes ON plantes.id = varietes.plante_id 
        INNER JOIN genres ON plantes.genre_id = genres.id 
        INNER JOIN especes ON plantes.espece_id = especes.id 
        INNER JOIN familles ON plantes.famille_id = familles.id 
        $queries
        ORDER BY plantes.id;";

$mysqli = new mysqli("localhost", "root", "root", 'plantes');
$result = $mysqli->query($sql);

$arr = [];
foreach ($result as $row) {
  $arr[] = $row;
}
$json = json_encode($arr, JSON_UNESCAPED_UNICODE, 2);
echo $json;