import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Catalogo from "./pages/Catalogo";
import Produto from "./pages/Produto";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="*" element={<Catalogo />} />
        </Routes>
      </main>
    </>
  );
}
