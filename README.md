# WebApp Readme

Hello and welcome to our web app project. This document will guide you through the installation and startup process of our web application on both client and server-side.

## Prerequisites

You'll need Node.js (which comes with npm) installed on your computer. If you don't have Node.js installed, you can get it from [here](https://nodejs.org/).

## Installation Process

Our web application consists of two major parts: the client and the server. They are located in two separate directories, both of which need to install their own dependencies.

**Step 1:** Clone the repository to your local machine using git as follows:

```
git clone [repository URL]
```

Replace `[repository URL]` with the actual URL of this repository.

**Step 2:** Navigate to the client directory. This directory contains the front-end of our application.

```
cd client
```

**Step 3:** Run the npm install command in the client directory. This will install all the necessary dependencies that are defined in the package.json file.

```
npm install
```

**Step 4:** Now, navigate to the server directory.

```
cd ../server
```

**Step 5:** Repeat the npm install command in the server directory. This will install the necessary server-side dependencies.

```
npm install
```

## Running the application

After you have installed all the dependencies in both directories, you are now ready to run the application.

To do this, you will need to start both the client-side and server-side applications using npm.

**Step 6:** Start the client-side application. Navigate back to the client directory if you're not already there.

```
cd ../client
```

Then, run the following command:

```
npm run dev
```

This should start your client-side application in development mode. You should see output indicating that the client-side app is running and listening for connections.

**Step 7:** In a new terminal window or tab, navigate to the server directory.

```
cd ../server
```

And run the following command:

```
npm run dev
```

This should start your server-side application in development mode. You should see output indicating that the server-side app is running and listening for connections.

Now both applications should be running concurrently. You should be able to navigate to the specified localhost port in your web browser to interact with the application.

Happy coding!

## Troubleshooting

In case you encounter any issues while following the steps, please ensure you have the latest version of Node.js and npm installed on your machine. Also, check the package.json files in both directories to ensure the "dev" scripts are defined.

If problems persist, please open an issue in the repository or contact us for support.
