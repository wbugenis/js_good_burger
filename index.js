const url = 'http://localhost:3000/burgers'
const burgerMenu = document.querySelector("div#burger-menu")
const order = document.querySelector("ul#order-list")
const form = document.querySelector("form#custom-burger")

document.addEventListener("DOMContentLoaded", () => {
  fetchBurgers()
  menuListener()
  formListener()
})

//Add a burger object to the menu
const makeBurgerDiv = burger => {
  const div = document.createElement('div')
  div.dataset.id = burger.id
  div.innerHTML = `<div class="burger">
                    <h3 class="burger_title">${burger.name}</h3>
                      <img src=${burger.image} alt =${burger.name}>
                      <p class="burger_description">
                        ${burger.description}
                      </p>
                      <button class="button">Add to Order</button>
                  </div>`
  burgerMenu.append(div)
}

//Fetch burger list and iterate through to add each to page
const fetchBurgers = () => {
  fetch(url)
    .then(response => response.json())
    .then(burgers => burgers.forEach(makeBurgerDiv))
}

//Add listener to menu for adding burgers to order
const menuListener = () => {
    burgerMenu.addEventListener('click', event => {
      if(event.target.matches('button')){
        const li = document.createElement('li')
        li.textContent = event.target.parentNode.querySelector("h3").textContent
        order.append(li)
      }
    })
}

const formListener = () => {
  form.addEventListener('submit', event => {
    event.preventDefault()
    const name = event.target.name.value
    const description = event.target.description.value
    const image = event.target.url.value

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({name, description, image})
    })
      .then(response => response.json())
      .then(makeBurgerDiv)
  })

}