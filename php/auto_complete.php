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

$mysqli = new mysqli("localhost", "root", "root", 'plantes');
$result = $mysqli->query("SELECT DISTINCT familles.name AS famille, genres.name AS genre, especes.name AS espece, especes.nom_commun AS nom
                          FROM especes
                          INNER JOIN familles ON especes.famille_id = familles.id
                          INNER JOIN genres ON especes.genre_id = genres.id
                          WHERE familles.name LIKE \"$famille%\"
                          AND genres.name LIKE \"$genre%\"
                          AND especes.name LIKE \"$espece%\"
                          AND especes.nom_commun LIKE \"$nom%\"
                          ORDER BY famille, genre, espece;");

$arr = [];
foreach ($result as $row) {
  $arr[] = $row;
}

$json = json_encode($arr, JSON_UNESCAPED_UNICODE, 2);
echo $json;
