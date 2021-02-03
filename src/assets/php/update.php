<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

// get posted data
$data = file_get_contents("php://input");
$obj = json_decode($data);
$tokenName = $obj->tokenName;
$tokenList = $obj->data;
$encodeObj = json_encode($tokenList);
if ($tokenList) {
    $json = $tokenName . '.json';
    file_put_contents($json, $encodeObj);
    echo $json;
} else {
    echo 'NO DATA';
}
