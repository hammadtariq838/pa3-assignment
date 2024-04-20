import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import BrowseScreen from './screens/BrowseScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import CreateAuctionScreen from './screens/CreateAuctionScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import Navbar from './components/Navbar.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import SpecificAuctionScreen from './screens/SpecificAuctionScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ChangePasswordScreen from './screens/ChangePasswordScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="browse" element={<BrowseScreen />} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="create-auction" element={<CreateAuctionScreen />} />
        <Route path="change-password" element={<ChangePasswordScreen />} />
        <Route
          path="auctions/:id"
          element={<SpecificAuctionScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
