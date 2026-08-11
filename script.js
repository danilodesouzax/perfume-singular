/* =========================================================
   ESSÊNCIA — CATÁLOGO DE PERFUMARIA
   =========================================================

   COMO ADICIONAR UM PRODUTO NOVO:
   1. Copie um bloco inteiro de dentro do array PRODUTOS abaixo
      (de "{" até "}," incluindo os dois).
   2. Cole no fim do array, antes do "];" de fechamento.
   3. Altere os valores. Campos:

      id         -> texto único, sem espaços (ex: "perfume-11")
      nome       -> nome do perfume
      familia    -> uma das chaves em FAMILIAS mais abaixo
                    ("citrico", "floral", "amadeirado", "doce", "fresco")
      tamanho    -> ex: "100ml"
      preco      -> número, sem "R$" (ex: 289.90)
      precoPromo -> número menor que "preco" SE estiver em promoção,
                    ou null se não houver promoção
      descricao  -> uma frase curta (aparece no card)
      notas      -> { topo, coracao, fundo } — as notas da pirâmide olfativa
      imagem     -> URL de uma foto do produto, ou "" para usar o
                    ícone de frasco padrão (recomendado até você ter fotos)
      novo       -> true para mostrar o selo "Novo", ou false

   Não é necessário mexer em mais nada — a grade, os filtros e a
   seção de promoções são gerados automaticamente a partir desta lista.
   ========================================================= */

const FAMILIAS = {
  citrico:    "Cítrico",
  floral:     "Floral",
  amadeirado: "Amadeirado",
  doce:       "Doce / Gourmand",
  fresco:     "Fresco / Aquático",
};

const PRODUTOS = [
  {
    id: "perfume-01",
    nome: "Bergamota Dourada",
    familia: "citrico",
    tamanho: "100ml",
    preco: 259.90,
    precoPromo: 199.90,
    descricao: "Abertura vibrante para dias de sol e decisões rápidas.",
    notas: { topo: "Bergamota, limão siciliano", coracao: "Flor de laranjeira, gengibre", fundo: "Almíscar branco, cedro" },
    imagem: "",
    novo: false
  },
  {
    id: "perfume-02",
    nome: "Véu de Jasmim",
    familia: "floral",
    tamanho: "100ml",
    preco: 329.90,
    precoPromo: null,
    descricao: "Floral denso, para quem entra na sala antes de falar.",
    notas: { topo: "Pera, bergamota", coracao: "Jasmim sambac, ylang-ylang", fundo: "Sândalo, baunilha" },
    imagem: "",
    novo: true
  },
  {
    id: "perfume-03",
    nome: "Âmbar Noturno",
    familia: "amadeirado",
    tamanho: "100ml",
    preco: 379.90,
    precoPromo: null,
    descricao: "Quente e envolvente, feito para durar até o fim da noite.",
    notas: { topo: "Cardamomo, pimenta rosa", coracao: "Âmbar, oud", fundo: "Patchouli, couro" },
    imagem: "",
    novo: false
  },
  {
    id: "perfume-04",
    nome: "Caramelo Fumê",
    familia: "doce",
    tamanho: "75ml",
    preco: 289.90,
    precoPromo: 239.90,
    descricao: "Doce com fundo defumado — não enjoa, surpreende.",
    notas: { topo: "Amêndoa, mandarina", coracao: "Caramelo, canela", fundo: "Fava tonka, fumaça de madeira" },
    imagem: "",
    novo: false
  },
  {
    id: "perfume-05",
    nome: "Sal e Mar Aberto",
    familia: "fresco",
    tamanho: "100ml",
    preco: 249.90,
    precoPromo: null,
    descricao: "A sensação de vento com sal — leve, sem ser genérico.",
    notas: { topo: "Toranja, notas marinhas", coracao: "Sálvia, alecrim", fundo: "Âmbar cinza, almíscar" },
    imagem: "",
    novo: false
  },
  {
    id: "perfume-06",
    nome: "Rosa Selvagem",
    familia: "floral",
    tamanho: "100ml",
    preco: 349.90,
    precoPromo: null,
    descricao: "Rosa sem açúcar — mais terra do que buquê.",
    notas: { topo: "Framboesa, pimenta rosa", coracao: "Rosa búlgara, peônia", fundo: "Patchouli, musgo de carvalho" },
    imagem: "",
    novo: false
  },
  {
    id: "perfume-07",
    nome: "Fumo de Vetiver",
    familia: "amadeirado",
    tamanho: "100ml",
    preco: 359.90,
    precoPromo: null,
    descricao: "Seco, terroso, para quem prefere silêncio a fanfarra.",
    notas: { topo: "Bergamota, pimenta preta", coracao: "Vetiver, íris", fundo: "Tabaco, âmbar" },
    imagem: "",
    novo: true
  },
  {
    id: "perfume-08",
    nome: "Baunilha Nua",
    familia: "doce",
    tamanho: "100ml",
    preco: 299.90,
    precoPromo: null,
    descricao: "Baunilha de verdade, sem virar sobremesa.",
    notas: { topo: "Leite de coco, pêra", coracao: "Baunilha bourbon, orquídea", fundo: "Fava tonka, almíscar" },
    imagem: "",
    novo: false
  },
  {
    id: "perfume-09",
    nome: "Limão e Sal Grosso",
    familia: "citrico",
    tamanho: "100ml",
    preco: 229.90,
    precoPromo: null,
    descricao: "Cítrico direto ao ponto, ótimo para o dia a dia.",
    notas: { topo: "Limão siciliano, folha de figueira", coracao: "Manjericão, sal", fundo: "Vetiver, cedro" },
    imagem: "",
    novo: false
  },
  {
    id: "perfume-10",
    nome: "Água de Chuva",
    familia: "fresco",
    tamanho: "100ml",
    preco: 259.90,
    precoPromo: 219.90,
    descricao: "O cheiro do asfalto molhado, refinado.",
    notas: { topo: "Notas ozônicas, bergamota", coracao: "Violeta, chá verde", fundo: "Almíscar, madeira clara" },
    imagem: "",
    novo: false
  },
];

