<?php

$mysqli = new mysqli("localhost", "root", "root", "Plantes");
$result = $mysqli->query("SELECT * FROM plantes");
echo '
  <tr>
    <th class="plante-theader">ID</th>
    <th class="plante-theader">Nom</th>
    <th class="plante-theader">Genre</th>
    <th class="plante-theader">Espèce</th>
    <th class="plante-theader">Famille</th>
    <th></th>
  </tr>';
$i = 1;
foreach ($result as $row) {
  echo '
    <tr>
        <td id="i'.$row["id"].'" class="plante-entry line-'.$i.'">'.$row["id"].'</td>
        <td class="plante-entry line-'.$i.'">'.$row["nom"].'</td>
        <td class="plante-entry line-'.$i.'">'.$row["genre"].'</td>
        <td class="plante-entry line-'.$i.'">'.$row["espece"].'</td>
        <td class="plante-entry line-'.$i.'">'.$row["famille"].'</td>
        <td class="delete-plante-button line-'.$i.'"><form onsubmit="onSubmitDeletePlante('.$row["id"].')"><input id="delete-plante-button" type="submit" value="Supprimer Ligne"></form></td>
    </tr>';
    ++$i;
}