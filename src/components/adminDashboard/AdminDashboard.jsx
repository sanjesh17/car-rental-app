import React, { useState, useEffect } from "react";
import {
  Users,
  Car,
  Calendar,
  DollarSign,
  PlusCircle,
  BarChart2,
  Briefcase,
  Clock,
  Activity,
  Settings,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [bookingStats, setBookingStats] = useState([
    { month: "Jan", bookings: 450 },
    { month: "Feb", bookings: 620 },
    { month: "Mar", bookings: 750 },
    { month: "Apr", bookings: 890 },
    { month: "May", bookings: 1100 },
    { month: "Jun", bookings: 1350 },
  ]);

  const [recentBookings, setRecentBookings] = useState([
    {
      id: 1,
      customer: "John Doe",
      car: "Tesla Model 3",
      date: "2024-02-15",
      status: "Completed",
      amount: 250,
    },
    {
      id: 2,
      customer: "Sarah Smith",
      car: "BMW X5",
      date: "2024-02-16",
      status: "In Progress",
      amount: 350,
    },
  ]);

  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "Michael Johnson",
      email: "michael@example.com",
      rating: 4.8,
      trips: 120,
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      email: "emily@example.com",
      rating: 4.9,
      trips: 95,
    },
  ]);

  const [cars, setCars] = useState([
    {
      id: 1,
      model: "Tesla Model 3",
      fuelType: "Electric",
      capacity: 4,
      pricePerDay: 80,
    },
    {
      id: 2,
      model: "BMW X5",
      fuelType: "Hybrid",
      capacity: 5,
      pricePerDay: 120,
    },
  ]);

  const CardWrapper = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div>
        <div className="flex items-center mb-2">
          <Icon className={`mr-3 ${color}`} size={24} />
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7fa] to-[#e6eaf0] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Admin Dashboard
          </h1>
          <div className="flex space-x-4">
            <button className="bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition">
              <Settings className="text-gray-600" size={20} />
            </button>
            <button className="bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition">
              <Activity className="text-blue-500" size={20} />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <CardWrapper
            icon={Users}
            title="Total Drivers"
            value={drivers.length}
            color="text-blue-500"
          />
          <CardWrapper
            icon={Car}
            title="Total Cars"
            value={cars.length}
            color="text-green-500"
          />
          <CardWrapper
            icon={Calendar}
            title="Monthly Bookings"
            value={bookingStats.reduce((sum, stat) => sum + stat.bookings, 0)}
            color="text-purple-500"
          />
          <CardWrapper
            icon={DollarSign}
            title="Revenue"
            value="$45,320"
            color="text-indigo-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Statistics */}
          <div className="bg-white shadow-lg rounded-2xl p-6 col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                <BarChart2 className="mr-2 text-blue-500" size={20} />
                Monthly Booking Statistics
              </h2>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingStats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <Clock className="mr-2 text-green-500" size={20} />
              Recent Bookings
            </h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-gray-100 p-4 rounded-lg flex justify-between items-center hover:bg-gray-200 transition"
                >
                  <div>
                    <p className="font-medium text-gray-700">
                      {booking.customer}
                    </p>
                    <p className="text-sm text-gray-500">{booking.car}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      ${booking.amount}
                    </p>
                    <p className="text-xs text-gray-500">{booking.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Resources */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <PlusCircle className="mr-2 text-purple-500" size={20} />
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center">
                <Car className="mr-2" size={20} /> Add New Car
              </button>
              <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center">
                <Users className="mr-2" size={20} /> Add New Driver
              </button>
            </div>
          </div>

          {/* Top Drivers */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <Briefcase className="mr-2 text-indigo-500" size={20} />
              Top Drivers
            </h2>
            <div className="space-y-4">
              {drivers.map((driver) => (
                <div
                  key={driver.id}
                  className="bg-gray-100 p-4 rounded-lg flex justify-between items-center hover:bg-gray-200 transition"
                >
                  <div>
                    <p className="font-medium text-gray-700">{driver.name}</p>
                    <p className="text-sm text-gray-500">{driver.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-yellow-600">
                      {driver.rating} ★
                    </p>
                    <p className="text-xs text-gray-500">
                      {driver.trips} Trips
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
