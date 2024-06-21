import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { patientVisits } from "../../../JsvServices/JsvDoctors";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";
import { BarChart, Bar, CartesianGrid } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function DoctorsPage({ setLogged }) {
  const [patientDetails, setPatientDetails] = useState([]);
  const [pieChartData, setPieChart] = useState([]);
  const [barChartData, setBarChart] = useState([]);
  const [doctorName, setDoctorName] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLogged(true);
  }, [setLogged]);

  useEffect(() => {
    if (id) {
      patientVisits(id).then((res) => {
        setPatientDetails(res.data.patientDto);
        setPieChart(res.data.pieChartDto);
        setBarChart(res.data.barChartDto);
        setDoctorName(res.data.patientDto[0].doctorName);
      });
    }
  }, [id]);

  if (!patientDetails && !pieChartData) {
    return <div>Loading...</div>;
  }

  const genderColorMap = {};
  barChartData.forEach((entry, index) => {
    if (!genderColorMap[entry.gender]) {
      genderColorMap[entry.gender] =
        COLORS[Object.keys(genderColorMap).length % COLORS.length];
    }
  });

  return (
    <>
      <header>
        <div>
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-20">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {!isOpen ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="h-14 w-auto"
                      src="\src\assets\Photos\hospital\Medical-Logo.jpg"
                      alt="profile"
                    />
                    <h1 className="text-emerald-600 text-2xl font-bold ml-3">
                      Dr. {doctorName}
                    </h1>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-6 mt-2">
                      <a
                        href=""
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Dashboard
                      </a>

                      <a
                        href="#"
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Admitted Patients
                      </a>

                      <a
                        href=""
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Re-visited Patients
                      </a>

                      <a
                        href=""
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Notifications
                      </a>
                      <a
                        href="/login"
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${isOpen ? "block" : "hidden"} sm:hidden`}
              id="mobile-menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="/"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>

                <a
                  href="#"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Admitted Patients
                </a>
                <a
                  href="/contact"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Re-visite Patients
                </a>
                <a
                  href="/login"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="mt-3">
        <div className="min-h-40 p-5 bg-gray-100  flex flex-col lg:flex-row justify-center items-center lg:space-x-8 space-y-8 lg:space-y-0 rounded-2xl">
          <div className="bg-white  rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-xl pt-4 font-bold mb-4 text-center">
              Visited Patients Date Wise
              <br /> Bar Chart View
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="appointmentDate" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
                <Bar dataKey="gender" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white  rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-xl pt-4 font-bold mb-4 text-center">
              Total Visited Patients
              <br /> Pie Chart View
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="gender"
                  label
                >
                  {pieChartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.gender}`}
                      fill={genderColorMap[entry.gender]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="m-5 p-5 flex flex-col max-sm:max-w-xl lg:max-w-4xl  mx-1 ">
        <h1 className="font-semibold p-2 text-center mx-auto ">
          List Of Visited Patients
        </h1>

        <div className="overflow-x-visible max-sm:overflow-auto max-lg:overflow-auto ">
          <div className="-mx-2 overflow-visible sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 ">
                    <tr>
                      {[
                        "Patient ID",
                        "Patient Name",
                        "Age",
                        "Email",
                        "Phone Number",
                        "Address",
                        "Appointment Date",
                        "Time Slot",
                        "Status",
                      ].map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {patientDetails.map((patient) => (
                      <tr
                        key={patient.patientId}
                        className="hover:odd:bg-slate-200 hover:even:bg-gray-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.patientId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.fullName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.age}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.appointmentDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.timeSlot}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorsPage;
