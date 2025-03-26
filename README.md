# Welcome to DoList 👋

This is an [Expo](https://expo.dev) project

The alternative was raw React Native which would have taken a lot more time - I have spent well over the 4 hours on this application - but it was really fun and I personally learnt a thing or 2.

## About

This is a todo list application that displays a list from a server, but also allows you to add and delete - from my tests it seems the "complete" action does not work, and you can't add to an available category, but that was the hope. In terms of aesthetics I think I did okay. my personal facorite part was probably the persistance with async storage. This is the first time I have wrapped a reducer with async storage.

## Thoughts

- I couldn't add all the functionality I would have wanted I just didn't have the time, actually I just might have over did it a bit.
- It was my first time using expo usually I setup the app raw will all the ios and android configurations. there were almost no build errors which was amazing, considering what I usually work with.
- It was a great experience for me personally, I think I forget I was actually doing this for a job at one point, and I really enjoyed the work.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Update environment variables

   ```.env
    EXPO_PUBLIC_FETCH_API_URL=https://jsonplaceholder.typicode.com/todos

   ```

3. Setup Expo
   Download the Expo app (follow the expo go link below) and get it ready - simply signup or login

4. Start the app

   ```bash
    npx expo start

    - There should be a link in the terminal that that looks like "exp://<YOUR_IP_ADDRESS>:PORT"
    - Either scane the QR code that appears or go to that link in your browser and it should take you back to Expo and start a build
    - Once the build is complete you should be able to test
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) - with/without expo
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

I recommend Expo Go - it is the easiest way to run the application (I used android studio because I work with android studio, but Expo is much simpler and faster)
PS: it is not always realibly - if you run into such problem please try the other options available(Android emulator, ios emulator)
