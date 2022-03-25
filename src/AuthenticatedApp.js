import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { CustomLink } from "./components/custom-link";
import { useAuth } from "./context/auth-context";

function AuthenticatedApp() {
  return (
    <>
      Estás autenticado!
    </>
  )
}

export default AuthenticatedApp;