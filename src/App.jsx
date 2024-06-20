import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./JsvHospital/JsvFooter/Footer";
import Appointment from "./JsvHospital/JsvHeader/JsvAppointment/Appointment";
import JsvHeader from "./JsvHospital/JsvHeader/JsvHeader";
import Home from "./JsvHospital/JsvHeader/JsvHome/Home";
import Login from "./JsvHospital/JsvHeader/JsvLogin/Login";
import Doctors from "./JsvHospital/JsvHeader/JsvDoctors/Doctors";
import BookAppointment from "./JsvHospital/JsvHeader/JsvDoctors/BookAppointment";
import ContactUs from "./JsvHospital/JsvHeader/JsvContact/ContactUs";
import DoctorsPage from "./JsvHospital/JsvHeader/JsvDoctors/JsvDoctor/DoctorsPage";
import { useState } from "react";

function App() {
  const [isLogged, setLogged] = useState(false);

  return (
    <>
      {!isLogged && <JsvHeader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login setLogged={setLogged} />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctor-appointment/:id" element={<BookAppointment />} />
          <Route path="/book-appointment" element={<Appointment />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/doctor/:id/home"
            element={<DoctorsPage setLogged={setLogged} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
