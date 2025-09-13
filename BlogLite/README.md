# BlogLite – a lightweight blog backend.

>index.js

Defines routes for:

GET /articles → Get all articles

GET /articles/:id → Get a single article by ID

GET /comments → Get all comments

GET /comments/:id → Get a single comment by ID

GET /users/:id → Get a user by ID

Returns appropriate status codes (404 if not found, 500 if server error).
>articles.js

Holds in-memory dummy data (articles, comments, users).

Provides helper functions (getAllArticles, getArticleById, getAllComments, getCommentById, getUserById).
> jest.config.js

Configures Jest for testing.

(Currently written incorrectly, should be testEnvironment: "node" instead of =).
server.js

Starts the server on port 3010.
