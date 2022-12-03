const request = require("supertest");
const app = require("../server");
const User = require("../Models/UserModel");
const Room = require("../Models/RoomModel") 
const { userOneId, userOne, userTwo, roomOne, roomTwo, setupDatabase, closeConnectDB } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send( {
          username: 'test@test12345.pl',
          email: 'test@test12345.pl',
          password: '123456789!',
      })
      .expect(201);
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
  });

  test("Should not create user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send( {
          username: '',
          email: '',
          password: '',
      })
      .expect(400);
  });

  test("Should login user", async () => {
    const response = await request(app)
      .post(`/api/users/login`)
      .send( {
        email: userTwo.email,
        password: userTwo.password,
      })
      .expect(200);
    expect(response.body.token).not.toBeNull();
  });

  test("Should not login user", async () => {
    const response = await request(app)
      .post(`/api/users/login`)
      .send( {
        email: userTwo.email,
        password: 'wrongpassword',
      })
      .expect(400);
  });


  test("Should create room", async () => {
    const response = await request(app)
      .post("/api/rooms")
      .send( {
          roomName: 'testroom102',
          password: '123123123!',
          gameType: 'puns',
      })
      .expect(201);
  });

  test("Should not create room", async () => {
    const response = await request(app)
      .post("/api/rooms")
      .send( {
        roomName: 'testroom102',
        password: '',
        gameType: 'puns',
      })
      .expect(400);
  });

  test("Should join to room", async () => {
    const response = await request(app)
      .post(`/api/rooms/join`)
      .send( {
        roomName: roomTwo.roomName,
        password: roomTwo.password,
      })
      .expect(200);

  });

  test("Should not join to room", async () => {
    const response = await request(app)
      .post(`/api/rooms/join`)
      .send( {
        roomName: 'testroom',
        password: 'password',
      })
      .expect(400);
  });


  afterAll(closeConnectDB);