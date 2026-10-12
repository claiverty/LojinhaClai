import { Link } from "react-router-dom";
import { fotosDe, formatarPreco, placeholder } from "../utils";

export default function ProductCard({ produto: p }) {
  const fotos = fotosDe(p);
  const fallback = (e) => (e.currentTarget.src = placeholder(p));

  return (
    <Link to={`/produto/${p.id}`} className={`card ${p.vendido ? "vendido" : ""}`}>
      <div className="card-img">
        <img src={fotos[0]} alt={p.nome} loading="lazy" onError={fallback} />
        {/* segunda foto aparece ao passar o mouse */}
        {fotos[1] && <img className="foto-hover" src={fotos[1]} alt="" loading="lazy" onError={fallback} />}
        {p.vendido && <span className="selo">Vendido</span>}
        {!p.vendido && fotos.length > 1 && (
          <span className="card-qtd-fotos">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {fotos.length} fotos
          </span>
        )}
      </div>
      <div className="card-info">
        <span className="card-cat">{p.categoria}</span>
        <h3>{p.nome}</h3>
        <div className="card-preco-wrap">
          <span className={`card-preco ${p.preco == null ? "consulta" : ""}`}>{formatarPreco(p.preco)}</span>
          {!p.vendido && <span className="tag-negociavel">Negociável</span>}
        </div>
        <div className="card-btn">
          <span>{p.vendido ? "Ver item" : "Ver mais"}</span>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3.5L10.5 8L6 12.5" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
