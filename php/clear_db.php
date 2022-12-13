<?php

  $mysqli = new mysqli("localhost", "root", "root", "Plantes");
  $mysqli -> query("TRUNCATE TABLE familles");
  $mysqli -> query("TRUNCATE TABLE genres");
  $mysqli -> query("TRUNCATE TABLE especes");
  $mysqli -> query("TRUNCATE TABLE plantes");
  $mysqli -> query("TRUNCATE TABLE varietes");
  $mysqli -> query("ALTER TABLE familles AUTO_INCREMENT = 1");
  $mysqli -> query("ALTER TABLE genres AUTO_INCREMENT = 1");
  $mysqli -> query("ALTER TABLE especes AUTO_INCREMENT = 1");
  $mysqli -> query("ALTER TABLE plantes AUTO_INCREMENT = 1");
  $mysqli -> query("ALTER TABLE varietes AUTO_INCREMENT = 1");

  echo "The database is now empty";