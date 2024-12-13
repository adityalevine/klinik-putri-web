import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SchedulePage from "./pages/SchedulePage";
import ContactPage from "./pages/ContactPage";
import { Routes, Route } from "react-router-dom";

function App() {
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
