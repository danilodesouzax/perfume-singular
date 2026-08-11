# Perfume Singular — Catálogo de Perfumes

Landing page estática para exibir catálogo de perfumes. Sem backend, sem envio de e-mail — apenas vitrine com contato via WhatsApp e links sociais.

## Como visualizar localmente

Abra o arquivo `index.html` no navegador, ou use um servidor local:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Acesse `http://localhost:8080`

> **Importante:** use um servidor local (não abra o HTML direto pelo Explorer) para que o JavaScript consiga carregar os arquivos JSON.

## Como adicionar produtos

Edite `data/products.json` e adicione um novo objeto:

```json
{
  "id": "p007",
  "nome": "Nome do Perfume",
  "marca": "Marca",
  "categoria": "feminino",
  "volume": "100ml",
  "preco": 299.90,
  "precoAntigo": null,
  "destaque": false,
  "promocao": false,
  "descricao": "Descrição do perfume...",
  "imagem": "images/products/sua-foto.jpg",
  "tags": ["floral", "noite"]
}
```

**Categorias disponíveis:** `feminino`, `masculino`, `unissex`, `kits`

Coloque a foto em `images/products/` (JPG ou PNG recomendado, ~800×800px).

## Como personalizar a loja

Edite `data/config.json`:

- **loja** — nome, slogan, descrição
- **contato** — WhatsApp, telefone, e-mail, endereço, horário
- **redes** — links do Instagram, Facebook, TikTok
- **promocoes** — banners de promoção (defina `"ativo": false` para ocultar)
- **categorias** — filtros do catálogo

## Estrutura do projeto

```
catalogo-produtos/
├── index.html          # Página principal
├── css/style.css       # Estilos
├── js/app.js           # Lógica (filtros, busca, modal)
├── data/
│   ├── config.json     # Configurações da loja
│   └── products.json   # Lista de produtos
└── images/
    ├── logo.svg
    └── products/       # Fotos dos produtos
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `perfume-singular`)
2. No terminal, na pasta do projeto:

```powershell
git branch -M main
git add .
git commit -m "Catálogo Perfume Singular — site inicial"
git remote add origin https://github.com/SEU_USUARIO/perfume-singular.git
git push -u origin main
```

3. No GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)**
4. Aguarde ~1 minuto. O site ficará em:

`https://SEU_USUARIO.github.io/perfume-singular/`

## Onde hospedar (alternativas)

| Plataforma | Prós | Como publicar |
|---|---|---|
| **GitHub Pages** | Grátis, domínio `.github.io`, fácil com Git | Push do repo → Settings → Pages |
| **Netlify** | Grátis, deploy automático, domínio customizado | Arraste a pasta ou conecte ao Git |
| **Vercel** | Grátis, rápido, bom para sites estáticos | `npx vercel` na pasta do projeto |
| **Cloudflare Pages** | Grátis, CDN global, domínio customizado | Conecte repositório Git |

Qualquer uma funciona — o site é 100% estático (HTML + CSS + JS).

## Próximos passos sugeridos

1. Trocar placeholders por fotos reais dos perfumes
2. Atualizar `config.json` com seus dados reais (WhatsApp, Instagram)
3. Ajustar cores em `css/style.css` (variáveis no topo do arquivo)
4. Registrar domínio próprio (ex: `seunomeperfumes.com.br`) e apontar na hospedagem
