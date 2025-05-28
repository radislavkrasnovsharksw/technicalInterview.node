# Project Description  
This project implements a Charging Station API. It allows you to:  
- Retrieve all charging stations stored in the database  
- View detailed information about a specific station  
- Search for stations near a given geolocation  

---

## Installation Instructions  

Before installing the project, copy the `.env.sample` file in the root directory and create a `.env` file with your environment variables configured.

You can install and run the project using one of the following methods:

### 1. Local Installation

Ensure you have **Node.js v22.13.1** installed locally, then run:

```
npm install
npm run build
npm start
```

### 2. Docker Installation

Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/), then execute:

```
docker compose build
docker compose up
```


---

Once running, access the API at [http://localhost:5000](http://localhost:5000).  
API documentation is available via Swagger UI at [http://localhost:5000/docs](http://localhost:5000/docs).  

A Postman collection for testing the API is included in the root directory.

---

## Test data  
Please execute seeder script to populate database with testing data.  
You can do this by:  
```
npm run seed
```
or if you use Docker  
```
docker compose exec app npm run seed
```

## Design Approach  

This project follows Object-Oriented Programming principles and adheres to SOLID, DRY, KISS, and YAGNI design philosophies to ensure maintainability and extensibility.

To decouple components and improve modularity, Dependency Injection and Inversion of Control patterns are employed.

For simplicity and ease of testing, SQLite is used as the database engine.

A caching mechanism is implemented to optimize read operations. Since the requirements only specify read operations, cache invalidation on create, update, or delete operations is not implemented. Cache entries expire based on a configurable TTL, and an in-memory cache store is used for simplicity.

---

If you need further assistance or additional documentation, please feel free to reach out.
