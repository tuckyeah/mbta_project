# MBTA Departure Finder

## Some Brief Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Below, you will find the generic README content generated by Create React App, including the basic
commands needed to run the program (i think it should be as straightforward as cloning and doing an `npm start`).

I've chosen to do this project in React because it is the framework I've spent the most time in, and the challenge spec struck me as best suited for a Single Page App. I briefly considered setting up an API using Python to demonstrate my fullstack skills, but upon further consideration, I realized such a step would be essentially redundant - we would be putting a simple wrapper around an existing API with no value add. While there are certainly use cases for doing such a thing (load balancing, aggregating data from multiple sources, providing certain auth functionalities, etc), it seemed a bit like overkill for these purposes.

This project does include several test cases, built using the Jest & React Testing Library. These tests are fairly specific to the tool as a SPA and focus on the rendering (or lack thereof) of certain page elements to indicate if data has properly loaded (or not loaded). They test some error handling, but there is room to expand here to make these tests more robust.

This challenge was a delight, and I had a lot of fun with it!

Relevant Files with Code:
- [App.js](https://github.com/tuckyeah/mbta_project/blob/main/src/App.js) - Top-level/entry point into app.
- [PageContainer.js](https://github.com/tuckyeah/mbta_project/blob/main/src/PageContainer.js) - Wrapper for page, bulk of logic lives here.
- [ListsContainer.js](https://github.com/tuckyeah/mbta_project/blob/main/src/ListsContainer.js) - Lists container which houses the logic for displaying which list/add'l text information.
- [ListComponent.js](https://github.com/tuckyeah/mbta_project/blob/main/src/ListComponent.js) - Represents an individual list of data.

## Aforementioned Boilerplate README content

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

