const elemListaCategorias = document.querySelector('.lista-categorias')
const elemListaProductos = document.querySelector('.lista-productos')

const obtenerProductos = async () => {
	try {
		const response = await fetch('https://fakestoreapi.com/products')
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

const mostrarCategorias = async () => {
	const productos = await obtenerProductos()
	const listaCategorias = productos.map((producto) => producto.category)
	const listaFiltrada = [...new Set(listaCategorias)]
	listaFiltrada.forEach(
		(categoria) =>
			(elemListaCategorias.innerHTML += `<label for=${categoria
				.split(' ')
				.join('-')
				.split("'")
				.join('-')}><input type="checkbox" id=${categoria
				.split(' ')
				.join('-')
				.split("'")
				.join('-')} class="check-categorias">${categoria}</label>`)
	)
	const checkCategorias = document.querySelectorAll('.check-categorias')
	checkCategorias.forEach((check) => {
		check.addEventListener('click', filtrarProductos)
	})
}
const generarHtmlProductos = (listadoProductos) => {
	listadoProductos.forEach((producto) => {
		elemListaProductos.innerHTML += `
			<article>
				<h2>${producto.title}</h2>
				<div class="img-wrapper">
					<img src=${producto.image} alt =${producto.title}>
					<span class="btn-comprar">¡Lo quiero!</span>
				</div>
				<p>${producto.description}</p>
				<strong>${producto.price}€</strong>
			</article>
		`
	})
}

const mostrarProductos = async () => {
	const productos = await obtenerProductos()
	generarHtmlProductos(productos)
}

const filtrarProductos = async (e) => {
	const productos = await obtenerProductos()
	let categoriasSeleccionadas = []
	const checkCategorias = document.querySelectorAll('.check-categorias')
	checkCategorias.forEach((check) => {
		if (check.checked) {
			categoriasSeleccionadas.push(check.parentElement.textContent)
		}
	})
	if (categoriasSeleccionadas.length === 0) {
		elemListaProductos.innerHTML = ''
		mostrarProductos()
		return
	}
	elemListaProductos.innerHTML = ''
	const productosFiltrados = productos.filter((producto) => {
		return categoriasSeleccionadas.includes(producto.category)
	})
	generarHtmlProductos(productosFiltrados)
	categoriasSeleccionadas = []
}

mostrarCategorias()
mostrarProductos()
