const newProductPayload = {
  name: 'Martelo de Thor',
  quantity: 10
}

const updateProductPayload = {
  name: 'Machado de Thor',
  quantity: 15
}

const newProductMock = {
  id: 1,
  name: 'Martelo de Thor',
  quantity: 10
}

const allProductsMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
    quantity: 10
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
    quantity: 20
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
    quantity: 30
  }
]

const searchedProductMock = {
  id: 1,
  name: 'Martelo de Thor',
  quantity: 10
}

const updatedProductMock = {
  id: 1,
  name: 'Machado de Thor',
  quantity: 15
}

module.exports = {
  newProductPayload,
  updateProductPayload,
  newProductMock,
  allProductsMock,
  searchedProductMock,
  updatedProductMock
}