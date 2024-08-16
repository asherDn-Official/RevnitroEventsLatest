import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import IndexPage from "./Components";
import EventDetail from "./Components/eventDetail";
import CreateEvent from "./Components/AdminDashboard/CreateEvent";
import EditEvent from "./Components/AdminDashboard/EditEvent";
import Protect from "./Components/Authetication/Protected";
import { Navbar } from "./Components/Navbar";
import Footer from "./Components/Footer";
import EventForm from "./Components/EventForm";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/EventDetail/:id" element={<EventDetail />} />
          <Route path="/EventForms" element={<EventForm />} />
          <Route element={<Protect />}>
            <Route path="/CreateEvent" element={<CreateEvent />} />
            <Route path="/EditEvent/:eventId" element={<EditEvent />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
