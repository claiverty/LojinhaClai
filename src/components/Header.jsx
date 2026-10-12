import { Link } from "react-router-dom";
import { CONFIG } from "../data/produtos";
import { linkWhats } from "../utils";
import WhatsIcon from "./WhatsIcon";

export default function Header() {
  return (
    <>
      {CONFIG.aviso && <div className="aviso">{CONFIG.aviso}</div>}
      <header className="topo">
        <div className="container">
          <Link to="/" className="logo-link" aria-label="Início" title="Voltar ao início">
            <span className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2.5" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </span>
          </Link>

          <a className="topo-whats" href={linkWhats(null)} target="_blank" rel="noopener noreferrer">
            <WhatsIcon />
            <span>Fale comigo</span>
          </a>
        </div>
      </header>
    </>
  );
}
