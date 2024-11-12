<?php

function conectarBD() {
    $servername = "localhost";
    $username = "u200104010_productosshop"; 
    $password = "Pr0duct0s!";
    $dbname = "u200104010_productosshop";

    try{
    $conn = new mysqli($servername, $username, $password, $dbname);
    //echo "Conexión exitosa factory";
}catch(Exception $e){
    echo$e;
    echo "Conexión fallida factory";
}  
return $conn;
}

?>