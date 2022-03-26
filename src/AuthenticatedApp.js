import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { CustomLink } from "./components/custom-link";
import { SearchPage } from "./pages/main-page";
import { useAuth } from "./context/auth-context";
import ProfilePage from "./pages/profile";
import Text from "./components/text";
import { getUser, updateUser } from "./services/users-service";

const Section = styled.div`
  margin: 96px auto;
`;

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = Text.withComponent("h1");
import FollowersPage from "./pages/follower-page";
import FollowingPage from "./pages/following-page";
import ReposPage from "./pages/repos-page";
import GistsPage from "./pages/gists-page";
import FavoritesPage from "./pages/favorites-page";

function AuthenticatedApp() {
  const { logout } = useAuth();
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    getUser()
      .then(setUser)
      .catch((error) => console.log(error));
  }, []);

   <Routes>
      <Route index element={<Navigate to="home" />} />
      <Route path="/home" element={<SearchPage />} />
      <Route path="/profile" element={
        <Section>
          <Container>
            <Title size="xl" bold>
              Profile
            </Title>
            <ProfilePage
              email={user.email}
              password={user.password}
              first_name={user.first_name}
              last_name={user.last_name}
            />
            <CustomLink size="lg" onClick={logout}>
              Logout
            </CustomLink>
          </Container>
       </Section>
      } />
      <Route path="/followers" element={<FollowersPage />} />
      <Route path="/following" element={<FollowingPage />} />
      <Route path="/repos" element={<ReposPage />} />
      <Route path="/gists" element={<GistsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );

}

export default AuthenticatedApp;
