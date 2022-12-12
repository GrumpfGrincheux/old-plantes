<?php

  $mysqli = new mysqli("localhost", "root", "root", "Plantes");
  $mysqli -> query("DELETE FROM familles");
  $mysqli -> query("DELETE FROM genres");
  $mysqli -> query("DELETE FROM especes");
  $mysqli -> query("DELETE FROM plantes");
  $mysqli -> query("ALTER TABLE familles AUTO_INCREMENT = 1");
  $mysqli -> query("ALTER TABLE genres AUTO_INCREMENT = 1");
  $mysqli -> query("ALTER TABLE especes AUTO_INCREMENT = 1");
  $mysqli -> query("ALTER TABLE plantes AUTO_INCREMENT = 1");

  echo "The database is now empty";