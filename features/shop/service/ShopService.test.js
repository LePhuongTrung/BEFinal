const ShopService = require("./ShopService");
const DB = require("../../../Database/connect");

beforeAll(async () => {
  await DB.connectDatabase();
});

afterAll(async () => {
  await DB.disconnectDatabase();
});

const mockShop = {
  shopName: "Test shopService",
  address: "30000",
  userId: "asd47454as8d4a",
};

describe("Sunny case: shop testing", () => {
  it("findShopById work OK", async () => {
    const shop = await ShopService.getShop("62d2b5ff8d71010c0a7aeecf");
    expect(shop).toBeTruthy();
    expect(typeof shop).toBe("object");
    expect(shop.userId).toBe(mockShop.userId);
  });

  it("create shop is successful", async () => {
    const userId = mockShop.userId;
    const shop = await ShopService.createShop(mockShop,userId);
    expect(shop.userId).toBe(mockShop.userId);
    const deleteShop = await ShopService.deleteShop(shop.id);
    console.log(deleteShop);
  });

  it("Update shop is successful", async () => {
    // lỗi xử lí test chạy rồi những kết quả test vẫn còn
    const updateShop = await ShopService.updateShop("62d36f2f9e110d0b9600541e",mockShop);
    expect(updateShop).toBeTruthy();
    expect(updateShop.shopName).toBe(mockShop.shopName);
  });
});

describe("Rainy case: shop testing", () => {});
