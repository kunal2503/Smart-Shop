import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import  PrivateRoute  from "./pages/PrivateRoute";
import LoginPage from "./pages/Login/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import CheckoutPage from "./pages/CheckOutPage";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrder";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer"
import ForgetPassword from "./pages/ForgetPassword";
import ForgotPasswordRequest from "./pages/ForgotPasswordRequest";
import ResetPassword from "./pages/ResetPassword";
import ProfileInfo from "./pages/profileInfo";
import ChatBot from "./components/ChatBox"
import OrderDetails from "./pages/OrderDetails"
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import { AdminUsers } from "./pages/AdminUsers";
import PrivateAdminRoute from "./pages/PrivateAdminRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/My-Orders" element={<MyOrders />} />
          <Route path="/Change-password" element={<ForgetPassword />} />
          <Route path="/forgot-password" element={<ForgotPasswordRequest />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile-info" element={<ProfileInfo />} />
          <Route path="/chat-With-us" element={<ChatBot />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/admin-dashboard" element={
            <PrivateAdminRoute>
              <AdminDashboard/>
            </PrivateAdminRoute>
             } />;
          <Route path="/admin-orders" element={
            <PrivateAdminRoute>
            <AdminOrders/>
            </PrivateAdminRoute>
            } />;
          <Route path="/admin-users" element={
            <PrivateAdminRoute>
            <AdminUsers />
            </PrivateAdminRoute>
            } />;  
        </Routes>
        <Footer/>
      </Router>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
