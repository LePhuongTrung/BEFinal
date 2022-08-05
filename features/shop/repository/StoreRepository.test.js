const storeRepository = require("./StoreRepository");
const DB = require("../../../Database/connect");
const mongoose = require('mongoose');

beforeAll(async () => {
  await DB.connectDatabase();
});

afterAll(async () => {
  await DB.disconnectDatabase();
});

const Mock_Data_Store = {
  name: "store Test",
  address: "HN",
  userId: mongoose.Types.ObjectId('62ea68cd41a7569acb6f1583'),
  imgUrl: "https://i.imgur.com/gYPzvjA.jpg,"
};

describe("Sunny case: Book testing", () => {
  it("findStoreById work OK", async () => {
    const store = await storeRepository.find("62ecdf0c0fcf8dccacaac997");
    expect(store).toBeTruthy();
    expect(typeof store).toBe("object");
    expect(store.name).toBe(Mock_Data_Store.name);
    expect(store.address).toBe(Mock_Data_Store.address);
    expect(toString(store.userId)).toBe(toString(Mock_Data_Store.userId));
    expect(store.imgUrl).toBe(Mock_Data_Store.imgUrl);
  });

  it("findOneByOptions work OK", async () => {
    const name = "store Test";
    const store = await storeRepository.findByOptions({name: name});
    expect(store).toBeTruthy();
    expect(typeof store).toBe("object");
    expect(store.name).toBe(Mock_Data_Store.name);
    expect(store.address).toBe(Mock_Data_Store.address);
    expect(toString(store.userId)).toBe(toString(Mock_Data_Store.userId));
    expect(store.imgUrl).toBe(Mock_Data_Store.imgUrl);
  });

  it("findAllByOptions work OK", async () => {
    const address = "HN";
    const stores = await storeRepository.findAllByOptions({address: address});
    expect(stores).toBeTruthy();
    expect(typeof stores).toBe("object");
    expect(stores.length).toBeGreaterThan(1);
  });

  it("create shop is successful", async () => {
    const userId = Mock_Data_Store.userId;
    const store = await storeRepository.create(Mock_Data_Store,userId);
    expect(typeof store).toBe("object");
    expect(store.name).toBe(Mock_Data_Store.name);
    expect(store.address).toBe(Mock_Data_Store.address);
    const deleteStore = await storeRepository.deleteData(store.id);
  });

  it("Update shop is successful", async () => {
    const name = "test Repository"
    const update = await storeRepository.update("62ecd74da160194846efd2d5",{name: name} );
    expect(update.name).toBe(name);
  });
});

describe("Rainy case: Book testing", () => {});
