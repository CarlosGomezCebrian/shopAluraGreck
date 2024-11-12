<?php
include "./factory.php";
//include "/storage/ssd3/666/21799666/private/php/factory.php";
$conn = conectarBD();

$idProducto = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$nuevoValor = 1;
if ($idProducto > 0) {

    if ($conn) {
        $sql = "UPDATE tienda_carlos_pedidos SET cerrado = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("ii", $nuevoValor, $idProducto);
            if ($stmt->execute()) {
                echo json_encode(array("message" => "Registro actualizado exitosamente"));
            } else {
                echo json_encode(array("error" => "Error al actualizar el registro: " . $stmt->error));
            }
            $stmt->close();
        } else {
            echo json_encode(array("error" => "Error en la consulta preparada: " . $conn->error));
        }
        $conn->close();
    } else {
        echo json_encode(array("error" => "Error al conectar con la base de datos"));
    }
} else {
    echo json_encode(array("error" => "ID no válido"));
}

?>



