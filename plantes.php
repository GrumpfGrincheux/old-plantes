<?php

$mysqli = new mysqli("localhost", "root", "root", "Plantes");
$result = $mysqli->query("SELECT * FROM plantes");
?>

<table id="plantes-table">
  <tbody>
    <tr>
      <th></th>
      <th>Id</th>
      <th>Nom</th>
      <th>Genre</th>
      <th>Espèce</th>
      <th>Famille</th>
    </tr>
    <?php foreach($result as $row) { ?>
    <tr> 
      <td><a href="delete_plante.php?id=<?php echo $row["id"]; ?>"><button onsubmit="onSubmitDeletePlante(e)">Supprimer Ligne</button></a></td>
      <td><?php echo $row["id"] ?></td>
      <td><?php echo $row["nom"] ?></td>
      <td><?php echo $row["genre"] ?></td>
      <td><?php echo $row["espece"] ?></td>
      <td><?php echo $row["famille"] ?></td>
    </tr>
    <?php } ?>
  </tbody>
</table>