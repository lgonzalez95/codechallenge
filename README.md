# UI Code Challenge
Code challenge which contains two automated tests using WebDriverIO


## Pre requisites
1. NodeJs
2. Code editor

## Setup

### Download and install NodeJS:
The installation can be perform using the page: [NodeJs](https://nodejs.org/en)

### Install the required dependencies of the project
1. Open a new terminal
2. Make sure the terminal location in the codechallenge folder
3. Run the command `npm install`

## Running the automated tests:
1. From the same opened terminal, run the command: `npm run test-ui`
2. Wait until the execution finishes
3. Check the results


### Assumptions
Some validations were not performed since the elements might not always be displayed:

1. Images might not be displayed for some searches.
2. Labels displayed after the search might not be displayed as well.
3. For all search results, they should include the searched keyword