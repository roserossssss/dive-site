# Diver Application for Master Liveaboards

## Prerequisites

- Recommended tool: **VS Code**
- Ensure you have **Node.js** and **npm** installed.

## Running the Application(Developer environment):

1. Open your terminal and navigate to the project directory:

   ```
   cd diver-application
   ```

2. Run the environment input command:

   ```
   npm run dev
   ```

## Running the Application (Build Mode for performance testing and test for deployment):

1. Open your terminal and navigate to the project directory:

 ```
cd diver-application
 ```

2. Create a Build environment(Static File)
**Caution, this will re written the previous build mode and /out folders for firebase**
 ```
npm run build
 ```

3. Run the build environment 
 ```
npm start
 ```

## Setting Up/Updating Firebase files (For Deployment):
1. Ensure you are logged in to Firebase:
 ```
firebase login
 ```

2. Initialize Firebase in the project directory (skip if already initialized):
 ```
firebase init
 ```

3. Build the static site for deployment:
 ```
npm run build
 ```

4. Deploy the site to Firebase Hosting(you can change the domain name at the firebase dashboard):
 ```
firebase deploy --only hosting:master-liveaboards-webapp
 ```

## Troubleshoot and stuff:

   Install missing libraries/dependencies
   ```
   npm install
   ```
   
