import { Route, Routes, Navigate } from "react-router-dom";
import { SearchPage } from "./pages/search-page";
import FollowersPage from "./pages/follower-page";
import FollowingPage from "./pages/following-page";
import ReposPage from "./pages/repos-page";
import GistsPage from "./pages/gists-page";
import FavoritesPage from "./pages/favorites-page";
import ProfilePage from "./pages/profile";
import Footer from "./pages/footer";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function AuthenticatedApp() {
  return (
    <Container>
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/followers" element={<FollowersPage />} />
        <Route path="/following" element={<FollowingPage />} />
        <Route path="/repos" element={<ReposPage />} />
        <Route path="/gists" element={<GistsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default AuthenticatedApp;
