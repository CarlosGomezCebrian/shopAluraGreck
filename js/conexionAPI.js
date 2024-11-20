async function guardarProducto(
  codigo,
  descripcion,
  imagen,
  categoria,
  subcategoria,
  cantidad,
  precio,
  descuento,
  precioConDescuento,
  descripcionCompleta,
  materiales
) {
  const conexion = await fetch("http://localhost:3001/productos", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      codigo: codigo,
      descripcion: descripcion,
      imagen: imagen,
      categoria: categoria,
      subcategoria: subcategoria,
      cantidad: cantidad,
      precio: precio,
      descuento: descuento,
      precio_con_descuento: precioConDescuento,
      descripcionCompleta: descripcionCompleta,
      materiales: materiales,
    }),
  });
  const conexionConvertida = conexion.json();

  if (!conexion.ok) {
    throw new Error("Ha ocurrido un error al enviar el video");
  }

  return conexionConvertida;
}

export const conexionAPI = {
  guardarProducto,
};
/**
 *       "id": "1",
      "codigo": "21034",
      "descripcion": "Organicajon",
      "imagen": "img/hogar/cocina/21034Organicajon.webp",
      "categoria": "Hogar",
      "subcategoria": "Cocina",
      "cantidad": "2",
      "precio": "80",
      "descuento": "0.3",
      "precio_con_descuento": "56.00",
      "descripcionCompleta": "Maximiza cada rincón de tu refrigerador manteniendo los espacios organizados para frutas y verduras. Utiliza los divisores del Organi Cajón para contar con un mejor acomodo.",
      "materiales": "Polipropileno. Soporta: 1.2 kg. 24 x 9 x 14 cm. Incluye dos divisores."
 */
