<?php

	function my_encoding($data,$to){
		$encode_arr = array('UTF-8','ASCII','GBK','GB2312','BIG5','JIS','eucjp-win','sjis-win','EUC-JP');
		$encoded = mb_detect_encoding($data, $encode_arr);
		$data = mb_convert_encoding($data,$to,$encoded);
		return $data;
	}
	
	
$phoneNumber = $_GET["phoneNumber"];
$password  =  $_GET["password"];
$steps = $_GET["steps"];




$url = "http://42.192.149.71:8080/mi?phoneNumber=$phoneNumber&password=$password&steps=$steps";

//echo '{"code":101,"message":"手机号错误（暂只支持大陆11位手机号）"}';
$result = my_encoding(file_get_contents($url),'UTF-8');
echo($result);


// http://42.192.149.71:8080/mi?phoneNumber=18888888888&password=123456&steps=19999