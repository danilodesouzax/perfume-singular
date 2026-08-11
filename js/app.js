/**
 * Catálogo de Perfumes — app principal
 * Produtos e configurações vêm de arquivos JSON em /data
 */

let config = {};
let produtos = [];
let categoriaAtiva = 'todos';
let termoBusca = '';

// ---- Utilitários ----

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function montarLinkWhatsApp(mensagem) {
  const numero = config.contato?.whatsapp || '';
  const texto = encodeURIComponent(mensagem);
  return `https://wa.me/${numero}?text=${texto}`;
}

// ---- Carregar dados ----

async function carregarDados() {
  const [configRes, produtosRes] = await Promise.all([
    fetch('data/config.json'),
    fetch('data/products.json'),
  ]);

  if (!configRes.ok || !produtosRes.ok) {
    throw new Error('Erro ao carregar dados do catálogo.');
  }

  config = await configRes.json();
  produtos = await produtosRes.json();
}

// ---- Aplicar configurações na página ----

function aplicarConfig() {
  document.title = `${config.loja.nome} — Catálogo de Perfumes`;

  document.querySelectorAll('[data-config]').forEach((el) => {
    const valor = getNestedValue(config, el.dataset.config);
    if (valor) el.textContent = valor;
  });

  // Contato
  const telefoneEl = document.querySelector('[data-contact="telefone"]');
  if (telefoneEl) {
    telefoneEl.textContent = config.contato.telefone;
    telefoneEl.href = `tel:${config.contato.telefone.replace(/\D/g, '')}`;
  }

  const emailEl = document.querySelector('[data-contact="email"]');
  if (emailEl) {
    emailEl.textContent = config.contato.email;
    emailEl.href = `mailto:${config.contato.email}`;
  }

  document.querySelector('[data-contact="endereco"]').textContent = config.contato.endereco;
  document.querySelector('[data-contact="horario"]').textContent = config.contato.horario;

  // Redes sociais
  document.querySelectorAll('[data-social]').forEach((el) => {
    const rede = el.dataset.social;
    const url = config.redes?.[rede];
    if (url) {
      el.href = url;
      el.classList.remove('hidden');
    } else {
      el.style.display = 'none';
    }
  });

  // WhatsApp geral
  const msgGeral = config.contato.whatsappMensagem || 'Olá! Gostaria de saber mais sobre os perfumes.';
  document.querySelectorAll('[data-action="whatsapp-geral"]').forEach((el) => {
    el.href = montarLinkWhatsApp(msgGeral);
    el.target = '_blank';
    el.rel = 'noopener';
  });

  document.getElementById('ano-atual').textContent = new Date().getFullYear();
}

// ---- Promoções ----

function renderizarPromocoes() {
  const grid = document.getElementById('promocoes-grid');
  const ativas = config.promocoes?.filter((p) => p.ativo) || [];

  if (ativas.length === 0) {
    document.getElementById('promocoes').classList.add('hidden');
    return;
  }

  grid.innerHTML = ativas
    .map(
      (promo) => `
    <article class="promo-card">
      <span class="promo-card__badge">${promo.badge}</span>
      <h3 class="promo-card__titulo">${promo.titulo}</h3>
      <p class="promo-card__desc">${promo.descricao}</p>
    </article>
  `
    )
    .join('');
}

// ---- Filtros de categoria ----

function renderizarFiltros() {
  const container = document.getElementById('filtros-categoria');
  const categorias = config.categorias || [{ id: 'todos', nome: 'Todos' }];

  container.innerHTML = categorias
    .map(
      (cat) => `
    <button class="filtro-btn ${cat.id === categoriaAtiva ? 'active' : ''}"
            data-categoria="${cat.id}">
      ${cat.nome}
    </button>
  `
    )
    .join('');

  container.querySelectorAll('.filtro-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      categoriaAtiva = btn.dataset.categoria;
      container.querySelectorAll('.filtro-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderizarProdutos();
    });
  });
}

// ---- Produtos ----

function filtrarProdutos() {
  return produtos.filter((p) => {
    const matchCategoria = categoriaAtiva === 'todos' || p.categoria === categoriaAtiva;
    const termo = termoBusca.toLowerCase();
    const matchBusca =
      !termo ||
      p.nome.toLowerCase().includes(termo) ||
      p.marca.toLowerCase().includes(termo) ||
      p.descricao.toLowerCase().includes(termo) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(termo)));
    return matchCategoria && matchBusca;
  });
}

