<?php

  $mysqli = new mysqli("localhost", "root", "root", "plantes");
  $plantes = $mysqli -> query("SELECT plantes.id, plantes.nom, genres.genre, especes.espece, familles.famille 
                              FROM plantes
                              INNER JOIN genres ON plantes.genre_id = genres.id
                              INNER JOIN especes ON plantes.espece_id = especes.id
                              INNER JOIN familles ON plantes.famille_id = familles.id");

  // foreach ($plantes as $plantes_row)
    // $nom = $plantes_row["nom"];
    // $genre_id = $plantes_row["genre_id"];
    // $espece_id = $plantes_row["espece_id"];
    // $famille_id = $plantes_row["famille_id"];
    // $plante_id = $plantes_row["id"];

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
  foreach ($plantes as $plantes_row) {
    echo '
      <tr>
          <td class="plante-entry line-'.$i.'">'.$plantes_row["id"].'</td>
          <td class="plante-entry line-'.$i.'">'.$plantes_row["nom"].'</td>
          <td class="plante-entry line-'.$i.'">'.$plantes_row["genre"].'</td>
          <td class="plante-entry line-'.$i.'">'.$plantes_row["espece"].'</td>
          <td class="plante-entry line-'.$i.'">'.$plantes_row["famille"].'</td>
          <td class="delete-plante-button line-'.$plantes_row["id"].'"><form onsubmit="onSubmitDeletePlante('.$plantes_row["id"].')"><input id="delete-plante-button" type="submit" value="Supprimer Ligne"></form></td>
      </tr>';
    ++$i;
  }