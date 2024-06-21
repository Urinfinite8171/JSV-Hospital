import axios from "axios";

const REST_API_URL = "http://16.171.182.212:8080";

export const doctorsList = () => {
  return axios.get(REST_API_URL + "/doctors");
};

export const getDoctorById = (id) => {
  return axios.get(REST_API_URL + "/doctor-appointment/" + id);
};

export const newPatientEntry = (id, patientEntity) => {
  return axios.post(REST_API_URL + "/doctor-appointment/" + id, patientEntity);
};

export const patientVisits = (id) => {
  return axios.get(REST_API_URL + "/doctor/" + id);
};

export const getCredentials = (id) => {
  return axios.get(REST_API_URL + "/login/" + id);
};
