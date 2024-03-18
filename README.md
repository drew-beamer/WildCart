# WildCart

## Description

WildCart is a platform for Davidson College students to trade or purchase items from each other. Safety and security are out top priorities, and we are working on solutions to ensure trust within our community.

### Motivation

We noticed how much waste from reusable items is generated at the end of each semester during move-out. We want to provide a platform where people can exchange items they no longer want/need for items they do want/need. Second, we wanted to create a platform enabling Davidson College students to trade with each other in a safe and secure manner. As scams are seemiingly prevelant on other, more general platforms, we seek to provide a solution based on trust and community.

## Installation

### Prerequisites

- Node.js
- mongodb-community (install directions included below)

### Instructions

#### Setting up the Local Environment

To install mongodb-community, follow the instructions for your operating system on the [MongoDB website](https://www.mongodb.com/docs/manual/administration/install-community/).

We recommend using MongoDB Compass to interact with the database. It can be downloaded from the [MongoDB website](https://www.mongodb.com/products/tools/compass) as well.

Once these prerequisites are installed, open Compass and connect to your local database. Create a new database called `wildcart`, and a collection called `posts`. This collection is where posts will be stored, further collections will be
created via mongoose (one is required for the database to exist).

Now, create a file called `.env.local` in the root directory of the project. This file currently contains the following variables:

- `MONOGO_URI`: The URI for the MongoDB database. This should be `mongodb://localhost:27017/wildcart` if you are using a local database, and followed the instructions above.

#### Running the Server

1. Clone the repository
2. Navigate to the `next-app` directory, and run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

## Team

- **Product Manager**: Toffy
- **Scrum Master**: Drew
- **Developers**: Jerry, Allen
