<?php
    

    
function getFile($url, $save_dir = '', $filename = '', $type = 0) {
    if (trim($url) == '') {
        return false;
    }
    if (trim($save_dir) == '') {
        $save_dir = './';
    }
    if (0 !== strrpos($save_dir, '/')) {
        $save_dir.= '/';
    }
    //创建保存目录
    if (!file_exists($save_dir) && !mkdir($save_dir, 0777, true)) {
        return false;
    }
    //获取远程文件所采用的方法
    if ($type) {
        $ch = curl_init();
        $timeout = 5;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $content = curl_exec($ch);
        curl_close($ch);
    } else {
        ob_start();
        readfile($url);
        $content = ob_get_contents();
        ob_end_clean();
    }
    $size = strlen($content);
    //文件大小
    $fp2 = @fopen($save_dir . $filename, 'a');
    fwrite($fp2, $content);
    fclose($fp2);
    unset($content, $url);
    return array(
        'file_name' => $filename,
        'save_path' => $save_dir . $filename
    );
}



function getTopHost($url){
 $url = strtolower($url);  //首先转成小写
 $hosts = parse_url($url);
 $host = $hosts['host'];
 //查看是几级域名
  $data = explode('.', $host);
  $n = count($data);
  //判断是否是双后缀
  $preg = '/[\w].+\.(com|net|org|gov|edu)\.cn$/';
  if(($n > 2) && preg_match($preg,$host)){
   //双后缀取后3位
   $host = $data[$n-3].'.'.$data[$n-2].'.'.$data[$n-1];
  }else{
   //非双后缀取后两位
   $host = $data[$n-2].'.'.$data[$n-1];
  }
  return $host;
}


$url = $_GET["url"];
if(isset($url)){
    $top = getTopHost($url);//取域名
    if($top=="douyinvod.com" || $top=="ixigua.com" ){
        $save_dir = "down/";
        $filename = rand(10000000,100000000).".mp4";
        $res = getFile($url, $save_dir, $filename, 1);//下载文件
        echo("https://api.oddfar.com/g/run/"."$save_dir"."$filename");
    }
}