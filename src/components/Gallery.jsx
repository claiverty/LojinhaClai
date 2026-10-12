import { useEffect, useRef, useState } from "react";
import { placeholder } from "../utils";

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === "esq" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
  </svg>
);

export default function Gallery({ produto, fotos }) {
  const [atual, setAtual] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [animando, setAnimando] = useState(true);

  const containerRef = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);
  const isDragging = useRef(false);
  const isHorizontalSwipe = useRef(null);
  const hasMoved = useRef(false);

  const varias = fotos.length > 1;

  // Navegação
  const irPara = (i) => {
    setAnimando(true);
    setDragOffset(0);
    setAtual((i + fotos.length) % fotos.length);
  };

  // Travar scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (modalAberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalAberto]);

  // Teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModalAberto(false);
      if (e.key === "ArrowLeft") irPara(atual - 1);
      if (e.key === "ArrowRight") irPara(atual + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [atual, varias, modalAberto]);

  // TOUCH GESTURES (Mobile / Celular)
  const onTouchStart = (e) => {
    if (!varias) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    startTime.current = Date.now();
    isDragging.current = true;
    isHorizontalSwipe.current = null;
    hasMoved.current = false;
    setAnimando(false);
  };

  const onTouchMove = (e) => {
    if (!isDragging.current || !varias) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX.current;
    const diffY = currentY - startY.current;

    if (isHorizontalSwipe.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipe.current) {
      if (e.cancelable) e.preventDefault();
      hasMoved.current = true;
      let offset = diffX;
      // Resistência elástica nas pontas
      if ((atual === 0 && diffX > 0) || (atual === fotos.length - 1 && diffX < 0)) {
        offset = diffX * 0.35;
      }
      setDragOffset(offset);
    }
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (isHorizontalSwipe.current && hasMoved.current) {
      setAnimando(true);
      const width = containerRef.current?.clientWidth || 320;
      const duration = Date.now() - startTime.current;
      const velocity = Math.abs(dragOffset) / Math.max(1, duration);

      // Troca por deslocamento (> 18% da largura) ou por flick rápido
      if (Math.abs(dragOffset) > width * 0.18 || velocity > 0.35) {
        if (dragOffset < 0 && atual < fotos.length - 1) {
          irPara(atual + 1);
          return;
        } else if (dragOffset > 0 && atual > 0) {
          irPara(atual - 1);
          return;
        }
      }
    }

    // Se foi apenas um toque sem arrastar, abre tela cheia
    if (!hasMoved.current) {
      setModalAberto(true);
    }

    setAnimando(true);
    setDragOffset(0);
  };

  // MOUSE GESTURES (Desktop)
  const onMouseDown = (e) => {
    if (!varias) return;
    startX.current = e.clientX;
    startTime.current = Date.now();
    isDragging.current = true;
    hasMoved.current = false;
    setAnimando(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging.current || !varias) return;
    e.preventDefault();
    const diffX = e.clientX - startX.current;
    if (Math.abs(diffX) > 4) {
      hasMoved.current = true;
    }
    let offset = diffX;
    if ((atual === 0 && diffX > 0) || (atual === fotos.length - 1 && diffX < 0)) {
      offset = diffX * 0.35;
    }
    setDragOffset(offset);
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (hasMoved.current) {
      setAnimando(true);
      const width = containerRef.current?.clientWidth || 400;
      const duration = Date.now() - startTime.current;
      const velocity = Math.abs(dragOffset) / Math.max(1, duration);

      if (Math.abs(dragOffset) > width * 0.18 || velocity > 0.35) {
        if (dragOffset < 0 && atual < fotos.length - 1) {
          irPara(atual + 1);
          return;
        } else if (dragOffset > 0 && atual > 0) {
          irPara(atual - 1);
          return;
        }
      }
    } else {
      // Clique simples abre tela cheia
      setModalAberto(true);
    }

    setAnimando(true);
    setDragOffset(0);
  };

  const fallback = (e) => (e.currentTarget.src = placeholder(produto));

  return (
    <>
      <div className="galeria">
        <div className="foto-principal" ref={containerRef}>
          {/* Botão para ver em tela cheia */}
          <button
            type="button"
            className="btn-zoom"
            onClick={(e) => {
              e.stopPropagation();
              setModalAberto(true);
            }}
            title="Ver foto em tela cheia (sem cortes)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span>Tela cheia</span>
          </button>

          {/* Trilho de fotos com gesto de arrastar ultra fluido */}
          <div
            className="galeria-track-wrap"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <div
              className="galeria-slides-inner"
              style={{
                transform: `translateX(calc(-${atual * 100}% + ${dragOffset}px))`,
                transition: animando ? "transform 0.32s cubic-bezier(0.2, 0.9, 0.3, 1)" : "none",
              }}
            >
              {fotos.map((f, i) => (
                <div key={f} className="galeria-slide-item">
                  <img
                    src={f}
                    alt={`${produto.nome} - Foto ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    onError={fallback}
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Setas flutuantes (desktop) */}
          {varias && (
            <>
              <button
                type="button"
                className="seta esq"
                aria-label="Foto anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  irPara(atual - 1);
                }}
              >
                <Chevron dir="esq" />
              </button>
              <button
                type="button"
                className="seta dir"
                aria-label="Próxima foto"
                onClick={(e) => {
                  e.stopPropagation();
                  irPara(atual + 1);
                }}
              >
                <Chevron dir="dir" />
              </button>
              <div className="pontos">
                {fotos.map((f, i) => (
                  <button
                    type="button"
                    key={f}
                    className={`ponto ${i === atual ? "ativo" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      irPara(i);
                    }}
                    aria-label={`Ir para foto ${i + 1}`}
                  />
                ))}
              </div>
              <span className="galeria-contador">
                {atual + 1} / {fotos.length}
              </span>
            </>
          )}

          {produto.vendido && <span className="selo">Vendido</span>}
        </div>

        {varias && (
          <div className="miniaturas">
            {fotos.map((f, i) => (
              <button
                type="button"
                key={f}
                className={`mini ${i === atual ? "ativa" : ""}`}
                onClick={() => irPara(i)}
                aria-label={`Ver foto ${i + 1}`}
              >
                <img src={f} alt={`Miniatura ${i + 1}`} onError={fallback} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================
          MODAL DE TELA CHEIA (LIGHTBOX - SEM CORTES)
          ========================================================= */}
      {modalAberto && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setModalAberto(false)}
        >
          <div className="lightbox-topo" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-info">
              <span className="lightbox-titulo">{produto.nome}</span>
              <span className="lightbox-contador">
                {atual + 1} de {fotos.length}
              </span>
            </div>
            <button
              type="button"
              className="lightbox-fechar"
              onClick={() => setModalAberto(false)}
              aria-label="Fechar tela cheia"
              title="Fechar (Esc)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="lightbox-corpo" onClick={(e) => e.stopPropagation()}>
            {varias && (
              <button
                type="button"
                className="lightbox-seta esq"
                aria-label="Foto anterior"
                onClick={() => irPara(atual - 1)}
              >
                <Chevron dir="esq" />
              </button>
            )}

            <div
              className="lightbox-slide"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img
                className="lightbox-img"
                src={fotos[atual]}
                alt={`${produto.nome} em tela cheia - Foto ${atual + 1}`}
                onError={fallback}
              />
            </div>

            {varias && (
              <button
                type="button"
                className="lightbox-seta dir"
                aria-label="Próxima foto"
                onClick={() => irPara(atual + 1)}
              >
                <Chevron dir="dir" />
              </button>
            )}
          </div>

          {varias && (
            <div className="lightbox-rodape" onClick={(e) => e.stopPropagation()}>
              {fotos.map((f, i) => (
                <button
                  type="button"
                  key={f}
                  className={`lightbox-mini ${i === atual ? "ativa" : ""}`}
                  onClick={() => irPara(i)}
                  aria-label={`Ver foto ${i + 1}`}
                >
                  <img src={f} alt="" onError={fallback} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
