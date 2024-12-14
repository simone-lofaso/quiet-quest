# Quiet Quest

## GitHub Repository SRC Link

[Quiet Quest](https://github.com/simone-lofaso/quiet-quest.git)

## How to Set Up/Run Quiet Quest:

1. Clone the git repository using the code in your terminal:

```jsx
git clone https://github.com/simone-lofaso/quiet-quest.git
```

- Additional information on how to clone a GitHub project are provided in the "More Commands" section of the README

2. Installations that are needed to run the project:

```jsx
npm install expo
npm i
npm i firebase
npm i ionicons
npm i react-native-navigation
npm i @firebase/firestore
npm i react-native-vector-icons
```

3. Set up Firebase

- Go to console
- Create a new project
- Project name: quiet-quest
- Add a web app (Name: quiet-quest)
- Add a iOS app (Name: com.cmpe.quiet-quest)
- Click on the web app settings
  - Create a config file in VS Code called firebase.js
  - ```jsx
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";
    import firebase from "firebase/app";
    ```
  - Include the above imports
  - Copy and paste the given npm code on Firebase containing the firebaseConfig into firebase.js

4. API keys used (for testing purposes API key is included):

- Google Maps API
- Geoapify Places API

5. Run Quiet Quest:

- In your terminal, type in the commands

```
cd quiet-quest
npm start
```

- Download the Expo Go app onto your iPhone (iOS is only supported)
- Scan the QR code provided in the terminal
- The app should open
- Sign Up and make a new account
- Check your email that you signed up with and verify the email address
- Go back into the Expo Go app and login
- Take the initial quiz to find out interests, mood levels, and comfort levels
- Redirect to maps page with generated recommendations
- Tap on a recommendation pin and the information provided
  - A pop up should appear asking if you want to "Save Recommendation" or "Cancel"
  - If you save the recommendation you will be able to view the saved recommendation in the Bookmarks Page
  - If you want to delete the saved recommendation from your bookmarks, click on the trash-outline button
- Go back to the home page and retake the quiz

# More Commands

## Git Cloning Project:

1. Open your terminal
2. If you are in Desktop directory, do:

```jsx
git clone https://github.com/simone-lofaso/quiet-quest.git
```

If you already created a folder make sure it's labeled differently from quiet-quest so that you don't get confused later.

3. Open vs code

```jsx
code .
```

4. In VS Code, open a new terminal but before typing anything into the terminal, make sure you're in the Quiet Quest folder

```jsx
cd quiet-quest
```

5. once you're in the Quiet Quest folder, in the terminal input:

```jsx
npm i
```

6. Run the expo project

```jsx
npx expo start
```

7. In terminal once expo is running type "w" so it opens in the web browser.

## How to Merge:

1. Switch to Main Branch

```
git checkout main
```

2. Update Main

- May need to do npm install

```
git fetch origin
git pull origin main
```

3. Merge the Branch you want into Main

- Replace '<branch-name>' with the branch you want to merge

```
git merge <branch-name>
```

4. Push to main

```
git add .
git commit -m "add comment"
git push
```

5. Ensure all team members have pulled the most recent code in main, or else it can result in errors.

6. Create new branch you want to work on with the new updated main.

## Logo Inspiration:

- Gained inspiration from [Pillow Lab](https://www.vistaprint.com/logomaker/ideas/pillow-logos)
