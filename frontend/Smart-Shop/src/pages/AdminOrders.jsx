import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/api";

const AdminOrders = () => {
     const [orderStatusUpdates, setOrderStatusUpdates] = useState({});
      const [orders, setOrders] = useState([]);

      useEffect(() => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user?.role !== "admin") {
            toast.error("Access denied");
            // navigate("/"); // Redirect non-admin users
          }
          fetchOrders();
        }, []);
      

    const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
