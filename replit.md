# Expo React Native Web App

## Overview
This is an Expo React Native project configured to run on the web platform in the Replit environment. It uses Expo Router for file-based routing and React 19 with the new React Compiler enabled.

## Project Setup
- **Framework**: Expo ~54.0.25 with React Native 0.81.5
- **Routing**: Expo Router with file-based routing
- **Language**: TypeScript with strict mode enabled
- **React Version**: React 19.1.0
- **Build System**: Metro bundler

## Recent Changes (November 28, 2025)
- Installed npm dependencies
- Configured Expo web server to run on port 5000 with host verification disabled for Replit proxy
- Set up environment variable `EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0`
- Created metro.config.js for bundler configuration
- Configured deployment with static export to `dist` directory
- Project successfully running and accessible via Replit webview

## Project Architecture

### Directory Structure
```
├── app/                    # Expo Router file-based routing
│   ├── _layout.tsx        # Root layout component
│   └── index.tsx          # Home screen
├── assets/                # Images and static assets
│   └── images/           # App icons and images
├── helpers/              # Utility functions
│   └── common.js
├── app.json              # Expo configuration
├── metro.config.js       # Metro bundler configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

### Key Features
- **New Architecture Enabled**: Using React Native's new architecture
- **React Compiler**: Experimental React compiler enabled for optimization
- **Typed Routes**: TypeScript-based routing with type safety
- **Edge-to-Edge**: Android edge-to-edge display enabled
- **Web Support**: Static web build output configured

## Development

### Running the App
The app is configured to run automatically via the Expo Web Server workflow:
- Port: 5000
- Command: `EXPO_WEBPACK_DISABLE_HOST_CHECK=true npx expo start --web --port 5000`
- The workflow is set up to disable host checking for Replit's proxy environment

### Available Scripts
- `npm start` - Start Expo development server
- `npm run web` - Start web development server
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset to a blank project

### Environment Variables
- `EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0` - Configured for Replit environment
- `EXPO_WEBPACK_DISABLE_HOST_CHECK=true` - Disables host checking for proxy compatibility

## Deployment
The project is configured for static deployment:
- **Build Command**: `npx expo export -p web`
- **Output Directory**: `dist`
- **Deployment Type**: Static hosting
- The static build exports the web app for production deployment

## Notes
- The project uses React 19 which is a major version update with new features
- React Compiler is experimental and may have edge cases
- The app is configured specifically for the Replit environment with proper host and proxy settings
- All dependencies are installed and the development server is running successfully
