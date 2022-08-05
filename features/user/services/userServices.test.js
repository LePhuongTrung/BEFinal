const userServices = require("./userServices");
const DB = require("../../../Database/connect");

beforeAll(async () => {
  await DB.connectDatabase();
});

afterAll(async () => {
  await DB.disconnectDatabase();
});

const Mock_User_Address = {
  address: "80 Bau Cau Street",
  city: "Da Nang",
  postalCode: "550000",
  country: "Viet Nam"
}

const MOCK_USER_DATA_SERVICES = {
  username: "Trungdino",
  email: "trungdino0000@gmail.com",
  phoneNumber: "0821230983",
  password: "123456",
  firstName: "Le",
  lastName: "Phuong Trung",
  role: "admin",
  address: Mock_User_Address
};

describe("Sunny case: User testing", () => {
  it("findUser work OK", async () => {
    const email = MOCK_USER_DATA_SERVICES.email;
    const User = await userServices.findOne({email});
    expect(User).toBeTruthy();
    expect(typeof User).toBe("object");
    expect(User.email).toBe(MOCK_USER_DATA_SERVICES.email);
    expect(User.username).toBe(MOCK_USER_DATA_SERVICES.username);
    expect(User.password).toBe(MOCK_USER_DATA_SERVICES.password);
    expect(User.firstName).toBe(MOCK_USER_DATA_SERVICES.firstName);
    expect(User.lastName).toBe(MOCK_USER_DATA_SERVICES.lastName);
    expect(User.role).toBe(MOCK_USER_DATA_SERVICES.role);
    expect(User.address[0].city).toBe(Mock_User_Address.city);
  });

  it("sign up is successful", async () => {
    const User = await userServices.create(MOCK_USER_DATA);
    expect(User.email).toBe(MOCK_USER_DATA.email);
    expect(User.username).toBe(MOCK_USER_DATA_SERVICES.username);
    expect(User.password).toBe(MOCK_USER_DATA_SERVICES.password);
    expect(User.firstName).toBe(MOCK_USER_DATA_SERVICES.firstName);
    expect(User.lastName).toBe(MOCK_USER_DATA_SERVICES.lastName);
    expect(User.role).toBe(MOCK_USER_DATA_SERVICES.role);
    expect(User.address[0].city).toBe(Mock_User_Address.city);
    const deleteUser = await userServices.deleteAccount(User.id);
    console.log(deleteUser);
  });
  it("Update information", async () => {
    const password = "123"
    const update = await userServices.update("62ea6997a53d6656a71d4b01",{password});
    expect(update.password).toBe(password);
  });
});

describe("Rainy case: User testing", () => {});
