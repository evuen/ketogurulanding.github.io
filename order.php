<?php

if (isset($_SERVER['HTTP_X_REAL_IP']) && filter_var($_SERVER['HTTP_X_REAL_IP'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
    $userIp = $_SERVER['HTTP_X_REAL_IP'];
}
else {
    $userIp = $_SERVER['REMOTE_ADDR'];
}

$userAgent = !empty($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'API';
$referer = !empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : (!empty($_SERVER['HTTP_HOST']) ? ('http://' . $_SERVER['HTTP_HOST']) : '');

$subId1 = !empty($_POST['sub1']) ? $_POST['sub1'] : '';
$subId2 = !empty($_POST['sub2']) ? $_POST['sub2'] : '';
$subId3 = !empty($_POST['sub3']) ? $_POST['sub3'] : '';
$subId4 = !empty($_POST['sub4']) ? $_POST['sub4'] : '';
$subId5 = !empty($_POST['sub5']) ? $_POST['sub5'] : '';

$name = !empty($_POST['name']) ? $_POST['name'] : '';
$phone = !empty($_POST['phone']) ? $_POST['phone'] : '';

$infoData = [
    'country'    => null,               // страна доставки, если не будет передана - будет определена по IP адресу
    'fio'        => $name,              // Имя
    'phone'      => $phone,             // Телефон
    'user_ip'    => $userIp,            // ip пользователя
    'user_agent' => $userAgent,         // UserAgent пользователя
    'order_time' => time(),             // timestamp времени заказа
];


// id потока, например bakm
$flow = 'xmKq';

// 5 субайди, например subid1:subid2:subid3:subid4:subid5 (не обязательно)
$subid = implode(':', [$subId1, $subId2, $subId3, $subId4, $subId5]);

// ключ
$key = '7d3763f37a2672bf588f8b31533c0b1cbb285360462770';

// домен API
$domain = 'offerrum.com';


$result = file_get_contents(
    "https://api.{$domain}/webmaster/order/?key={$key}&flow={$flow}&subid={$subid}",
    false,
    stream_context_create(
        [
            'http' => [
                'method'  => 'POST',
                'content' => http_build_query($infoData),
                'header'  => "Content-Type: application/x-www-form-urlencoded\r\n" . "Referer: {$referer}\r\n",
            ],
        ]
    )
);


//var_dump($result);
header('Location: success.html');
