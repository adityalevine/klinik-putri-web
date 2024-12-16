import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SchedulePage from "./pages/SchedulePage";
import ContactPage from "./pages/ContactPage";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./lib/axios";
import { useEffect, useState } from "react";
import Spinner from "./components/ui/spinner";

function App() {
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
          username: userResponse.data.username,
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
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/schedule" Component={SchedulePage} />
        <Route path="/contact" Component={ContactPage} />

        <Route path="*" Component={NotFoundPage} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
