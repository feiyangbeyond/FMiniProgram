<?php

// 获取某目录下所有文件、目录名（不包括子目录下文件、目录名）  

$dir ="down/";
$handler = opendir($dir);  
while (($filename = readdir($handler)) !== false) {
    // 务必使用!==，防止目录下出现类似文件名“0”等情况  
    if ($filename !== "." && $filename !== "..") {  
        $files[] = $filename ; //把文件存到数组里
    }
}  
closedir($handler);  

//如果有文件
if(isset($files)){

//循环删除文件最后修改时间大于10分钟的
foreach ($files as  $value) {  
    $lasttime =  filemtime($dir.$value);
    $nowtime = time();
    if($nowtime-$lasttime>600){
        if(unlink($dir.$value)){
            echo $value."-success-".$lasttime. PHP_EOL;  //成功
        }else{
            echo $value."-fail-".$lasttime. PHP_EOL;  //失败
        }
    }else{
        echo $value."-no-".$lasttime. PHP_EOL;  //没有大于10分钟的文件
    }
}  
}else{
    echo "no";
}