// Creacion de productos:

const products = [
    {
        id: 1,
        product: "Ecommerce",
        price: 500,
        img: './assets/Ecommerce.png',
        description: "Adquirir un Ecommerce para vender tus productos de forma online e impulsar tu negocio"
    },
    {
        id: 2,
        product: "Página Web Personal",
        price: 300,
        img: './assets/PaginaWebPersonal.png',
        description: "Adquirir tu Página web personalizada para posicionar tu marca personal en internet y redes sociales"
    },
    {
        id: 3,
        product: "Página Web Estudio",
        price: 400,
        img: './assets/PaginaWebEstudio.png',
        description: "Adquirir tu Página web personalizada para tu estudio y así lograras que más clientes te encuentren"
    }
]

// Se solicitan los productos al backend y se simula una demora de 2 segundos

const askProducts = () => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products);
        }, 2000);
    });
}

// Se muestran los productos al usuario y elige cual quiere

const productList = document.getElementById("productList");

const shoppingCart = [];

askProducts()
    .then((products) => {

        products.forEach((element) => {
            const cardProducts = document.createElement("div");
            cardProducts.className = "card-products"

            cardProducts.innerHTML = `
                <h4><strong>${element.id}- ${element.product}</strong></h4>
                <img src="${element.img}" alt="${element.product}">
                <p class="card-price">Su valor es de: <strong>${element.price}usd </strong></p>              
                <p> <strong>Con esta compra podrás: </strong></p>
                <p>${element.description}</p>
                `;

            productList.appendChild(cardProducts);

            const cardButton = document.createElement("button");
            cardButton.className = "card-button"
            cardButton.innerText = "Adquirir"

            cardProducts.appendChild(cardButton);

            cardButton.addEventListener("click", () => {
                Toastify({
                    text: "Añadiste un producto al carrito",
                    duration: 2000,
                }).showToast();

                const productChoice = {
                    id: element.id,
                    product: element.product,
                    img: element.img,
                    price: element.price
                };
                addToFormAndSave(productChoice);
            })
        })
    })
    .catch((error) => {
        const errorProducts = "Hubo un error al obtener los productos:";
        const errorContainerP = document.getElementById("errorContainerP");
        errorContainerP.textContent = errorProducts;
    });

// Guardar en localStorage lo seleccionado por el usuario

function addToFormAndSave(productChoice) {
    shoppingCart.push(productChoice);
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

// Formulario de consultas

const formUser = document.getElementById("form");
formUser.addEventListener("submit", valueForm);

function valueForm(e) {
    e.preventDefault();

    const userChoice = parseInt(e.target.elements.choice.value);
    const productChoice = products.find(e => e.id === userChoice);

    const nameUser = e.target.elements.name.value;
    const surnameUser = e.target.elements.surname.value;
    const emailUser = e.target.elements.email.value;

    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const emailInput = document.getElementById("email");

    nameInput.placeholder = nameUser !== '' ? '' : 'Nombre está vacío';
    surnameInput.placeholder = surnameUser !== '' ? '' : 'Apellido está vacío';
    emailInput.placeholder = emailUser !== '' ? '' : 'Email está vacío';

    addToFormAndSave(productChoice);
}

// Comentarios de clientes:

async function comments() {

    try {
        const commentsCard = document.getElementById("commentsCard")
        commentsCard.className = 'comments-card';

        const tittle = document.createElement('h3');
        tittle.className = 'card-tittle';

        tittle.textContent = "Comentarios de clientes:"

        commentsCard.appendChild(tittle);

        const div = document.createElement('div');
        div.className = 'card';

        for (let i = 1; i <= 6; i++) {

            const customerFeedback = await fetch(`https://jsonplaceholder.typicode.com/comments/${i}`);

            const parsedCustomerFeedback = await customerFeedback.json();

            console.log(parsedCustomerFeedback);


            const innerDiv = document.createElement('div');
            innerDiv.className = 'card-body';

            innerDiv.innerHTML = `<h4><strong>${parsedCustomerFeedback.name}</strong></h4>
                                  <p>Comentario: ${parsedCustomerFeedback.body} </p>`


            div.appendChild(innerDiv);
        }
        commentsCard.appendChild(div);
    } catch (error) {
        const errorComments = "Error al cargar los comentarios. Por favor, vuelve a cargar la página."
        const errorContainer = document.getElementById("errorContainer");
        if (errorContainer) {
            errorContainer.textContent = errorComments;
        }
    }
} comments();
