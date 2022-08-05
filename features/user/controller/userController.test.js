const request = require("supertest");

const app = require("../../../app");
const DB = require("../../../Database/connect");
const UserModel = require("../../../Database/models/User");
const AuthServices = require("../services/AuthServices");

const MOCK_USER_DATA = {
  email: "trunglp20015@gmail.com",
  password: "123456",
  fullname: "trung",
  role: "admin",
};

const MOCK_USER_DATA_NO_DEL = {
    email: "trunglp20017@gmail.com",
    password: "123456",
    fullname: "trung",
    role: "admin",
  };

beforeAll(() => {
  DB.connectDatabase();
});

afterAll(() => {
  DB.disconnectDatabase();
});

describe("POST /users/register ", () => {
  test("return response status is 200", async () => {
    const response = await request(app)
      .post("/users/register")
      .send(MOCK_USER_DATA_NO_DEL)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.email).toEqual(MOCK_USER_DATA_NO_DEL.email);
    const id = (await UserModel.findOne({email: MOCK_USER_DATA_NO_DEL.email}))._id;
    const deleteUser = await AuthServices.deleteAccount(id);
  });
  test("return response status is 400", async () => {
    const response = await request(app)
      .post("/users/register")
      .send(MOCK_USER_DATA)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.text).toEqual("user already exist");
  });
});

describe("POST /users/login ", () => {
  test("check empty email or password return response status is 400", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: "",
        password: MOCK_USER_DATA.password,
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.text).toEqual("empty email or password");
  });
  test("check User does not exist or been disabled return response status is 403", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: "156181@21584gmail.com",
        password: MOCK_USER_DATA.password,
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Can't find any user");
  });
  test("check Invalid password return response status is 401", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: "trunglp20015@gmail.com",
        password: "12123sdasd",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(401);
    expect(response.text).toEqual("Password is not valid");
  });
  test("return response status is 200", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: MOCK_USER_DATA.email,
        password: MOCK_USER_DATA.password,
      })
      .set("Accept", "application/json");
    expect(response.cookies).toBe(MOCK_USER_DATA.access_200);
    expect(response.status).toBe(200);
    expect(response.text).toEqual("Login successfully !!!");
  });
});
