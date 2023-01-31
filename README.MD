# PaisBank - React Native Expo App

## 🚀 Tech Features

- React Native
- Expo
- Typescript
- React Native Stylesheet
- Moti Animations
- Axios to API request
- React Navigation
- Redux Toolkit
- Eslint
- Prettier

## 🚀 Getting Started

- Download or clone the repository
```bash
  git clone https://github.com/cristhianpabon/RN-expo-PaisBank.git
```

- Go to the project directory
```bash
  cd PAISBANK
```
- Create the .env file on the root of the project.
```
  .env
```

- Add this variables enviroment variable
(Make sure that you have all the URL, otherwise you will have errors getting data from the API's)

```
REACT_APP_LOGIN_URL=
REACT_APP_CARDS_URL=
REACT_APP_TRANSACTIONS_URL=
REACT_APP_CONTACTS_URL=
REACT_APP_KEY=
```

(the strings for the enviroment variables are inside of the postman.json)

- Import the JSON on Postman that is inside of the "postman" folder so you can check the how to hit the services.

- Your babel.config.js should look like this

```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  };
};
```

- Install all the dependencies, run the next command

```
  npm install
```

- Run the server, for IOS run the next command

```
  npm run ios
```

- Run the server, for Android run the next command

```bash
  npm run android
```
