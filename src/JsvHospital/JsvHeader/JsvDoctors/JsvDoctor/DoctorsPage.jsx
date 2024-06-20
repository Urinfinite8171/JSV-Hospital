import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { patientVisits } from "../../../JsvServices/JsvDoctors";

function DoctorsPage({ setLogged }) {
  const [patientDetails, setPatientDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setLogged(true);
  }, [setLogged]);

  useEffect(() => {
    if (id) {
      patientVisits(id)
        .then((res) => {
          setPatientDetails(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <>
      <div></div>

      <div className="p-6 sm:max-w-xl lg:max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        <h1 className="font-bold text-center m-3">List Of Patients</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-slate-500 table-auto">
            <thead>
              <tr>
                {[
                  "Patient ID",
                  "Patient Name",
                  "Email",
                  "Phone Number",
                  "Appointment Date",
                  "Time Slot",
                  "Status",
                ].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="border-collapse border border-slate-500 text-center p-3"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patientDetails.map((patient) => (
                <tr key={patient.patientId}>
                  <td className="border-collapse border border-slate-500 p-3">
                    {patient.patientId}
                  </td>
                  <td className="border-collapse border border-slate-500 p-3">
                    {patient.fullName}
                  </td>
                  <td className="border-collapse border border-slate-500 p-3">
                    {patient.email}
                  </td>
                  <td className="border-collapse border border-slate-500 p-3">
                    {patient.phone}
                  </td>
                  <td className="border-collapse border border-slate-500 p-3">
                    {patient.appointmentDate}
                  </td>
                  <td className="border-collapse border border-slate-500 p-3">
                    {patient.timeSlot}
                  </td>
                  <td className="border-collapse border border-slate-500 p-3">
                    <p className="bg-green-500 text-white shadow-2xl p-2 rounded-lg font-semibold">
                      Confirmed
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DoctorsPage;
