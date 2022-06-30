window.addEventListener('DOMContentLoaded', (event) => {
	const btnAtras = document.querySelectorAll('.volver-atras')
	btnAtras.forEach((element) => {
		element.addEventListener('click', (e) => {
			e.preventDefault()
			window.history.back()
		})
	})
})
