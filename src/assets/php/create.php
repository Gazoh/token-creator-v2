<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

// get posted data
$data = file_get_contents("php://input");
$obj = json_decode($data);
$tokenName = $obj->tokenName;
$tokenList = $obj->data;
$chainList = $obj->chainList;
$encodeObj = json_encode($tokenList);
$encodeChainlist = json_encode($chainList);
if ($tokenList && $chainList) {
    $json = $tokenName . '.json';
    file_put_contents($json, $encodeObj);
    file_put_contents('checklist.json', $encodeChainlist);
    echo $json;
} else {
    echo 'NO DATA';
}
