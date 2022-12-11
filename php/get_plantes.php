<?php

$mysqli = new mysqli("localhost", "root", "root", "Plantes");
$result = $mysqli->query("SELECT * FROM plantes");
echo '
  <tr>
    <th class="plante-entry">ID</th>
    <th class="plante-entry">Nom</th>
    <th class="plante-entry">Genre</th>
    <th class="plante-entry">Espèce</th>
    <th class="plante-entry">Famille</th>
    <th></th>
  </tr>';
$i = 1;
foreach ($result as $row) {
  echo '
    <tr>
        <td class="plante-entry line-'.$i.'">'.$row['id'].'</td>
        <td class="plante-entry line-'.$i.'">'.$row["nom"].'</td>
        <td class="plante-entry line-'.$i.'">'.$row["genre"].'</td>
        <td class="plante-entry line-'.$i.'">'.$row["espece"].'</td>
        <td class="plante-entry line-'.$i.'">'.$row["famille"].'</td>
        <td class="delete-plante-button line-'.$i.'"><form onsubmit="onSubmitDeletePlante('.$i.')"><input id="delete-plante-button" type="submit" value="Supprimer Ligne"></form></td>
    </tr>';
    ++$i;
}