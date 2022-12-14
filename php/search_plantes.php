<?php

$sql = $_POST["sql"];
$mysqli = new mysqli("localhost", "root", "root", 'plantes');

$result = $mysqli->query("SELECT plantes.nom, genres.genre, especes.espece, familles.famille, varietes.variete 
                          FROM plantes 
                          INNER JOIN varietes ON plantes.id = varietes.plante_id 
                          INNER JOIN genres ON plantes.genre_id = genres.id 
                          INNER JOIN especes ON plantes.espece_id = especes.id 
                          INNER JOIN familles ON plantes.famille_id = familles.id 
                          $sql
                          ORDER BY plantes.id;");

echo '
    <tr>
      <th class="plante-theader">Variété</th>
      <th class="plante-theader">Nom commun</th>
      <th class="plante-theader">Genre</th>
      <th class="plante-theader">Espèce</th>
      <th class="plante-theader">Famille</th>
      <th class="empty-theader"></th>
    </tr>';

foreach ($result as $row) {
  echo '
      <tr class="plante-tr">
        <td class="plante-entry">' . $row["variete"] . '</td>
        <td class="plante-entry">' . $row["nom"] . '</td>
        <td class="plante-entry">' . $row["genre"] . '</td>
        <td class="plante-entry">' . $row["espece"] . '</td>
        <td class="plante-entry">' . $row["famille"] . '</td>
        <td class="side-pannel">
          <button onclick="">Modifier</button>
        </td>
      </tr>';
}