# Recipe Book Mobile App

A React Native mobile application for managing, browsing, and saving recipes. Features both light and dark mode support with a modern, intuitive interface.

![ScreenRecording_01-22-2025 16-13-55_1](https://github.com/user-attachments/assets/1817d052-e7de-48e1-82c2-2d73077f73d8)



## Features

### Core Functionality
* Browse recipes from external API
* Save favorite recipes locally
* Create custom recipes
* Edit existing recipes
* Delete single or multiple recipes
* Search functionality
* Dark/Light theme support

### React Native Features Used
* `useState` for local state management
* `useEffect` for side effects and data fetching
* `Context API` for global recipe state
* `Stack Navigation` for screen management
* `Expo Router` for routing
* `Image Picker` for recipe photos


### Development Tools
* TypeScript for type safety
* Expo for development and building
* React Native dotenv for environment variables

## Getting Started

1. **Installation**
`npx expo install`

2. **Install Dependencies**
`npm install @react-navigation/native @react-navigation/stack expo-font expo-image-picker`

3. **Start Development Server**
`npx expo start`

4. **Run on Device**
   * Download Expo Go app
   * Scan QR code from terminal
   * Or run on simulator/emulator
5. **Troubleshooting**
If stuck on expo screen, run
`npm uninstall react-native-dotenv`
then
`npx expo start -c`
