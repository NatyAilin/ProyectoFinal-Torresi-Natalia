const productos = [
    {
        id: 1,
        nombre: "Caja Registradora Minnie",
        precio: 23500,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_672262-MLA54975876113_042023-O.webp",
        categoria: "Jugar a ser grande",
    },

    {
        id: 2,
        nombre: "Frutas y Verduras con abrojo",
        precio: 9650,
        imagen: "https://toysmarket.co/wp-content/uploads/2020/09/kit-frutas-y-verduras-2.jpg",
        categoria: "Juegos didácticos",
    },

    {
        id: 3,
        nombre: "Aro de Basquet",
        precio: 13600,
        imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/499/990/products/basquet1-5190dc22300417ddee16255182279795-640-0.jpg",
        categoria: "Aire libre",
    },

    {
        id: 4,
        nombre: "Crayones de Baño",
        precio: 6200,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_691377-MLA50171315448_062022-O.webp",
        categoria: "Juegos didácticos",
    },

    {
        id: 5,
        nombre: "Cocinita",
        precio: 17800,
        imagen: "https://http2.mlstatic.com/D_621999-MLA47398878582_092021-O.jpg",
        categoria: "Jugar a ser grande",
    },

    {
        id: 6,
        nombre: "Monopatin",
        precio: 25600,
        imagen: "https://d2r9epyceweg5n.cloudfront.net/stores/001/065/823/products/mono-patin1-e6ac90fad42800849515766207053620-640-0.jpg",
        categoria: "Aire libre",
    },

    {
        id: 7,
        nombre: "Set de herramientas",
        precio: 20000,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_936084-MLA31083425941_062019-O.webp",
        categoria: "Jugar a ser grande",
    },

    {
        id: 8,
        nombre: "Caminador",
        precio: 20500,
        imagen: "https://acdn.mitiendanube.com/stores/001/117/915/products/d_nq_np_842972-mla41187278522_032020-o1-08b620bb533cbb1a5116371841611186-640-0.jpg",
        categoria: "Juegos didácticos",
    },

    {
        id: 9,
        nombre: "Calesita",
        precio: 80000,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_676273-MLA43998524762_112020-O.webp",
        categoria: "Aire libre",
    },

    {
        id: 10,
        nombre: "Fabrica de Helado",
        precio: 10270,
        imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/176/484/products/67491240_2360823100800951_5160904347223064576_n1-0675f80ab78cf19fe715938692940409-640-0.jpg",
        categoria: "Jugar a ser grande",
    }
];


localStorage.setItem("productos", JSON.stringify(productos));

//traemos del HTML
const divProductos = document.getElementById("productos");
const userLogin = document.getElementById("userLogin");
const filterInput = document.getElementById ("filter__input");
const filterLista = document.getElementById("filter__lista");
const filterNombre = document.getElementById("filter__nombre");
const filterPrecio = document.getElementById("filter__precio");
const btnAgregar = document.getElementById("agregar__producto");
const agregarProductos = document.getElementById("form__agregar");
const fin = document.getElementById("fin");
const btnFin = document.getElementById("btnFin")


let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"));

let productosDisponibles = JSON.parse(localStorage.getItem("productos")) || [];

console.log("datos",JSON.parse(localStorage.getItem("productos")) );

document.addEventListener("DOMContentLoaded", () => {

    if(usuarioLogeado === null) {
        const a = document.createElement("a")
        a.href = "../index.html"
        a.innerHTML ="Bienvenido"
        userLogin.appendChild(a)
    }else{
        const p = document.createElement("p")
        const close = document.createElement("button")

        p.innerHTML = `Bienvenido a Jugueterias Nemo`
        close.id = "cerrar__sesion"
        close.innerHTML = "cerrar sesion"
        close.addEventListener("click", () => {
            alert(`${usuarioLogeado.user} gracias por comprar en la Jugueterias Nemo`)

            sessionStorage.removeItem("usuario")
            location.reload()
        });

        userLogin.appendChild(p)
        userLogin.appendChild(close)
    };

    generarCardsProductos(productosDisponibles)
});

