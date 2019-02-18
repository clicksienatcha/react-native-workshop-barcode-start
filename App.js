import React from "react";
import { createStackNavigator } from 'react-navigation';
import HomePage from "./pages/home.page";
import ScannerPage from "./pages/scanner.page";


const App = createStackNavigator({
  Home: { screen: HomePage },
  Scanner: { screen: ScannerPage }
});


export default App;