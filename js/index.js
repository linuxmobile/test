const pizzas = [
    {
        id: 1,
        nombre: "Pochito Morfoni",
        precio: 1800,
        ingredientes: [
            "tomate",
            "muzzarela",
            "cheddar",
            "panceta",
            "huevo"
        ],
        image: "https://images.unsplash.com/photo-1605591099585-087b3d54cd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emElMjBlZ2d8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
        id: 2,
        nombre: "Mediterranea",
        precio: 1650,
        ingredientes: [
            "aceitunas verdes",
            "aceitunas negras",
            "anchoas",
            "muzzarela",
            "tomate"
        ],
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Funareceta.com%2Fwp-content%2Fuploads%2F2014%2F05%2Fpizza-de-anchoas.jpg&f=1&nofb=1&ipt=4ebfb367bfb8f06db4da64a8201a0cbfdd53858424af997630bcdac9852efaa5&ipo=images",
    },
    {
        id: 3,
        nombre: "Fin de Messi",
        precio: 580,
        ingredientes: [
            "Tomate",
            "Muzzarela",
            "Aceitunas"
        ],
        image: "https://images.unsplash.com/photo-1633040248073-9a31468f7e99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
        id: 4,
        nombre: "Riki Fort",
        precio: 2200,
        ingredientes: [
            "Camarones",
            "Mozzarela",
            "Nuez",
            "Aceitunas negras"
        ],
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flechedetigre.net%2Fwp-content%2Fuploads%2F2019%2F08%2FPizza-de-Camarones.jpg&f=1&nofb=1&ipt=73e522d25143f04985e6523c6ec0207ea877b67f936d05ebb260fe82a31c503c&ipo=images",
    },
    {
        id: 5,
        nombre: "Clásica",
        precio: 560,
        ingredientes: [
            "Morrón",
            "Muzzarela",
            "Jamón"
        ],
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBpenphfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
        id: 6,
        nombre: "Veggie",
        precio: 1800,
        ingredientes: [
            "Rucula",
            "Muzzarela",
            "Tomate",
            "Apio",
            "Nuez",
            "Roquefort"
        ],
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.cybercook.com.br%2Freceitas%2F508%2Fpizza-de-rucula-com-bacon-1.jpeg&f=1&nofb=1&ipt=086828ccd23ae31546ee29f23311c649a273ad7b1c5218e052cc6360bac7b24f&ipo=images",
    }
]

let selectedPizza = JSON.parse(localStorage.getItem("pizza")) || [];

const saveToLocalStorage = (pizzas) => {
    return localStorage.setItem("pizza", JSON.stringify(pizzas))
}

/* EJERCICIO 2 */

const resultSection = document.getElementById("result__section")
const form = document.getElementById("form")
const input = document.querySelector(".form__input")

const searchPizza = (value) => pizzas.find((pizza) => pizza.id === value)

const renderPizzas = (pizza) => {
    const { nombre, precio, ingredientes, image } = pizza
    return `
    <div class="pizza__section">
    <img class="pizza__img" src="${ image }"/>
    <h2 class="pizza__title">${nombre.toUpperCase()}</h2>
    <p class="pizza__description">Ingredientes: ${ingredientes.map((i) => i).join(", ")}.</p>
    <h3 class="pizza__price"> Precio: $${precio} </h3>
    <p class="pizza__p">Busca otro número de pizza para ver si la tenemos.</p>
    </div>
    `
}

const showEmptyError = () => {
    resultSection.innerHTML = `
      <div class="showerrordiv">
      <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
      <h2 class="error__text">¡Hola! Necesitas ingresar un número para poder buscar tu pizza.</h2>
      </div>`
}

const renderResult = (pizza) => {
    if (!pizza) {
      resultSection.innerHTML = `
      <div class="pizza__section">
      <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
      <h2 class="error"> ¡No pudimos encontrar tu pizza! :(</h2>
      <p class="error__p">¡Probá con otro número!.</p>
      </div>`
    } else {
        resultSection.innerHTML = renderPizzas(pizza);
    //   resultSection.innerHTML = `
    //   <div class="pizza__section">
    //   <img class="pizza__img" src="${ pizza.image }"/>
    //   <h2 class="pizza__title">${pizza.nombre.toUpperCase()}</h2>
    //   <p class="pizza__description">Ingredientes: ${pizza.ingredientes.join(", ")}.</p>
    //   <h3 class="pizza__price"> Precio: $${pizza.precio} </h3>
    //   <p class="pizza__p">Busca otro número de pizza para ver si la tenemos.</p>
    //   </div>
    //   `
    }
}

/*  Esto es prácticamente lo que aprendimos en la clase :3
    Evitando el comportamiendo por default del form!
    Si el valor a buscar está vacío muestra que no hay nada! */
const submitSearch = (e) => {
    e.preventDefault()
    const searchValue = input.value;
    if (!searchValue) {
        showEmptyError(searchValue);
        return;
    }
    const searchedPizza = searchPizza(Number(searchValue))
    renderResult(searchedPizza);
    saveToLocalStorage(searchedPizza)
}

const init = () => {
    renderResult(selectedPizza)
    form.addEventListener("submit", submitSearch)
}

init()


/* 
EJERCICIO 1

// Pizzas que sean impares
const pizzaImpar = pizzas.filter( pizzas => pizzas.id % 2 == 1 )
pizzaImpar.forEach((pizza) => console.log(`El id de ${pizza.nombre} es impar`));

// Listar pizzas que cuesten menos de $600
const pizzaMenos600 = (pizza) => pizza.precio <= 600;

if (pizzas.some(pizzaMenos600)) {
    console.log(`Existen pizzas menos de $600`)
}
else {
    console.log(`Ninguna cuesta menos de $600`)
}

// Nombre de cada pizza con precio
const pizzasConPrecios = pizzas.forEach((pizza) => console.log(`Tenemos la ${pizza.nombre} a sólo $${pizza.precio}`));


// Ingredientes de cada pizza

pizzas.forEach((pizza => {
    console.log (`${pizza.nombre} viene con:`)
    pizza.ingredientes.forEach((ingrediente) => console.log(ingrediente))
})) */