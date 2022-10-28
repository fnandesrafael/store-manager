const newSalePayload = [
  {
    productId: 1,
    quantity: 5
  }
];

const newSaleMock = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 5
    }
  ]
};

const allSalesMock = [
  {
    date: "2022-10-27T19:23:08.000Z",
    saleId: 1,
    productId: 1,
    quantity: 5
  },
  {
    date: "2022-10-27T19:23:08.000Z",
    saleId: 1,
    productId: 2,
    quantity: 10
  }
]

const searchedSaleMock = [
  {
    date: "2022-10-27T19:23:08.000Z",
    saleId: 1,
    productId: 1,
    quantity: 5
  }
]

const updatedSaleMock = {
  saleId: 1,
  itemUpdated: [
    {
      productId: 1,
      quantity: 15
    }
  ]
}

module.exports = {
  newSalePayload,
  newSaleMock,
  allSalesMock,
  searchedSaleMock,
  updatedSaleMock
};