/* ===================== BOTTLE ICON (placeholder) ===================== */
const BOTTLE_SVG = `
<svg class="bottle-icon" viewBox="0 0 120 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="42" y="14" width="36" height="28" rx="6" fill="currentColor" opacity="0.9"/>
  <rect x="50" y="38" width="20" height="34" fill="currentColor" opacity="0.7"/>
  <rect x="30" y="68" width="60" height="134" rx="14" fill="currentColor" opacity="0.55"/>
  <rect x="30" y="68" width="60" height="134" rx="14" fill="none" stroke="currentColor" stroke-width="2" opacity="0.9"/>
</svg>`;

/* ===================== HELPERS ===================== */
function formatBRL(value){
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function waLink(nomeProduto){
  const numero = "5511999999999"; // <-- troque pelo número real, com DDI+DDD, só dígitos
  const texto = encodeURIComponent(`Olá! Tenho interesse no perfume "${nomeProduto}" do catálogo.`);
  return `https://wa.me/${numero}?text=${texto}`;
}

/* ===================== RENDER: FILTROS ===================== */
function renderFiltros(ativa){
  const container = document.getElementById("filters");
  const todas = ["todos", ...Object.keys(FAMILIAS)];
  container.innerHTML = todas.map(chave => {
    const label = chave === "todos" ? "Todos" : FAMILIAS[chave];
    const selecionado = chave === ativa;
    return `<button class="filter-btn" role="tab" data-familia="${chave}" aria-selected="${selecionado}">${label}</button>`;
  }).join("");

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      renderFiltros(btn.dataset.familia);
      renderGrid(btn.dataset.familia);
    });
  });
}

