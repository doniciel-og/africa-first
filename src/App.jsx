import { BrowserRouter, Routes, Route } from "react-router-dom";

import CompanyDashboard from "./pages/CompanyDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";

import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import CreateJob from "./pages/CreateJob";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import MyApplications from "./pages/MyApplications";
import MyJobRequests from "./pages/MyJobRequests";

import Investments from "./pages/Investments";
import MyInvestments from "./pages/MyInvestments";
import EditInvestment from "./pages/EditInvestment";
import CreateInvestment from "./pages/CreateInvestment";

import MyApplicationsUser from "./pages/MyApplicationsUser";

import Training from "./pages/Training";
import CreateTraining from "./pages/CreateTraining";
import MyTrainings from "./pages/MyTrainings";
import EditTraining from "./pages/EditTraining";

import Partnerships from "./pages/Partnerships";
import CreatePartnership from "./pages/CreatePartnership";
import MyPartnerships from "./pages/MyPartnerships";
import EditPartnership from "./pages/EditPartnership";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";

import AdminDashboard from "./pages/AdminDashboard";
import AdminCreateJob from "./pages/AdminCreateJob";
import AdminJobRequests from "./pages/AdminJobRequests";
import AdminScheduleTest from "./pages/AdminScheduleTest";
import AdminApplications from "./pages/AdminApplications";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* ACCUEIL */}
        <Route path="/" element={<Home />} />

        {/* UTILISATEUR */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* EMPLOIS */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/my-job-requests" element={<MyJobRequests />} />
        <Route path="/edit-job/:id" element={<EditJob />} />

        {/* INVESTISSEMENTS */}
        <Route path="/investments" element={<Investments />} />
        <Route path="/create-investment" element={<CreateInvestment />} />
        <Route path="/my-investments" element={<MyInvestments />} />
        <Route path="/edit-investment/:id" element={<EditInvestment />} />
        <Route path="/chat/:id" element={<Chat />} />

        {/* FORMATIONS */}
        <Route path="/training" element={<Training />} />
        <Route path="/create-training" element={<CreateTraining />} />
        <Route path="/my-trainings" element={<MyTrainings />} />
        <Route path="/edit-training/:id" element={<EditTraining />} />

        {/* PARTENARIATS */}
        <Route path="/partnerships" element={<Partnerships />} />
        <Route
          path="/create-partnership"
          element={<CreatePartnership />}
        />
        <Route
          path="/my-partnerships"
          element={<MyPartnerships />}
        />
        <Route
          path="/edit-partnership/:id"
          element={<EditPartnership />}
        />

        {/* APPLICATIONS */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute allowedTypes={["Entreprise"]}>
              <Applications />
            </ProtectedRoute>
          }
        />

        {/* ENTREPRISE */}
        <Route
          path="/company-dashboard"
          element={
            <ProtectedRoute allowedTypes={["Entreprise"]}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMINISTRATION */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin-create-job"
          element={<AdminCreateJob />}
        />

        <Route
          path="/admin-job-requests"
          element={<AdminJobRequests />}
        />

        <Route
          path="/admin-schedule-test/:id"
          element={<AdminScheduleTest />}
        />

        <Route
          path="/admin-applications"
          element={<AdminApplications />}
        />

        {/* AUTHENTIFICATION */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;