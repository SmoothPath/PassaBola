# 📌 API Passa a Bola

API REST para gerenciamento de usuários, eventos e inscrições.

Base URL: `http://localhost:5000/api`

---

## **🔑 Autenticação / Usuários**

| Endpoint         | Método | Autenticação | Descrição                               |
| ---------------- | ------ | ------------ | --------------------------------------- |
| `/auth/register` | POST   | ❌ Não        | Registrar um novo usuário               |
| `/auth/login`    | POST   | ❌ Não        | Fazer login e obter token JWT           |
| `/auth/profile`  | GET    | ✅ Bearer     | Obter perfil do usuário autenticado     |
| `/auth/profile`  | PUT    | ✅ Bearer     | Atualizar perfil do usuário autenticado |

### **Registrar Usuário**

**POST** `/auth/register`

**Body JSON:**

```json
{
  "email": "usuario@email.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

**Resposta de sucesso (201):**

```json
{
  "message": "Usuário criado com sucesso",
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "points": 0,
    "role": "user"
  }
}
```

---

### **Login**

**POST** `/auth/login`

**Body JSON:**

```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta de sucesso (200):**

```json
{
  "message": "Login realizado com sucesso",
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "points": 0,
    "role": "user"
  }
}
```

---

### **Obter Perfil**

**GET** `/auth/profile`
**Autenticação:** ✅ Bearer Token

**Resposta de sucesso (200):**

```json
{
  "id": 1,
  "email": "usuario@email.com",
  "name": "Nome do Usuário",
  "points": 0,
  "role": "user"
}
```

---

### **Atualizar Perfil**

**PUT** `/auth/profile`
**Autenticação:** ✅ Bearer Token

**Body JSON (opcional):**

```json
{
  "points": 10,
  "position": "Atacante",
  "location": "Cidade",
  "age": 25,
  "eventsParticipated": 5,
  "experience": "Intermediário"
}
```

**Resposta de sucesso (200):**

```json
{
  "message": "Perfil atualizado com sucesso",
  "user": {
    "id": 1,
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "points": 10,
    "position": "Atacante",
    "location": "Cidade",
    "age": 25,
    "eventsParticipated": 5,
    "experience": "Intermediário",
    "role": "user"
  }
}
```

---

## **🎉 Eventos**

| Endpoint                        | Método | Autenticação | Restrição | Descrição                                   |
| ------------------------------- | ------ | ------------ | --------- | ------------------------------------------- |
| `/eventos/`                     | POST   | ✅ Bearer     | Admin     | Criar evento                                |
| `/eventos/`                     | GET    | ✅ Bearer     | —         | Listar eventos                              |
| `/eventos/:id`                  | GET    | ✅ Bearer     | —         | Obter evento                                |
| `/eventos/:id`                  | PUT    | ✅ Bearer     | Admin     | Atualizar evento                            |
| `/eventos/:id`                  | DELETE | ✅ Bearer     | Admin     | Remover evento                              |
| `/eventos/:id/inscrever`        | POST   | ✅ Bearer     | —         | Inscrever usuário em evento                 |
| `/eventos/:id/cancelar`         | POST   | ✅ Bearer     | —         | Cancelar inscrição do usuário               |
| `/eventos/:id/inscritos/:email` | DELETE | ✅ Bearer     | Admin     | Remover inscrito específico                 |
| `/eventos/meus/inscritos`       | GET    | ✅ Bearer     | —         | Listar eventos em que usuário está inscrito |

---

### **Criar Evento (Admin)**

**POST** `/eventos/`

**Body JSON:**

```json
{
  "titulo": "Futebol de Bairro",
  "dataISO": "2025-09-15T18:00:00.000Z",
  "local": "Praça Central",
  "capacidade": 20,
  "descricao": "Evento aberto para todos",
  "status": "ativo"
}
```

**Resposta de sucesso (201):**

```json
{
  "ok": true,
  "evento": {
    "id": 1,
    "titulo": "Futebol de Bairro",
    "dataISO": "2025-09-15T18:00:00.000Z",
    "local": "Praça Central",
    "capacidade": 20,
    "descricao": "Evento aberto para todos",
    "status": "ativo",
    "createdBy": "admin@passabola.app",
    "createdAt": "2025-09-15T15:00:00.000Z",
    "inscritos": []
  }
}
```

---

### **Listar Eventos**

**GET** `/eventos/`
**Query Parameters (opcional):** `q`, `status`

**Resposta de sucesso (200):**

```json
{
  "ok": true,
  "eventos": [ {...}, {...} ]
}
```

---

### **Obter Evento**

**GET** `/eventos/:id`

**Exemplo:** `/eventos/1`

**Resposta de sucesso (200):**

```json
{
  "ok": true,
  "evento": { ... }
}
```

---

### **Atualizar Evento (Admin)**

**PUT** `/eventos/:id`

**Body JSON (qualquer campo a atualizar):**

```json
{
  "titulo": "Novo Título",
  "status": "inativo"
}
```

**Resposta de sucesso (200):**

```json
{
  "ok": true,
  "evento": { ... }
}
```

---

### **Remover Evento (Admin)**

**DELETE** `/eventos/:id`

**Resposta de sucesso (200):**

```json
{
  "ok": true
}
```

---

### **Inscrever no Evento**

**POST** `/eventos/:id/inscrever`

**Resposta de sucesso (200):**

```json
{
  "ok": true,
  "evento": { ... }
}
```

---

### **Cancelar Inscrição**

**POST** `/eventos/:id/cancelar`

**Resposta de sucesso (200):**

```json
{
  "ok": true,
  "evento": { ... }
}
```

---

### **Remover Inscrito (Admin)**

**DELETE** `/eventos/:id/inscritos/:email`

**Resposta de sucesso (200):**

```json
{
  "ok": true,
  "removed": true,
  "evento": { ... }
}
```

---

### **Eventos do Usuário**

**GET** `/eventos/meus/inscritos`

**Resposta de sucesso (200):**

```json
{
  "ok": true,
  "eventos": [ {...}, {...} ]
}
```

---

## **⚡ Observações Técnicas**

1. Todos os endpoints que requerem autenticação devem receber o token JWT no header:

```
Authorization: Bearer <JWT_TOKEN>
```

2. Usuários comuns só podem acessar eventos e inscrever-se.
3. Usuários admin podem criar, atualizar, deletar eventos e remover inscritos.

---

## **🔗 Frontend Integration**

* Base URL configurada em `frontend/src/services/api.js`
* Funções de serviço em `frontend/src/services/eventos.js`:

  * `listEventos()`
  * `createEvento()`
  * `getEvento()`
  * `updateEvento()`
  * `deleteEvento()`
  * `inscreverNoEvento()`
  * `desinscreverDoEvento()`
  * `removerInscrito()`
