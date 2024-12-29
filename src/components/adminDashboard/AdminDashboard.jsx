import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Car,
  UserCheck,
  DollarSign,
  PlusCircle,
  Clock,
  Settings,
  Activity,
  CheckCircle,
  XCircle,
  User,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDrivers: 0,
    totalCars: 0,
    onlineDrivers: 0,
    pendingDrivers: [],
  });

  const [allDrivers, setAllDrivers] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'drivers', 'cars'

  // Static revenue data
  const revenue = {
    daily: 2500,
    monthly: 75000,
  };

  useEffect(() => {
    fetchStats();
    fetchAllDrivers();
    fetchAllCars();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch drivers
      const driversResponse = await fetch("/api/drivers");
      const driversData = await driversResponse.json();

      // Fetch cars
      const carsResponse = await fetch("/api/rental-cars");
      const carsData = await carsResponse.json();

      // Calculate stats
      const drivers = driversData.data || [];
      const onlineDrivers = drivers.filter(
        (driver) => driver.status === "Online"
      );
      const pendingDrivers = drivers.filter(
        (driver) => driver.status === "pending"
      );

      setStats({
        totalDrivers: drivers.length,
        totalCars: (carsData.data || []).length,
        onlineDrivers: onlineDrivers.length,
        pendingDrivers: pendingDrivers,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchAllDrivers = async () => {
    try {
      const response = await fetch("/api/drivers");
      const data = await response.json();
      setAllDrivers(data.data || []);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchAllCars = async () => {
    try {
      const response = await fetch("/api/rental-cars");
      const data = await response.json();
      setAllCars(data.data || []);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleVerifyDriver = async (driverId, status) => {
    try {
      const response = await fetch(`/api/drivers/${driverId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        window.alert("Changed Successfully");
        fetchStats();
        fetchAllDrivers();
      }
    } catch (error) {
      console.error("Error updating driver status:", error);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <Icon className={color} size={24} />
        <h3 className="ml-3 text-sm font-medium text-gray-600">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  const getStatusBadge = (status) => {
    const classes = {
      Online: "bg-green-100 text-green-800",
      Offline: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          classes[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50">
              <Settings className="text-gray-600" size={20} />
            </button>
            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50">
              <Activity className="text-blue-500" size={20} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Drivers"
            value={stats.totalDrivers}
            color="text-blue-500"
          />
          <StatCard
            icon={Car}
            title="Total Cars"
            value={stats.totalCars}
            color="text-green-500"
          />
          <StatCard
            icon={UserCheck}
            title="Online Drivers"
            value={stats.onlineDrivers}
            color="text-indigo-500"
          />
          <StatCard
            icon={DollarSign}
            title="Daily Revenue"
            value={`$${revenue.daily}`}
            color="text-emerald-500"
          />
          <StatCard
            icon={DollarSign}
            title="Monthly Revenue"
            value={`$${revenue.monthly}`}
            color="text-indigo-500"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "overview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "drivers"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("drivers")}
          >
            All Drivers
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "cars"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("cars")}
          >
            All Cars
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pending Driver Verifications */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <UserCheck className="text-blue-500 mr-2" size={20} />
                <h2 className="text-lg font-semibold text-gray-700">
                  Pending Driver Verifications
                </h2>
              </div>
              <div className="space-y-4">
                {stats.pendingDrivers.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No pending verifications
                  </p>
                ) : (
                  stats.pendingDrivers.map((driver) => (
                    <div
                      key={driver._id}
                      className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-gray-700">
                          {driver.personalInfo?.firstName}{" "}
                          {driver.personalInfo?.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {driver.personalInfo?.phone}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleVerifyDriver(driver._id, "Online")
                          }
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button
                          onClick={() =>
                            handleVerifyDriver(driver._id, "rejected")
                          }
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <XCircle size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <PlusCircle className="text-purple-500 mr-2" size={20} />
                <h2 className="text-lg font-semibold text-gray-700">
                  Quick Actions
                </h2>
              </div>
              <div className="space-y-4">
                <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                  <Car className="mr-2" size={20} />
                  Add New Car
                </button>
                <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                  <Users className="mr-2" size={20} />
                  Add New Driver
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "drivers" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allDrivers.map((driver) => (
                  <tr key={driver._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {driver.personalInfo?.firstName}{" "}
                            {driver.personalInfo?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {driver._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {driver.personalInfo?.phone}
                      </div>
                      <div className="text-sm text-gray-500">
                        {driver.personalInfo?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(driver.status)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() =>
                          handleVerifyDriver(driver._id, "Offline")
                        }
                      >
                        Set Offline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "cars" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price/Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allCars.map((car) => (
                  <tr key={car._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {car.carDetails?.vehicleMake}{" "}
                            {car.carDetails?.vehicleModel}
                          </div>
                          <div className="text-sm text-gray-500">
                            {car.carDetails?.year} •{" "}
                            {car.carDetails?.licensePlate}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(car.status)}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        ${car.rentalDetails?.pricePerDay}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
