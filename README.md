# project-2-ganache
## Tech
This application requires a number of open-source projects to work properly:
- [node.js] - evented I/O for the backend
- [ReactJS] - HTML enhanced for web apps!
- [Truffle Ganache] - Local environment for smart contract
- [MetaMask] - Cryptocurrencies wallet extension for the browser.
## Installation
This application requires the latest [Node.js](https://nodejs.org/), [Ganache - Truffle Suite](https://trufflesuite.com/ganache/) and [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) to run.

### Guide:
- Install Node.js, Ganache and MetaMask from 3 links above.
- Install VSCode or using any other IDE you would like, make sure it is able to run javascript code.
- Open the project folder in VSCode, open the command line and run
```sh
npm install
```
- Open Ganache, press "New Project" and copy the path of truffle-config.js file into truffle project box, then press "Add Project".
- Open MetaMask, create a new wallet follows their own guide.
- Log in to your MetaMask account, switch to Ganache network, then press to your account, find "Import Account" button, press it then select any account provided by Ganache to do set up the local environment for the application.
- Back to the command line in VSCode, run
```sh
truffle migrate
```
- Open 'Contract' tab in Ganache app.
- Copy the contract addresses to the corresponding values in src/common/utils/constants.js
- Now you are enable to start the application using
```sh
npm run dev
```
- If you want to create your own Firebase database, follow their guide on [Firebase](https://firebase.google.com/docs/guides?authuser=0) and change src/common/utils/firebae.js file.
