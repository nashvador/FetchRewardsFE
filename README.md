# Fetch Rewards Frontend Takehome - Nirvignesh Vador Submission

This is my solution for the Fetch Rewards Frontend Takehome Project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have a version of node that is at 16 or past it. If you do not go to this [website](https://nodejs.org/en/) and click on the version recommended for most users. Also make sure that you have an IDE like Visual Studio Code so that you can edit if you want to!

### Installing

In your terminal type these steps in to get the code running:

```
git clone https://github.com/nashvador/FetchRewardsFE.git
cd FetchRewardsFE
npm install
npm start
```

## Technologies Chosen

- Framework: React
- Library: Material-UI
- Testing
    - E2E: Cypress
    - Unit: Jest/react-testing-library
- CI/CD: Github Actions
- Deployment: Netlify
- Versioning: Github Tag Action

## Running Tests

Before running your tests make sure that you have all the prerequisites and have ran ```npm install``` prior to everything.

### E2E Tests

The end to end tests are using Cypress and the main goal of them is to check the functionality of the app. Is everything loading, can you type in fields, does the form prevent submission, etc. To run these tests make sure you open two terminals.

In the first terminal type in ```npm start```, and then in the second terminal type in ```npm run cypress:open```. This will open cypress in your browser, it works best on Google Chrome.

### Unit tests

The unit testing is done with Jest. To check these, type in ```npm run test```.

### Linter

To follow best practices, I used eslint to lint my code. If you are using a windows computer ```npm run lint``` should start up the linter. If you are not, change the scripts in the package.json to ```"lint": "eslint './src/**/*.{ts,tsx}'"```. Then save and start with ```npm run lint``` in your terminal.

## Deployment

To automate the deployments to Netlify, I used Github Actions. All the steps that test and lint are prerequisites to deployment and after deployment I add version tags to each using Github Tag Actions. The live site can be viewed [here](https://fetchrwards-fe-nashvador.netlify.app/).

## Thank You!

Thank you for viewing my project.