/* ===================== RENDER: CARD DE PRODUTO ===================== */
function cardProduto(p){
  const corVar = `--fam-color: var(--fam-${p.familia})`;
  const temPromo = typeof p.precoPromo === "number" && p.precoPromo < p.preco;
  const precoHtml = temPromo
    ? `<span class="price-old">${formatBRL(p.preco)}</span>${formatBRL(p.precoPromo)}`
    : formatBRL(p.preco);

  const visual = p.imagem
    ? `<img src="${p.imagem}" alt="Frasco do perfume ${p.nome}" loading="lazy">`
    : BOTTLE_SVG;

  const selo = p.novo ? `<span class="product-badge">Novo</span>` : (temPromo ? `<span class="product-badge">Oferta</span>` : "");

  return `
  <article class="product-card" style="${corVar}" data-familia="${p.familia}">
    <div class="product-visual">
      ${selo}
      ${visual}
    </div>
    <div class="product-body">
      <p class="product-family">${FAMILIAS[p.familia]}</p>
      <h3 class="product-name">${p.nome}</h3>
      <p class="product-size">${p.tamanho}</p>
      <p class="product-desc">${p.descricao}</p>

      <div class="product-footer">
        <p class="product-price">${precoHtml}</p>
        <button class="pyramid-toggle" aria-expanded="false">Notas</button>
      </div>

      <div class="pyramid">
        <div class="pyramid-inner">
          <div class="pyramid-levels">
            <div class="pyramid-level">
              <span class="pyramid-bar"></span>
              <span class="pyramid-text"><span class="pyramid-label">Topo</span>${p.notas.topo}</span>
            </div>
            <div class="pyramid-level">
              <span class="pyramid-bar"></span>
              <span class="pyramid-text"><span class="pyramid-label">Coração</span>${p.notas.coracao}</span>
            </div>
            <div class="pyramid-level">
              <span class="pyramid-bar"></span>
              <span class="pyramid-text"><span class="pyramid-label">Fundo</span>${p.notas.fundo}</span>
            </div>
          </div>
          <a class="wa-btn" href="${waLink(p.nome)}" target="_blank" rel="noopener">Perguntar no WhatsApp</a>
        </div>
      </div>
    </div>
  </article>`;
}

/* ===================== RENDER: GRID ===================== */
function renderGrid(familiaAtiva){
  const grid = document.getElementById("productGrid");
  const lista = familiaAtiva === "todos" ? PRODUTOS : PRODUTOS.filter(p => p.familia === familiaAtiva);

  if(lista.length === 0){
    grid.innerHTML = `<p class="empty-state">Nenhum perfume nesta família ainda.</p>`;
    return;
  }

  grid.innerHTML = lista.map(cardProduto).join("");

  grid.querySelectorAll(".pyramid-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const pyramid = btn.closest(".product-body").querySelector(".pyramid");
      const isOpen = pyramid.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen);
      btn.textContent = isOpen ? "Fechar" : "Notas";
    });
  });
}

/* ===================== RENDER: PROMOÇÕES ===================== */
function renderPromos(){
  const track = document.getElementById("promoTrack");
  const promos = PRODUTOS.filter(p => typeof p.precoPromo === "number" && p.precoPromo < p.preco);

  if(promos.length === 0){
    track.innerHTML = `<p class="empty-state">Sem promoções ativas no momento.</p>`;
    return;
  }

  track.innerHTML = promos.map(p => `
    <div class="promo-card">
      <span class="promo-badge">Oferta</span>
      <p class="promo-family">${FAMILIAS[p.familia]}</p>
      <h3>${p.nome}</h3>
      <div class="promo-prices">
        <span class="price-old">${formatBRL(p.preco)}</span>
        <span class="price-new">${formatBRL(p.precoPromo)}</span>
      </div>
    </div>
  `).join("");
}

/* ===================== NAV MOBILE ===================== */
function initNavMobile(){
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("navToggle");
  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen);
  });
  header.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => header.classList.remove("nav-open"));
  });
}

/* ===================== INIT ===================== */
document.addEventListener("DOMContentLoaded", () => {
  renderFiltros("todos");
  renderGrid("todos");
  renderPromos();
  initNavMobile();
  document.getElementById("year").textContent = new Date().getFullYear();
});
