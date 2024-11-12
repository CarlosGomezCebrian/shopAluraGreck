<?php
include "./factory.php";
//include "/storage/ssd3/666/21799666/private/php/factory.php";
$conn = conectarBD();


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener los datos de la tabla 'productos'

$sql = "SELECT id, pedido, codigo_usuario, producto_numero, codigo, descripcion, precio, cantidad, subtotal, pago_total   FROM tienda_carlos_pedidos WHERE cerrado = 0";
$result = $conn->query($sql);

if ($result === false) {
    die("Error en la consulta: " . $conn->error);
}
// Verificar si hay resultados y crear un array asociativo
if ($result->num_rows > 0) {
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Devolver los datos como JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo "No se encontraron resultados";
}

// Cerrar la conexión a la base de datos
$conn->close();
?>