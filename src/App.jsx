import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateJob from "./pages/CreateJob";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreateTraining from "./pages/CreateTraining";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Investments from "./pages/Investments";
import Partnerships from "./pages/Partnerships";
import Training from "./pages/Training";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateInvestment from "./pages/CreateInvestment";
import CreatePartnership from "./pages/CreatePartnership";
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
<Route
  path="/create-training"
  element={<CreateTraining />}
/>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
<Route path="/create-job" element={<CreateJob />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
<Route
  path="/create-investment"
  element={<CreateInvestment />}
/>
        <Route
          path="/investments"
          element={<Investments />}
        />
<Route
  path="/create-partnership"
  element={<CreatePartnership />}
/>
        <Route
          path="/partnerships"
          element={<Partnerships />}
        />

        <Route
          path="/training"
          element={<Training />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;