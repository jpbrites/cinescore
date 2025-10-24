# 🎬 Documentação do Projeto – CineScore

## 📝 Descrição Geral

O **CineScore** é uma aplicação desenvolvida como parte de um desafio técnico que permite aos usuários explorar filmes e séries, adicionar seus títulos favoritos a uma lista personalizada e compartilhar essa lista por meio de um link gerado automaticamente.

A aplicação é dividida em duas partes:

- **Frontend**: desenvolvido em React, com deploy realizado na Vercel.
- **Backend**: desenvolvido em Node.js com Express e MongoDB Atlas.

## 🚀 Deploy da Aplicação

- **Frontend online**: [https://cinescore-front.vercel.app/](https://cinescore-front.vercel.app/)
- **Backend**: executado localmente (necessário configurar conforme instruções abaixo).

## 🧩 Tecnologias Utilizadas

### Frontend
- React
- React Router DOM
- Axios
- js-cookie
- CSS puro

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- CORS
- dotenv

## ⚙️ Configuração e Execução do Projeto

### 🔹 Requisitos

Antes de começar, é necessário ter instalado em sua máquina:

- Node.js (versão 16 ou superior)
- NPM ou Yarn
- Conta gratuita no MongoDB Atlas

## 🖥️ Configuração do Backend

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/jpbrites/cinescore.git
cd backend
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

## 🌐 Criando o Cluster no MongoDB Atlas

### Etapa 1 — Criar conta e projeto

1. Acesse [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta (ou faça login)

### Etapa 2 — Criar o Cluster gratuito

1. Dentro do projeto, clique em **Create a Cluster** ou **Create**
<img width="1919" height="900" alt="image" src="https://github.com/user-attachments/assets/09b7f421-17dc-4c56-8cc6-1cf90ebe4319" />
3. Escolha a opção **Free Tier (M0)**
4. Mantenha as configurações padrão e crie o cluster
5. Aguarde a criação (pode levar alguns minutos)

### Etapa 3 — Criar um usuário de banco

1. Vá em **Database Access** → **Add New Database User**
2. Escolha um username e password (exemplo: `cinescore_user` / `SenhaForte123!`)
3. Selecione **Read and write to any database**
4. Clique em **Add User**

### Etapa 4 — Permitir acesso de IP

1. Vá em **Network Access** → **Add IP Address**
2. Adicione `0.0.0.0/0` para permitir acesso de qualquer IP (recomendado para testes e avaliação)

3. Salve as alterações

### Etapa 5 — Obter a string de conexão

1. Vá em **Clusters** → **Connect** → **Connect your application**
2. Copie a connection string, que será parecida com isto:

```
mongodb+srv://<username>:<password>@cluster0.lb5gqyh.mongodb.net/filmes?retryWrites=true&w=majority
```

3. Substitua `<username>` e `<password>` pelos dados do usuário criado

**Exemplo:**
```
mongodb+srv://cinescore_user:SenhaForte123!@cluster0.lb5gqyh.mongodb.net/filmes?retryWrites=true&w=majority
```

## 🧾 Configurar o arquivo .env do Backend

Na pasta `backend`, crie um arquivo `.env` com o seguinte conteúdo:

```env
PORT=5000
MONGO_URI=mongodb+srv://cinescore_user:SenhaForte123%21@cluster0.lb5gqyh.mongodb.net/filmes?retryWrites=true&w=majority
TMDB_API_KEY=aa36e8164c949f157047d13c20d07cdd
```

> 🔒 **Importante**: A URL do MONGO_URI acima é apenas um exemplo, você deve colocar a que gerou no seu cluster.

### 6️⃣ Iniciar o servidor

```bash
npm run dev
```

O backend será executado em:
👉 [http://localhost:5000](http://localhost:5000)

## 💻 Configuração do Frontend

### 1️⃣ Acesse o diretório

```bash
cd ../frontend
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 4️⃣ Inicie a aplicação React

```bash
npm start
```

O frontend será executado em:
👉 [http://localhost:3000](http://localhost:3000) Ou simplesmente no ambiente que já foi feito deploy: [https://cinescore-front.vercel.app/](https://cinescore-front.vercel.app/)

## 🧭 Principais Funcionalidades

- **Autenticação simples**: Armazena o ID e nome do usuário no localStorage.
- **Listagem de filmes e séries**: Consome a API pública do TMDB.
- **Favoritar e remover**: O usuário pode adicionar e remover títulos.
- **Compartilhar lista**: Gera um link único que copia automaticamente.
- **Modal de feedback**: Exibe mensagens de sucesso ou erro.

**Desenvolvido como desafio técnico** 🚀