const generarCardsProductos = (productos) => {
    divProductos.innerHTML= ""; 

    productos.forEach((producto) => {

        const {nombre, imagen, categoria, precio, id} = producto;
        
        let card = document.createElement("div");

        card.className = "producto";
        card.innerHTML = `
        <div id="cardProducto" class="card" style="width: 30rem">
            <img src="${imagen}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">${categoria}</p>
            <p class="card-text">Precio ${precio}</p>
            <button id="btn${id}" class= "btn btn-outline-secondary">Comprar</button>

            ${
                usuarioLogeado?.admin === true
                ? `<button id="eliminar${id}" class="btn btn-danger">Eliminar</button>`
                : ""
            }

            </div>
        </div>
        `;

        const contenedorProductos = document.getElementById("productos");
        contenedorProductos.appendChild(card);

        //eliminamos producto
        const btnComprar = document.getElementById(`btn${producto.id}`);
        btnComprar.addEventListener("click", () => comprarProducto(producto.id));

        if(usuarioLogeado?.admin === true){
            const btnEliminar = document.getElementById(`eliminar${id}`)
            btnEliminar.addEventListener("click", () => eliminarProducto(id))
        };
    });
};

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]));

document.addEventListener("DOMContentLoaded", () => {
    dibujarCarrito()
});

let carrito = JSON.parse(sessionStorage.getItem("carrito"));

//llamamos al body y al foot del carrito
const listaCarrito = document.getElementById("items");
const footCarrito = document.getElementById("totales");

//Llamamos al boton carrito
const btnCarrito = document.getElementById("btnCarrito");
const carritoTabla = document.getElementById("carrito");

btnCarrito.addEventListener("click", () => {
    dibujarCarrito()
    if(carritoTabla.style.display === "block"){
        carritoTabla.style.display = "none"
    }else{
        carritoTabla.style.display = "block"
    }   
});

const comprarProducto = (idProducto) => {
    console.log(idProducto);

    const producto = productosDisponibles.find((producto) => producto.id === idProducto);

    const {nombre, precio, imagen, id} = producto;

    const productoCarrito = carrito.find((producto) => producto.id === idProducto);

    if(productoCarrito === undefined) {
        const nuevoProductoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        }

        carrito.push(nuevoProductoCarrito);
        sessionStorage.setItem("carrito", JSON.stringify(carrito));

    }else{
        const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto);

        //modificar las cantidades
        carrito[indexProductoCarrito].cantidad++

        //modificar el precio
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

        //lo subo
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    }

    //actualizamos
    carrito = JSON.parse(sessionStorage.getItem("carrito"));

    alert(`Usted compro el producto ${nombre}`);
    console.log(carrito);
};

//trabajamos con el carrito
const dibujarCarrito = () => {

    listaCarrito.innerHTML = ``
    
    carrito.forEach(producto => {

        const {imagen, nombre, cantidad, precio, id} = producto;

        let body = document.createElement("tr"); //tr, celda, de la tablas y td las columnas

        body.className = "producto__carrito";

        body.innerHTML = `
        <th>
            <img id="fotoProductoCarrito" src="${imagen}" class="card-img-top" style="width:40%, height:30%">
        </th>
        <td>${nombre}</td> 
        <td>${cantidad}</td>
        <td>${precio / cantidad}</td>
        <td>${precio}</td>
        <td>
            <button id="+${id}" class="btn btn-success">+</button>
            <button id="-${id}" clas="btn btn-danger">-</button>
        </td>
        `

        listaCarrito.append((body));

        const btnAgregar = document.getElementById(`+${id}`);
        const btnRestar = document.getElementById(`-${id}`);

        btnAgregar.addEventListener("click", () => aumentarCantidad(id));
        btnRestar.addEventListener("click", () => restarCantidad(id));
    });

    dibujarFoot()
};

//trabajamos el footer del carrito
const dibujarFoot = () => {

    if(carrito.length > 0){
        footCarrito.innerHTML = ""

        let footer = document.createElement("tr")

        footer.innerHTML = `
        <th><b>Totales:</b></th>
        <td></td>
        <td>${generarTotales().cantidadTotal}</td>
        <td></td>
        <td>${generarTotales().costoTotal}</td>
        `

        footCarrito.append(footer);
    }else{
        footCarrito.innerHTML = "<h3>No hay productos en su carrito</h3>"
    }
};

const generarTotales = () =>{
    const costoTotal = carrito.reduce((total, {precio}) => total + precio, 0);
    const cantidadTotal = carrito.reduce((total, {cantidad}) => total + cantidad, 0);

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
};


