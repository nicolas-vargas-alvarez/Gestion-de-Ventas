const productos = [
  { id: 1, nombre: "Mouse",   categoria: "Periferico", precio: 50000,  stock: 10, ventas: 12 },
  { id: 2, nombre: "Teclado", categoria: "Periferico", precio: 120000, stock: 5,  ventas: 7  },
  { id: 3, nombre: "Monitor", categoria: "Pantalla",   precio: 800000, stock: 2,  ventas: 4  },
  { id: 4, nombre: "USB",     categoria: "Accesorio",  precio: 30000,  stock: 0,  ventas: 15 },
  { id: 5, nombre: "Diadema", categoria: "Audio",      precio: 90000,  stock: 8,  ventas: 6  },
];
 
function fmt(n) { return "$" + n.toLocaleString("es-CO"); }
 
function print(texto) {
  document.getElementById("resultado").textContent += texto + "\n";
}
 
function limpiarSalida() {
  document.getElementById("resultado").textContent = "";
}
 
function mostrarTodos() {
  print(" TODOS LOS PRODUCTOS ");
  productos.map(p =>
    `[${p.id}] ${p.nombre} | ${p.categoria} | ${fmt(p.precio)} | Stock: ${p.stock} | Ventas: ${p.ventas}`
  ).forEach(l => print(l));
}
 
function stockBajo() {
  print(" STOCK BAJO (1-4 unidades) ");
  const bajo = productos.filter(p => p.stock > 0 && p.stock < 5);
  if (bajo.length === 0) { print("No hay productos con stock bajo."); return; }
  bajo.forEach(p => print(`- ${p.nombre}: ${p.stock} unidad(es)`));
}
 
function productosAgotados() {
  print("PRODUCTOS AGOTADOS ");
  const agotados = productos.filter(p => p.stock === 0);
  if (agotados.length === 0) { print("No hay productos agotados."); return; }
  agotados.forEach(p => print(`- ${p.nombre} (${p.categoria})`));
}
 
function listaPrecios() {
  print("===== NOMBRES Y PRECIOS =====");
  productos.map(p => `${p.nombre.padEnd(10)} -> ${fmt(p.precio)}`).forEach(l => print(l));
}
 
function valorInventario() {
  const total = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);
  print("===== VALOR TOTAL DEL INVENTARIO =====");
  print(fmt(total));
}
 
function verificarStock() {
  const hayAgotados   = productos.some(p => p.stock === 0);
  const todosConStock = productos.every(p => p.stock > 0);
  print("===== VERIFICACION DE STOCK =====");
  print(`some()  -> Hay productos agotados?  ${hayAgotados ? "SI" : "NO"}`);
  print(`every() -> Todos tienen stock?      ${todosConStock ? "SI" : "NO"}`);
}
 
function totalVentas() {
  const total = productos.reduce((acc, p) => acc + p.ventas, 0);
  print("===== TOTAL DE VENTAS =====");
  print(`${total} unidades vendidas en total`);
}
 
function ordenarPorPrecio(asc = true) {
  const ordenados = [...productos].sort((a, b) => asc ? a.precio - b.precio : b.precio - a.precio);
  print(`===== ORDENADOS POR PRECIO (${asc ? "ASCENDENTE" : "DESCENDENTE"}) =====`);
  ordenados.forEach((p, i) => print(`#${i + 1} ${p.nombre.padEnd(10)} ${fmt(p.precio)}`));
}
 
function buscarProducto(nombre) {
  const encontrado = productos.find(p => p.nombre.toLowerCase() === nombre.trim().toLowerCase());
  print(`===== BUSQUEDA: "${nombre}" =====`);
  if (!encontrado) { print("Producto no encontrado."); return; }
  print(`Nombre    : ${encontrado.nombre}`);
  print(`Categoria : ${encontrado.categoria}`);
  print(`Precio    : ${fmt(encontrado.precio)}`);
  print(`Stock     : ${encontrado.stock}`);
  print(`Ventas    : ${encontrado.ventas}`);
}
 
