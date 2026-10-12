import { CONFIG, PRODUTOS } from "./data/produtos";

export const CATEGORIAS = ["Todos", ...new Set(PRODUTOS.map((p) => p.categoria))];

/* ---------- fotos (detectadas automaticamente em src/fotos/<id>/) ---------- */
const arquivos = import.meta.glob("./fotos/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  import: "default",
});

const FOTOS = {};
for (const [caminho, url] of Object.entries(arquivos)) {
  const [, id, nome] = caminho.match(/^\.\/fotos\/([^/]+)\/(.+)$/);
  (FOTOS[id] ||= []).push({ nome, url });
}
for (const lista of Object.values(FOTOS)) {
  lista.sort((a, b) => a.nome.localeCompare(b.nome, undefined, { numeric: true }));
}

export function placeholder(p) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'>
    <rect width='800' height='800' fill='#f5f5f7'/>
    <text x='400' y='370' font-size='170' text-anchor='middle' dominant-baseline='central'>${p.icone || "📦"}</text>
    <text x='400' y='600' font-family='-apple-system, Segoe UI, sans-serif' font-size='28' fill='#86868b' text-anchor='middle'>Foto em breve</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

export const fotosDe = (p) => FOTOS[p.id]?.map((f) => f.url) ?? [placeholder(p)];

/* ---------- preço e WhatsApp ---------- */
export const formatarPreco = (v) =>
  v == null ? "Preço sob consulta" : v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function linkWhats(p) {
  const msg = p
    ? CONFIG.mensagemPadrao.replace("{produto}", p.nome).replace("{preco}", formatarPreco(p.preco))
    : CONFIG.mensagemGeral;
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}
