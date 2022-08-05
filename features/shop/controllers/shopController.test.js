const request = require("supertest");

const app = require("../../../app");
const DB = require("../../../Database/connect");

const mockShop = {
  shopName: "Test shopController",
  address: "dn",
  userId: "asd47454as8d4a",
};

beforeAll(() => {
  DB.connectDatabase();
});

afterAll(() => {
  DB.disconnectDatabase();
});

describe("POST /shop/Create ", () => {
  test("return response status is 200", async () => {
    const response = await request(app)
      .post("/shop/Create")
      .send(mockShop)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.shopName).toEqual(mockShop.shopName);

    const deleteResponse = await request(app)
    .delete("/shop/delete/:id")
    .send(response.id)
    .set("Accept", "application/json");
    expect(deleteResponse.status).toBe(200);

  });
});