//botones de agregar y restar, las definimos
const aumentarCantidad = (id) => {

    //buscamos el indice donde esta el producto en el carrito
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id);

    //modifica primero el precio 
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad;

    //modificamos la cantidad y asi su precio
    carrito[indexProductoCarrito].cantidad++
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad;

    //actualizamos el carrito
    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    dibujarCarrito();
};

//aqui es igual que en aumentar cantidad
const restarCantidad = (id) => {

    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id);

    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad;

    carrito[indexProductoCarrito].cantidad--
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad;

    if(carrito[indexProductoCarrito].cantidad === 0){
        //con splice elimina un producto desde el array
        carrito.splice(indexProductoCarrito, 1)
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    dibujarCarrito();
};

//Treaemos la busqueda, de busque sus productos aqui, nombre y precio
filterInput.addEventListener("keyup", (e) => {

    const productosFilter = productosDisponibles.filter((producto) => producto.nombre.includes(e.target.value));
    console.log(productosFilter);

    productosDisponibles = productosFilter

    if(e.target.value !== ""){
        generarCardsProductos(productosFilter)
    }else{
        productosDisponibles = JSON.parse(localStorage.getItem("productos"))
        generarCardsProductos(productosDisponibles)
    };
});

//treamos el navBar

    //categoria
filterLista.addEventListener("click", (e) => {
    const productosFilter = productosDisponibles.filter((producto) => producto.categoria.includes(e.target.innerHTML));

    productosDisponibles = productosFilter;

    if(e.target.innerHTML !== "Todos"){
        generarCardsProductos(productosFilter)
    }else{
        productosDisponibles = JSON.parse(localStorage.getItem("productos"))
        generarCardsProductos(productosDisponibles)
    };
});

    //Nombre
filterNombre.addEventListener("click", (e) => {
    filtrarPorNombre(e.target.innerHTML)
})

const filtrarPorNombre = (orden) => {
    let productos

    if(orden === "Ascendente"){
        productos = productosDisponibles.sort((a, b) => {
            if(a.nombre > b.nombre){
                return 1
            }else if(a.nombre < b.nombre){
                return -1
            }else{
                return 0
            };
        });
    }else if(orden === "Descendente") {
        productos = productosDisponibles.sort((a, b) => {
            if(a.nombre < b.nombre) {
                return 1
            }else if(a.nombre > b.nombre){
                return -1
            }else{
                return 0
            };
        });
    };
    generarCardsProductos(productos)
};

    //Precio
filterPrecio.addEventListener("click", (e) => {

    const orden = e.target.innerHTML;
    let productos

    if(orden === "Ascendente"){
        productos = productosDisponibles.sort((a, b) => a.precio - b.precio)
    }else if(orden === "Descendente"){
        productos = productosDisponibles.sort((a, b) => b.precio - a.precio)
    };

    generarCardsProductos(productos);
});


//btn eliminar producto

const eliminarProducto = (id) => {
    console.log(id);

    const productoEliminar = productosDisponibles.findIndex((producto) => producto.id === id)
    productosDisponibles.splice(productoEliminar, 1)
    localStorage.setItem("productos", JSON.stringify(productosDisponibles))
    generarCardsProductos(JSON.parse(localStorage.getItem("productos")))
};


//trabajamos el footer de fin de pagina
btnFin.addEventListener("click", () =>{
    fin.classList.add("color");

    setTimeout(() => {
        fin.classList.remove("color");
    }, 3000)
})



//Fetch encuesta

document.addEventListener("DOMContentLoaded", () => {
    const encuestaForm = document.getElementById("encuestaForm");
    const mensaje = document.getElementById ("mensaje");

    encuestaForm.addEventListener("submit", (e) => {
        e.
        preventDefault();
            const respuestas = [];

            for(let  i = 1; i<=4; i++){
                const pregunta = `pregunta${i}`;
                const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);

                if (respuesta){
                    respuestas.
                    push({
                        pregunta: respuesta.namespaceURI,
                        respuesta: respuesta.value
                    });
                }
            }

            const data = {
                respuestas: respuestas
            };

            fetch("../db//encuesta.json")
                .then((response) => {
                    console.log(response);
                    if(!response.ok) {
                        alert("Error al cargar JSON")
                    }
                    return response.json()
                } )
                .then((resp) =>{
                    console.log(resp);
                    alert("Encuesta enviada correctamente")
                })
			})
            })

            .catch(
                console.error((mensaje) => {
                    mensaje.textContent = "Error al enviar la encuesta"
                })
            )

    