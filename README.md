# 🚅 *Nexus-Express* 

All aboard for some sweet `GraphQL` action. 

**Nexus-Express** is lightweight `Node`-`Typescript`-`Express`-`Prisma`-`Nexus`-`GraphQL` quick-starter. It is a repository that you can fork/clone to start quickly iterating on an API backend.\
Based on [**Prisma-Express**](https://github.com/JACK-COM/prisma-express), which was originally forked from [**AWallace's quick starter**](https://github.com/vawallace/base-node-express).

---

- [🚅 *Nexus-Express*](#-nexus-express)
  - [Contents](#contents)
  - [Getting Started](#getting-started)
    - [Installing dependencies](#installing-dependencies)
    - [Configuration](#configuration)
    - [Database | Prisma](#database--prisma)
    - [Database | Nexus](#database--nexus)
  - [Running locally](#running-locally)
    - [GraphQL Queries](#graphql-queries)
  - [Folder architecture](#folder-architecture)
  - [Contributing](#contributing)

---

## Contents

- Node + Typescript
- Node Express (server framework)
- Apollo-Express Server (server framework for graphql)
- GraphQL (data querying language + framework)
- Prisma (database management framework)
- Nexus (a framework for integrating GraphQL and Prisma)

Familiarity with all of the above frameworks (or the confidence to approach their documentation) is recommended. 

---

## Getting Started
### Installing dependencies
Fastest way to get the repo is to fork. If cloning, be sure to unlink from this repository *before* you install NPM dependencies.
```bash
$. rm -rf .git/ && git init && npm install 
```

This gets out of the way so you can configure what matters. You will need to
* Create a database (using one of Prisma's supported providers -- see [**Database**](#database--prisma))
* Sync `Prisma` to the project following their documentation

### Configuration

1. Create a new file `{ProjectRoot}/.env` 
2. Copy Contents from `{ProjectRoot}/env.sample` 
3. Generate random values for the `JWT_SEC` and `ENCRYPT` constants.

### Database | Prisma
If you don't have it installed, you will want to `npx prisma && npx prisma init` to get [Prisma]() on your machine.\
Then you can follow the next steps:
1. Set the `DATABASE_URL` in the `.env` file to point to your existing database.\
   If your database has no tables yet, read https://pris.ly/d/getting-started.\
   The end result should look something like this:
   ```
   DB_URL="postgresql://username:password@localhost:5432/database_name"
   ```
2. Set the `provider` of the `datasource` block in schema.prisma to match your database.\
   The example in (1) would use `postgresql`: Prisma also supports `mysql`, `sqlite`, `sqlserver` and `mongodb`: 
3. **Check the `schema.prisma` file**. It only contains model definitions for a single `Users` table.\
   You can alter the table to your liking, or add more tables if you wish. Take care of this part before syncing the database.
   > The `schema.prisma` file can be changed often. However, breaking changes may wipe your seed data if you use `prisma db push`
4. Run `npx prisma db push` (mapped to `npm run prisma-sync`) to create tables in your database from the **Prisma** schema.
5. Run `npx prisma generate` to generate the Prisma Client. You can now access your database.

> Unless otherwise noted, everything you see in this repo is a **suggestion**. You can reorganize the directories and change/add/remove tables as much as you need.

### Database | Nexus
Connect your Prisma `models` to **graphQL** by defining Nexus `objects` (examples can be found in [`src/graphql/objects/`](src/graphql/objects/)) . Once created or changed, these `objects` will be used to generate your graphql [schema](src/graphql/schema/), as well as typedefs that can either be imported or used by your IDE in type-checking.


---

## Running locally
The project expects a `PORT` to be defined in your `.env` file. If one is not found, it will default to `4001`.
```bash
$. npm run start
```

---

### GraphQL Queries
Once your server is running, you can access `graphiQL` at `http://localhost:4680/graphql`. The repo uses `Apollo Server`, and the landing page has not been customized: you should see a message allowing you to visit `https://studio.apollographql.com/sandbox/explorer` with an embedded connection to your local instance. 


---
## Folder architecture
`Nexus` docs offer two options for organizing your files:
1. **Modular**: self-contained sections with all the information about a new `object` (e.g. when you want to add SDL data for a new database model)
2. **Not modular**: files split up by responsibilities (e.g. `Queries`, `Mutations`, etc)

This repo uses a hybrid solution for its single `Users` table:
- There is a core [`User.ts`](src/graphql/objects/User.ts) file that contains the `User` and other object definitions for graphQL
- It imports functions from dedicated [`user.mutations`](src/graphql/mutations/user.mutations.ts) and [`user.queries`](src/graphql/queries/user.queries.ts) files
  
  
You can either 
- Collapse this into a single style (by moving the external functions into `User.ts`), or 
- Fully split it up by moving the `Mutation` and `Query` object definitions to their respective (`user.mutations` or `user.queries`) files, or
- Stay the course (*I* won't judge you)

---


## Contributing
Any and all suggestions and pull requests are welcome. 
