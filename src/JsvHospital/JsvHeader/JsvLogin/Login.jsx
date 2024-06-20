import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCredentials } from "../../JsvServices/JsvDoctors";

const Login = ({ setLogged }) => {
  const [id, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState("");
  const navigate = useNavigate();
  const [showToast, setToast] = useState(false);

  useEffect(() => {
    if (id) {
      getCredentials(id)
        .then((res) => {
          setCredentials(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  function validateCredentials(id, password, credentials) {
    if (credentials.doctorId == id || credentials.userName === id) {
      if (credentials.password === password) return true;
      return true;
    }
  }

  const handleLoginAsDoctor = (e) => {
    e.preventDefault();

    if (validateCredentials(id, password, credentials)) {
      console.log("Logging in as Doctor with ID:", id);
      setLogged(true);
      navigate(`/doctor/${id}/home`);
    } else {
      // Show toaster for failed login attempt
      setToast(true);
      // Hide the toaster after 3 seconds
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  };

  const handleLoginAsPatient = (e) => {
    e.preventDefault();
    console.log("Logging in as Patient");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLoginAsDoctor}>
          <div className="mb-4">
            <label className="block text-gray-700">Doctor ID</label>
            <input
              type="text"
              value={id}
              required
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleLoginAsPatient}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login as Patient
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 ">
              Login
            </button>
          </div>
        </form>
      </div>

      {showToast && (
        <div className="fixed top-10 right-1/3 bg-red-600 text-white p-4 rounded-lg">
          Invalid username or password. Please try again.
        </div>
      )}
    </div>
  );
};

export default Login;
