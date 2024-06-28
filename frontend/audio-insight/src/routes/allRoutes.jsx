// AllRoutes.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import AudioQna from "../pages/audioQna/audioQna";
import { Signup } from "../pages/Signup/Signup";
import { Login } from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import AudioUpload from "../pages/upload/audioUpload";
import Transcribe from "../pages/Transcribe/Transcribe";
import Summary from "../pages/Summary/Summary";
import Diarization from "../pages/Diarization/Diarization";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/authContext";
import PrivateRoutes from "../components/PrivateRoute";

function AllRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Dashboard>
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<AudioUpload />} />
              <Route path="/transcribe" element={<Transcribe />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/diarization" element={<Diarization />} />
              <Route path="/Qna" element={<AudioQna />} />
            </Route>
          </Routes>
        </Dashboard>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AllRoutes;
