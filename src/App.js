import AuthenticatedApp from "./AuthenticatedApp";
import Button from "./components/button";
import { CustomLink } from "./components/custom-link";
import Input from "./components/input";
import { useAuth } from "./context/auth-context";
import UnauthenticatedApp from "./UnauthenticatedApp";

function App() {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
