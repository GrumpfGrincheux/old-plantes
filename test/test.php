<?php

$mysqli = new mysqli("localhost", "root", "root", 'plantes');

foreach($_POST as $row) {
  print_r($row);
}

exit;

$result = $mysqli->query("SELECT plantes.id, plantes.nom, genres.genre, especes.espece, familles.famille, varietes.variete 
                          FROM plantes 
                          INNER JOIN varietes ON plantes.id = varietes.plante_id 
                          INNER JOIN genres ON plantes.genre_id = genres.id 
                          INNER JOIN especes ON plantes.espece_id = especes.id 
                          INNER JOIN familles ON plantes.famille_id = familles.id 
                          ORDER BY plantes.id;");