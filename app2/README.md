# Recipe Book Mobile App

A React Native mobile application for managing, browsing, and saving recipes. Features both light and dark mode support with a modern, intuitive interface.

![App Screenshot Placeholder]

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

## Technical Stack

### Core Dependencies


### Development Tools
* TypeScript for type safety
* Expo for development and building
* Jest for testing
* React Native dotenv for environment variables

## Project Structure

### Key Components
1. **Screens**
   * SavedScreen: View and manage saved recipes
   * BrowseScreen: Search and browse recipes from API
   * RecipeDetails: View detailed recipe information
   * NewRecipe: Create new recipes
   * EditRecipe: Modify existing recipes

2. **Context**
   * RecipeContext: Global state management for recipes

3. **Components**
   * RecipeCard: Reusable recipe display component
   * RecipeHeader: Navigation header with actions
   * RecipeContent: Detailed recipe view component

## Getting Started

1. **Installation**
npx expo install

2. **Install Dependencies**
npm install @react-navigation/native @react-navigation/stack expo-font expo-image-picker


3. **Start Development Server**
npx expo start


4. **Run on Device**
   * Download Expo Go app
   * Scan QR code from terminal
   * Or run on simulator/emulator
