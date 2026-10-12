import { useEffect } from "react";
import { CONFIG, PRODUTOS } from "../data/produtos";
import ProductCard from "../components/ProductCard";
import heroImg from "../assets/hero-setup.jpg";

export default function Catalogo() {
  useEffect(() => {
    document.title = CONFIG.nomeLoja;
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{CONFIG.nomeLoja}.</h1>
          <p>{CONFIG.slogan}</p>
          <div className="hero-banner">
            <img src={heroImg} alt="Setup Gamer Lojinha do Clai" />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="grade">
          {PRODUTOS.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      </section>
    </>
  );
}
