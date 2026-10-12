import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CONFIG, PRODUTOS } from "../data/produtos";
import { fotosDe, formatarPreco, linkWhats } from "../utils";
import Gallery from "../components/Gallery";
import ProductCard from "../components/ProductCard";
import WhatsIcon from "../components/WhatsIcon";

export default function Produto() {
  const { id } = useParams();
  const p = PRODUTOS.find((x) => x.id === id);

  useEffect(() => {
    document.title = p ? `${p.nome} | ${CONFIG.nomeLoja}` : CONFIG.nomeLoja;
  }, [p]);

  if (!p) {
    return (
      <section className="container nao-encontrado">
        <h2>Produto não encontrado</h2>
        <Link to="/">Voltar para a loja</Link>
      </section>
    );
  }

  // relacionados: primeiro da mesma categoria, depois o resto (sem vendidos)
  const relacionados = PRODUTOS.filter((x) => x.id !== p.id && !x.vendido)
    .sort((a, b) => (b.categoria === p.categoria) - (a.categoria === p.categoria))
    .slice(0, 4);

  return (
    <>
      <div className="container">
        <nav className="trilha">
          <Link to="/">Início</Link>
          <span className="trilha-sep">›</span>
          <span className="trilha-cat">{p.categoria}</span>
          <span className="trilha-sep">›</span>
          <span className="atual">{p.nome}</span>
        </nav>

        <article className="produto">
          <Gallery key={p.id} produto={p} fotos={fotosDe(p)} />

          <div className="detalhes">
            <span className="eyebrow">{p.categoria}</span>
            <h1>{p.nome}</h1>
            <div className="preco-linha">
              <div className={`preco ${p.preco == null ? "consulta" : ""}`}>{formatarPreco(p.preco)}</div>
              {!p.vendido && <span className="tag-negociavel">Valor negociável</span>}
            </div>
            {p.subtitulo && <p className="subtitulo">{p.subtitulo}</p>}

            {p.especificacoes?.length > 0 && (
              <dl className="specs">
                {p.especificacoes.map(([rotulo, valor]) => (
                  <div key={rotulo}>
                    <dt>{rotulo}</dt>
                    <dd>{valor}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="divisor" />

            <div className="acao-fixa">
              {p.vendido ? (
                <button className="btn-whats desativado" disabled>
                  Vendido
                </button>
              ) : (
                <a className="btn-whats" href={linkWhats(p)} target="_blank" rel="noopener noreferrer">
                  <WhatsIcon />
                  Comprar pelo WhatsApp
                </a>
              )}
            </div>
          </div>
        </article>
      </div>

      {relacionados.length > 0 && (
        <section className="relacionados">
          <div className="container">
            <h2>Você também pode gostar</h2>
            <div className="grade">
              {relacionados.map((r) => (
                <ProductCard key={r.id} produto={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
