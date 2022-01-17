<?php

header("Access-Control-Allow-Origin: * ");
$image = base64_decode(explode(',', $_POST['image'])[1]);
$filePath = "./images/".$_POST['file'];
file_put_contents($filePath, $image);
echo $_POST['image'];