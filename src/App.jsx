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
import AdminDashboard from "./pages/AdminDashboard";
import AdminCreateJob from "./pages/AdminCreateJob";
import AdminJobRequests from "./pages/AdminJobRequests";
import AdminScheduleTest from "./pages/AdminScheduleTest";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import MyJobRequests from "./pages/MyJobRequests";
import AdminApplications from "./pages/AdminApplications";
import Notifications from "./pages/Notifications";
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
<Route
  path="/admin-schedule-test/:id"
  element={<AdminScheduleTest />}
/>
        {/* EMPLOIS */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route
  path="/my-job-requests"
  element={<MyJobRequests />}
/>
        <Route path="/edit-job/:id" element={<EditJob />} />

        {/* INVESTISSEMENTS */}
        <Route path="/investments" element={<Investments />} />
<Route
  path="/messages"
  element={<Messages />}
/>
<Route
  path="/create-investment"
  element={<CreateInvestment />}
/>

<Route
  path="/my-investments"
  element={<MyInvestments />}
/>
<Route
  path="/chat/:id"
  element={<Chat />}
/>
<Route
  path="/edit-investment/:id"
  element={<EditInvestment />}
/>

        {/* FORMATIONS */}
<Route path="/training" element={<Training />} />
<Route
  path="/company-dashboard"
  element={
    <ProtectedRoute allowedTypes={["Entreprise"]}>
      <CompanyDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/create-training"
  element={<CreateTraining />}
/>

<Route
  path="/my-trainings"
  element={<MyTrainings />}
/>
<Route
  path="/applications"
  element={
    <ProtectedRoute allowedTypes={["Entreprise"]}>
      <Applications />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-training/:id"
  element={<EditTraining />}
/>

        {/* PARTENARIATS */}
<Route
  path="/partnerships"
  element={<Partnerships />}
/>

<Route
  path="/create-partnership"
  element={<CreatePartnership />}
/>

<Route
  path="/my-partnerships"
  element={<MyPartnerships />}
/>
<Route
  path="/admin-job-requests"
  element={<AdminJobRequests />}
/>
<Route path="/notifications" element={<Notifications />} />
<Route
  path="/admin-create-job"
  element={<AdminCreateJob />}
/>
<Route
  path="/edit-partnership/:id"
  element={<EditPartnership />}
/>
<Route
  path="/admin-dashboard"
  element={<AdminDashboard />}
/><Route
  path="/admin-applications"
  element={<AdminApplications />}
/>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;