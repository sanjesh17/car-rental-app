import React, { useState } from "react";

const DriverSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    licenseNumber: "",
    licenseExpiry: "",
    licenseType: "",
    carModel: "",
    carYear: "",
    carPlate: "",
    carColor: "",
    willingToDriveOwnCar: false,
    emergencyContact: "",
    termsAccepted: false,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      // Send the request to the admin (backend API)
      const response = await fetch("/api/driver-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your request has been submitted for approval.");
      } else {
        throw new Error("There was an issue with the signup process.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Driver Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>License Expiry Date</label>
          <input
            type="date"
            name="licenseExpiry"
            value={formData.licenseExpiry}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>License Type</label>
          <input
            type="text"
            name="licenseType"
            value={formData.licenseType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Do you have a car?</label>
          <input
            type="checkbox"
            name="willingToDriveOwnCar"
            checked={formData.willingToDriveOwnCar}
            onChange={handleChange}
          />
        </div>

        {formData.willingToDriveOwnCar && (
          <>
            <div className="form-group">
              <label>Car Model</label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Car Year</label>
              <input
                type="text"
                name="carYear"
                value={formData.carYear}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Car License Plate</label>
              <input
                type="text"
                name="carPlate"
                value={formData.carPlate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Car Color</label>
              <input
                type="text"
                name="carColor"
                value={formData.carColor}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Emergency Contact</label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            I agree to the Terms & Conditions
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <button type="submit" className="submit-button">
            Submit for Approval
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverSignup;
