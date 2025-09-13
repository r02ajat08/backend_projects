let request = require("supertest");
let {app} = require("../index.js")
let {getAllArticles,getArticleById,getAllComments,getCommentById,getUserById} = require("../articles.js");
let http = require("http");
jest.mock("../articles.js", ()=>({
  ...jest.requireActual("../articles.js"),
  getAllArticles: jest.fn(),
  getArticleById: jest.fn(),
  getAllComments: jest.fn(),
  getCommentById: jest.fn(),
  getUserById: jest.fn(),
}));
let server;
beforeAll((done)=>{
  server= http.createServer(app);
  server.listen(3000,done);
});
afterAll((done)=>{
  server.close(done);
});
describe("API Error handling test", ()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });
  it("GET /articles should return 404 if no articles are found", async ()=>{
    getAllArticles.mockReturnValue([]);
    let res = await request(server).get("/articles");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("No articles found");
  });
  it("GET /articles/:id should return 404 if no articles are found", async ()=>{
    getArticleById.mockReturnValue(null);
    let res = await request(server).get("/articles/898");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Article not found");
  });
  it("GET /comments should return 404 if no comments are found", async ()=>{
    getAllComments.mockReturnValue([]);
    let res = await request(server).get("/comments");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("No comments found");
  });
  it("GET /comments/:id should return 404 if no comments are found", async ()=>{
    getCommentById.mockReturnValue(null);
    let res = await request(server).get("/comments/898");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Comment not found");
  });
  it("Get /users/:id should return 404 id users found", async ()=>{
    getUserById.mockReturnValue(null);
    let res = await request(server).get("/users/898");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("user not found")
  })
})