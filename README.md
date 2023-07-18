# _archblog-backend
This is the backend for my personal blog. The goal is to make an API for my [website frontend](https://kamiliarsyad.vercel.app) to interact with.
The project is made using ExpressJS and the database used is MongoDB's Atlas.

## Documentation
The documentation for this API can be found in the docs folder. It is a OpenAPI 3.0 specification file. An interactive version of the documentation
can be accessed in the [`/api/docs`](https://archblog-backend-production.up.railway.app/api/docs) route. Here is a screenshot of the documentation:
[](public/images/docs.png)

## build your own
If you want to clone this and setup your own blog API, don't forget to add your own .env file in the root of the project
and add the appropriate links (database uri, environment mode, etc.). You might also want to delete the models, controllers, and routers
pertaining to anything other than the normal blog posts since mine is mixed with other personalized features of my API.

Additionally, modify the appropriate config files for setting up your database.