function criarCardProduto(produto) {
  const badges = [];
  if (produto.destaque) badges.push('<span class="badge badge--destaque">Destaque</span>');
  if (produto.promocao) badges.push('<span class="badge badge--promo">Promoção</span>');

  const precoAntigo = produto.precoAntigo
    ? `<span class="produto-card__preco-antigo">${formatarPreco(produto.precoAntigo)}</span>`
    : '';

  const msgWhatsApp = `${config.contato.whatsappMensagem} *${produto.nome}* (${produto.marca}) — ${formatarPreco(produto.preco)}`;

  return `
    <article class="produto-card" data-id="${produto.id}">
      <div class="produto-card__img-wrap">
        <img class="produto-card__img" src="${produto.imagem}" alt="${produto.nome}" loading="lazy"
             onerror="this.src='images/products/placeholder.svg'">
        ${badges.length ? `<div class="produto-card__badges">${badges.join('')}</div>` : ''}
      </div>
      <div class="produto-card__body">
        <p class="produto-card__marca">${produto.marca}</p>
        <h3 class="produto-card__nome">${produto.nome}</h3>
        <p class="produto-card__volume">${produto.volume}</p>
        <div class="produto-card__precos">
          <span class="produto-card__preco">${formatarPreco(produto.preco)}</span>
          ${precoAntigo}
        </div>
        <div class="produto-card__actions">
          <button class="btn btn--outline btn--sm btn-detalhes" data-id="${produto.id}">Detalhes</button>
          <a href="${montarLinkWhatsApp(msgWhatsApp)}" class="btn btn--primary btn--sm" target="_blank" rel="noopener">Consultar</a>
        </div>
      </div>
    </article>
  `;
}

function renderizarProdutos() {
  const grid = document.getElementById('produtos-grid');
  const empty = document.getElementById('catalogo-empty');
  const filtrados = filtrarProdutos();

  if (filtrados.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.innerHTML = filtrados.map(criarCardProduto).join('');

  grid.querySelectorAll('.btn-detalhes').forEach((btn) => {
    btn.addEventListener('click', () => abrirModal(btn.dataset.id));
  });
}

// ---- Modal ----

function abrirModal(produtoId) {
  const produto = produtos.find((p) => p.id === produtoId);
  if (!produto) return;

  const modal = document.getElementById('modal-produto');
  const body = document.getElementById('modal-body');

  const precoAntigo = produto.precoAntigo
    ? `<span class="modal__preco-antigo">${formatarPreco(produto.precoAntigo)}</span>`
    : '';

  const tags = (produto.tags || [])
    .map((t) => `<span class="tag">${t}</span>`)
    .join('');

  const msgWhatsApp = `${config.contato.whatsappMensagem} *${produto.nome}* (${produto.marca}) — ${formatarPreco(produto.preco)}`;

  body.innerHTML = `
    <img class="modal__img" src="${produto.imagem}" alt="${produto.nome}"
         onerror="this.src='images/products/placeholder.svg'">
    <p class="modal__marca">${produto.marca}</p>
    <h2 class="modal__nome">${produto.nome}</h2>
    <p class="modal__volume">${produto.volume}</p>
    <p class="modal__desc">${produto.descricao}</p>
    ${tags ? `<div class="modal__tags">${tags}</div>` : ''}
    <div class="modal__precos">
      <span class="modal__preco">${formatarPreco(produto.preco)}</span>
      ${precoAntigo}
    </div>
    <a href="${montarLinkWhatsApp(msgWhatsApp)}" class="btn btn--primary" target="_blank" rel="noopener">
      Consultar no WhatsApp
    </a>
  `;

  modal.showModal();
}

// ---- Navegação mobile ----

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  toggle.addEventListener('click', () => {
    const aberto = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', aberto);
  });

  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Modal close ----

function initModal() {
  const modal = document.getElementById('modal-produto');
  modal.querySelector('.modal__close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
}

// ---- Busca ----

function initBusca() {
  const input = document.getElementById('search-input');
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      termoBusca = input.value.trim();
      renderizarProdutos();
    }, 250);
  });
}

// ---- Inicialização ----

async function init() {
  try {
    await carregarDados();
    aplicarConfig();
    renderizarPromocoes();
    renderizarFiltros();
    renderizarProdutos();
    initNav();
    initModal();
    initBusca();
  } catch (err) {
    console.error(err);
    document.getElementById('produtos-grid').innerHTML =
      '<p class="catalogo__empty">Não foi possível carregar o catálogo. Verifique se os arquivos em /data existem.</p>';
  }
}

init();
