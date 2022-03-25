import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { CustomLink } from "./components/custom-link";
import { MainPage } from "./pages/main-page";
import { useAuth } from "./context/auth-context";

function AuthenticatedApp() {
  return <MainPage />;
}

export default AuthenticatedApp;
