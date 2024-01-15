# ASAPP Chat Backend Challenge v1
### Overview
> WARNING: This project was made in two (2) days, saturday 13 and monday 15. I prioriticed something working (barely) without test, without kubernates, (It has an docker compose but didnt test if it properly works) So you can see what my idea was when I'v been designed the api: functional core imperative shell.

The project works outside of Docker, it needs some mongo instance (not extracted to environment variables the connection string yet), with npm start.

The idea is to have a imperative shell where mutability is needed (input request, output repository connection) and a pure functional core where the Domain is written and lives on.
This idea cames a bit from hexagonal architecture design on object oriented approaches.



### Prerequisites

Installed Nodejs >= v20.x

### How to run it

```
npm start
```

Things I havent had time and I use to do in a real work scenario:

- Use Typescript for type safety and make it easy to work with different inputs
- Probably design IaC on Serverless or Terraform, even I though of using Terraform with Docker provider to "deploy" to Docker containers (and easily switch to a cloud provider in the future)
- Message context can only be "text".
- Validations are missing
- It needs testing as in TDD approach, write first tests then API
- Core doesnt make it clear witch business things are realted to it, make it more clear
- use some library to expose the API swagger-like
- Use Fastify instead of express for up-to-date reasons and performance
- Didn't have time to figure it out how sqlite works and maps, so I used Mongodb, anyway creating a new repository adapter should not be a pain in the a** to switch to.
- Probably I'm missing a lot of mental "to does" in here
- And Finally, again, I havent had so much time to work on it, but I wanted to deliver something anyway.