function clasificarPorPrecio() {
  print("===== CLASIFICACION POR RANGO DE PRECIO =====");
  productos.forEach(p => {
    let rango;
    switch (true) {
      case p.precio < 50000:  rango = "Economico   (<$50.000)";      break;
      case p.precio < 100000: rango = "Intermedio  ($50k - $99k)";   break;
      case p.precio < 500000: rango = "Gama media  ($100k - $499k)"; break;
      default:                rango = "Gama alta   ($500k+)";
    }
    print(`${p.nombre.padEnd(10)} | ${rango}`);
  });
}
 
function rankingVentas() {
  const ordenados = [...productos].sort((a, b) => b.ventas - a.ventas);
  print("===== RANKING POR VENTAS =====");
  ordenados.forEach((p, i) => print(`#${i + 1} ${p.nombre.padEnd(10)} ${p.ventas} ventas`));
}
 
function disponiblesOrdenados() {
  const lista = productos.filter(p => p.stock > 0).sort((a, b) => a.precio - b.precio);
  print("===== DISPONIBLES ORDENADOS POR PRECIO =====");
  lista.forEach(p => print(`${p.nombre.padEnd(10)} ${fmt(p.precio)} (stock: ${p.stock})`));
}
 
function mensajesReabastecimiento() {
  print("===== MENSAJES DE REABASTECIMIENTO =====");
  const mensajes = productos
    .filter(p => p.stock === 0)
    .map(p => `REABASTECER: ${p.nombre} (${p.categoria}) - ultimas ventas: ${p.ventas} uds.`);
  if (mensajes.length === 0) { print("Ningun producto requiere reabastecimiento."); return; }
  mensajes.forEach(m => print(m));
}
 
function ingresoPotencial() {
  const total = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);
  print("===== INGRESO POTENCIAL (vender todo el stock) =====");
  productos.forEach(p => print(`${p.nombre.padEnd(10)} ${p.stock} uds x ${fmt(p.precio)} = ${fmt(p.precio * p.stock)}`));
  print(`TOTAL: ${fmt(total)}`);
}
 
function reporteFinal() {
  const masCaro    = [...productos].sort((a, b) => b.precio - a.precio)[0];
  const masBarato  = [...productos].sort((a, b) => a.precio - b.precio)[0];
  const masVendido = [...productos].sort((a, b) => b.ventas - a.ventas)[0];
  const valInv     = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);
  const totalUds   = productos.reduce((acc, p) => acc + p.ventas, 0);
  const agotados   = productos.filter(p => p.stock === 0).length;
 
  print("===== REPORTE FINAL =====");
  print(`Producto mas caro       : ${masCaro.nombre} (${fmt(masCaro.precio)})`);
  print(`Producto mas barato     : ${masBarato.nombre} (${fmt(masBarato.precio)})`);
  print(`Producto mas vendido    : ${masVendido.nombre} (${masVendido.ventas} ventas)`);
  print(`Valor total inventario  : ${fmt(valInv)}`);
  print(`Total unidades vendidas : ${totalUds}`);
  print(`Productos agotados      : ${agotados}`);
}
 
function run(opcion) {
  limpiarSalida();
  let salir = false;
  let i = opcion;
  while (!salir) {
    switch (i) {
      case 1:  mostrarTodos(); break;
      case 2:  stockBajo(); break;
      case 3:  productosAgotados(); break;
      case 4:  listaPrecios(); break;
      case 5:  valorInventario(); break;
      case 6:  verificarStock(); break;
      case 7:  totalVentas(); break;
      case 8:  ordenarPorPrecio(true); break;
      case 9:  buscarProducto(document.getElementById("searchInput").value || "Mouse"); break;
      case 10: clasificarPorPrecio(); break;
      case 11: rankingVentas(); break;
      case 12: disponiblesOrdenados(); break;
      case 13: mensajesReabastecimiento(); break;
      case 14: ingresoPotencial(); break;
      case 15: reporteFinal(); break;
    }
    salir = true;
  }
}
 