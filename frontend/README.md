# Passa a Bola

## Visão Geral

O **Passa a Bola** é uma plataforma web que conecta organizadores de eventos esportivos e voluntários, permitindo cadastro de eventos, inscrições, gerenciamento de participantes e recursos extras como mapa de localização, carrinho de doações e painel administrativo. A plataforma visa facilitar a organização de eventos e melhorar a experiência do usuário, com foco em esportes e ações comunitárias.

---

## 📋 Equipe SmoothPath
- Geovana Maria da Silva Cardoso - 566254
- Gabriel dos Santos Cardoso - 561203
- Gustavo Torres Caldeira - 561613
- Lucas Oliveira Santos - 563617
- Mariana Silva do Egito Moreira - 562544
- 1ESPF - Engenharia de Software

--- 

## Funcionalidades Principais

### Para Usuários

* Cadastro e login seguro com autenticação JWT.
* Atualização de perfil e acompanhamento de pontos de participação.
* Exploração de eventos ativos e inscrição rápida.
* Cancelamento de inscrições em eventos.
* Visualização de eventos já inscritos.

### Para Administradores

* Painel administrativo completo.
* Criação, edição e remoção de eventos.
* Gerenciamento de inscritos (adicionar/remover).
* Exportação de relatórios (CSV) de eventos e participantes.
* Controle de status dos eventos (ativo, inativo, encerrado).

### Recursos Extras

* Mapa interativo para localizar eventos (Google Maps / Leaflet / OpenStreetMap).
* Carrinho de doações e produtos relacionados a eventos.
* Sistema de pontuação para participantes.

---

## Tecnologias Utilizadas

### Backend

* Node.js
* Express.js
* JWT para autenticação
* Bcrypt.js para criptografia de senhas
* CORS e JSON como middlewares
* Banco de dados em memória (simulação) — pode ser adaptado para MongoDB, PostgreSQL ou outro

### Frontend

* React.js com React Router
* Tailwind CSS para estilização
* Context API para gerenciamento de estado (usuário e carrinho)
* Axios para comunicação com a API

### Integrações

* Mapas interativos com Leaflet / Google Maps


---

## Estrutura do Projeto

```
passa-a-bola/
│
├─ backend/
│   ├─ server.js
│   ├─ routes/
│   │   ├─ auth.js
│   │   └─ eventos.js
│   └─ models/ (opcional para banco real)
│
├─ frontend/
│   ├─ src/
│   │   ├─ pages/           # Páginas React (PerfilADM, EventosNovo, etc)
│   │   ├─ components/      # Componentes reutilizáveis (Navbar, Footer, Login)
│   │   ├─ services/        # Comunicação com API
│   │   └─ contexts/        # Contextos (AuthContext, CartContext)
│   └─ index.html
│
├─ .env                     # Variáveis de ambiente
├─ package.json
└─ README.md
```

---

## Instalação e Execução

### 1. Backend

```bash
cd backend
npm install
node server.js   
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev       # abre a aplicação no navegador
```

### 3. Variáveis de ambiente

* `VITE_API_URL` → URL do backend (ex: `http://localhost:5000/api`)

---

## Acesso

* **Usuário comum**: criar conta e participar de eventos.
* **Administrador**: login com credenciais pré-definidas (`admin@passabola.app`) para acessar painel e gerenciar eventos.

---

## Próximos Passos / Melhorias

* Notificações push para eventos.
* Sistema de gamificação e pontos detalhado.
* Integração com API de pagamento/donativos.
* Melhorias na interface e acessibilidade.

---
