import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SchedulePage from "./pages/SchedulePage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import ReservationDetailPage from "./pages/ReservationDetailPage";
import DashboardManagementPage from "./pages/admin/DashboardManagementPage";
import SpecializationManagementPage from "./pages/admin/specialization/SpecializationManagementPage";
import CreateSpecializationPage from "./pages/admin/specialization/CreateSpecializationPage";
import EditSpecializationPage from "./pages/admin/specialization/EditSpecializationPage";
import DoctorManagementPage from "./pages/admin/doctor/DoctorManagementPage";
import CreateDoctorPage from "./pages/admin/doctor/CreateDoctorPage";
import EditDoctorPage from "./pages/admin/doctor/EditDoctorPage";
import ScheduleSpecializationManagementPage from "./pages/admin/schedule/ScheduleSpecializationManagementPage";
import CreateScheduleSpecializationPage from "./pages/admin/schedule/CreateScheduleSpecializationPage";
import EditScheduleSpecializationPage from "./pages/admin/schedule/EditScheduleSpecializationPage";
import ReservationManagementPage from "./pages/admin/reservation/ReservationManagementPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./lib/axios";
import { useEffect, useState } from "react";
import Spinner from "./components/ui/spinner";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  const hydrateAuth = async () => {
    try {
      const currentUser = localStorage.getItem("current-user");

      if (!currentUser) return;

      const userResponse = await axiosInstance.get("/users/" + currentUser);

      dispatch({
        type: "USER_LOGIN",
        payload: {
          id: userResponse.data.id,
          role: userResponse.data.role,
          name: userResponse.data.name,
          username: userResponse.data.username,
          profile_url: userResponse.data.profile_url,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsHydrated(true);
    }
  };

  useEffect(() => {
    hydrateAuth();
  }, []);

  if (!isHydrated) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <Spinner />
      </main>
    );
  }

  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}

      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/schedule" Component={SchedulePage} />
        <Route path="/contact" Component={ContactPage} />
        <Route path="/profile" Component={ProfilePage} />
        <Route path="/history" Component={HistoryPage} />
        <Route path="/reservation/:reservationId" Component={ReservationDetailPage} />

        <Route path="/admin">
          <Route path="dashboard" Component={DashboardManagementPage} />
          <Route path="specialization" Component={SpecializationManagementPage} />
          <Route path="specialization/create" Component={CreateSpecializationPage} />
          <Route path="specialization/edit/:specializationId" Component={EditSpecializationPage} />
          <Route path="doctor" Component={DoctorManagementPage} />
          <Route path="doctor/create" Component={CreateDoctorPage} />
          <Route path="doctor/edit/:doctorId" Component={EditDoctorPage} />
          <Route path="schedule/specialization" Component={ScheduleSpecializationManagementPage} />
          <Route path="schedule/specialization/create" Component={CreateScheduleSpecializationPage} />
          <Route path="schedule/specialization/edit/:scheduleSpecializationId" Component={EditScheduleSpecializationPage} />
          <Route path="reservation" Component={ReservationManagementPage} />
        </Route>

        <Route path="*" Component={NotFoundPage} />
      </Routes>

      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App;
