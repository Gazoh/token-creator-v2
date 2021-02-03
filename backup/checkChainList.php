<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

// get posted data
$data = file_get_contents("php://input");
// echo $data;

// Get json from server
$url = "https://nerd.finance/checklist.json";
$json = file_get_contents($url);
$json_data = json_decode($json, true);
// Count json list for the for loop
$countJson  = count($json_data['list']);
for ($i = 0; $countJson <= 10; $i++) {
  echo $json_data['list']->chainID_list;
}
// var_dump($json_data['list']);
