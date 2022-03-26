import { Route, Routes, Link, Navigate } from "react-router-dom";
import { CustomLink } from "./components/custom-link";
import { MainPage } from "./pages/main-page";
import { useAuth } from "./context/auth-context";
import FollowersPage from "./pages/follower-page";
import FollowingPage from "./pages/following-page";
import ReposPage from "./pages/repos-page";
import GistsPage from "./pages/gists-page";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route index element={<Navigate to="home" />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/followers" element={<FollowersPage />} />
      <Route path="/following" element={<FollowingPage />} />
      <Route path="/repos" element={<ReposPage />} />
      <Route path="/gists" element={<GistsPage />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default AuthenticatedApp;
