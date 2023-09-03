### Assignment No: 08

# A Book Catalog Backend Server

<hr>
### Server Description:

This is a book catalog backend server, powered by Express.js , Prisma and postgreSQL for database , serves as the backbone of a digital library or bookstore, enabling efficient management of a diverse collection of books. This server offers a comprehensive set of API endpoints, allowing users to perform actions such as see all books, categories also adding new order, conducting searches, and admin can managing user accounts also create new book, update , delete etc..

It seamlessly integrates with a relational database to store book-related data and leverages Prisma as an ORM to simplify database interactions. Security measures, including authentication, authorization, and data validation, are employed to protect sensitive data and ensure only authorized users access certain functionalities. error handling, logging, and thorough documentation enhance the server's reliability and maintainability. This server facilitates the growth and scalability of the book catalog, making it an essential component for online book-related services.

### Technology Stack:

- TypeScript as the Programming Language.
- Express.js as the web framework.
- Prisma as the Object Relational Mapping (ORM)
- postgreSQL as the database

### Live Link: https://example.com

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
- api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- api/v1/categories/6177a5b87d32123f08d2f5d4 (PATCH)
- api/v1/categories/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)

<br/>
<br/>

## Instructions to Run the Project:

To run the Book Catalog Backend Server project on your local machine, follow these steps:

# Installation:

Ensure you have latest Node.js, Typescript, postgresql and npm (Node Package Manager) installed on your machine. You can download them from the official Node.js website: https://nodejs.org/  
<br/>
Step 1: Clone the Repository

```bash
git clone https://github.com/shourovr82/rexrox-tech.git
```

Step 2: Navigate to the project folder:

```bash
cd book-catalog
```

step 3: use yarn for install all the required dependencies using yarn

```bash
yarn
---or---
yarn install
```

Step 4: Set Environment Variables
Create a .env.local or .env file in the root directory and set the necessary environment variables. For example, you might need to set API keys or database connection strings. Be sure to check the documentation for any specific requirements.

<br/>
Step 5: Start the Development Server
Run the following command to start the development server:

```bash
yarn start
---or---
yarn dev
```

<br/>

Step 6: Access the Website <br/>
Once the development server is up and running, open your web postman and set route http://localhost:6000/api/v1 to access the book catalog backend server api.

<br/>
Step 7: Use the backend!
You can now explore the book catalog

Remember that these instructions are general, and the actual steps may vary based on the project's specific setup. Be sure to consult any project-specific documentation or README files for additional information.

Happy Book Search and Book Order!

Shafinur Islam
