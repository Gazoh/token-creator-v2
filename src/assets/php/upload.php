<?php
  header('Content-Type: application/json; charset=utf-8');
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: PUT, GET, POST");

  // get posted data
  $data = file_get_contents("php://input");
  if($data) {
    file_put_contents('token_list.json', $data);
    echo 'token_list.json';
  } else {
    echo 'NO DATA';
  }
