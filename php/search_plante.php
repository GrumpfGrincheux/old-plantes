<?php

$mysqli = new mysqli("localhost", "root", "root", "plantes");

$variete = $_POST["variete"];
$nom = $_POST["nom"];
$genre = $_POST["genre"];
$espece = $_POST["espece"];
$famille = $_POST["famille"];

// $plantes = $mysqli->query("SELECT varietes.variete, plantes.nom, genres.genre, especes.espece, familles.famille
//                           FROM plantes
//                           INNER JOIN varietes ON plante.id = varietes.plante_id
//                           INNER JOIN genres ON plantes.genre_id = genres.id
//                           INNER JOIN especes ON plantes.espece_id = especes.id
//                           INNER JOIN familles ON plantes.famille_id = familles.id
//                           WHERE varietes.variete LIKE '$variete'
//                           OR plantes.nom LIKE %'$nom'
//                           OR plantes.genre LIKE %'$genre'
//                           OR plantes.espece LIKE %'$espece'
//                           OR plantes.famille LIKE %'$nom'
//                           ORDER BY plantes.id");

// echo '
//     <tr>
//       <th class="plante-theader">ID</th>
//       <th class="plante-theader">Variété</th>
//       <th class="plante-theader">Nom commun</th>
//       <th class="plante-theader">Genre</th>
//       <th class="plante-theader">Espèce</th>
//       <th class="plante-theader">Famille</th>
//       <th class="empty-theader"></th>
//     </tr>';

// foreach ($plantes as $plantes_row) {
//   echo '
//       <tr class="plante-tr">
//         <td class="plante-entry">' . $plantes_row["id"] . '</td>
//         <td class="plante-entry">' . $plantes_row["variete"] . '</td>
//         <td class="plante-entry">' . $plantes_row["nom"] . '</td>
//         <td class="plante-entry">' . $plantes_row["genre"] . '</td>
//         <td class="plante-entry">' . $plantes_row["espece"] . '</td>
//         <td class="plante-entry">' . $plantes_row["famille"] . '</td>
//         <td class="side-pannel">
//           <button onclick="">Supprimer</button>
//           <button onclick="">Modifier</button>
//         </td>
//       </tr>';
// }
