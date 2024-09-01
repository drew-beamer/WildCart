# 🐱🛒 WildCart 🛒🐱 

## Description

WildCart is a platform for Davidson College students to trade or purchase items from each other. Safety and security are out top priorities, and we are working on solutions to ensure trust within our community. WildCart functions by having users create posts, which they can mark if they are interested in selling or trading. Users of the platform can then make offers on these posts. The poster can view these offers, pick the one most appealing to them, and be put in contact with the offerer.

### Motivation

We noticed how much waste from reusable items is generated at the end of each semester during move-out. We want to provide a platform where people can exchange items they no longer want/need for items they do want/need. Second, we wanted to create a platform enabling Davidson College students to trade with each other in a safe and secure manner. As scams are seemiingly prevelant on other, more general platforms, we seek to provide a solution based on trust and community.

### Screenshots
### Main User Page
<img width="769" alt="截屏2024-09-01 下午3 50 09" src="https://github.com/user-attachments/assets/00e8646a-a25d-4910-8b08-8ff0a09b4584">\

### Market Page
<img width="769" alt="截屏2024-09-01 下午3 50 25" src="https://github.com/user-attachments/assets/b98c29f5-2454-48f9-b9e4-6c0e205c7d50">\

### Post Creation Form
<img width="300" alt="截屏2024-09-01 下午3 50 47" src="https://github.com/user-attachments/assets/3347224c-4c3b-4942-861b-7038d42983c6">\

### Trade Offer Form
<img width="300" alt="截屏2024-09-01 下午3 51 03" src="https://github.com/user-attachments/assets/8c231b09-4e00-4a3b-bd62-cddf86539cbd">\

## Installation

### Prerequisites

- Node.js
- mongodb-community (install directions included below)

### Instructions

#### Setting up the Local Environment

To install mongodb-community, follow the instructions for your operating system on the [MongoDB website](https://www.mongodb.com/docs/manual/administration/install-community/).

We recommend using MongoDB Compass to interact with the database. It can be downloaded from the [MongoDB website](https://www.mongodb.com/products/tools/compass) as well.

Once these prerequisites are installed, open Compass and connect to your local database. Create a new database called `wildcart`, and a collection called `posts`. This collection is where posts will be stored, further collections will be created via mongoose (one is required for the database to exist).

Now, create a file called `.env.local` in the root directory of the project. This file currently contains the following variables:

- `MONGODB_URI`: The URI for the MongoDB database. This should be `mongodb://localhost:27017/wildcart` if you are using a local database, and followed the instructions above.
- `AUTH_SECRET`: A secret key used to sign JWT tokens. This can be any string.

Do the same for `.env.test`

After setting up the mongo environment, create a .txt file called `bad-words.txt` in the root directory of the project. This file will include the banned words for the post filting functionality.

#### Running the Server

1. Clone the repository
2. Navigate to the `next-app` directory, and run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

## Team/Credits

- **Product Manager**: Toffy
- **Scrum Master**: Drew
- **Developers**: Jerry, Allen
