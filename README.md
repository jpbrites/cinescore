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

2. Escolha a opção Free
<img width="1918" height="901" alt="image" src="https://github.com/user-attachments/assets/239f249e-4b78-40d2-8b30-266a5db729d4" />

3. Mantenha as configurações padrão e crie o cluster

4. Aguarde a criação (pode levar alguns minutos)


### Etapa 3 — Escolha do Método de conexão e Usuário de banco

1. Inicialmente ele irá gerar um usuário de banco, salve o usuário e senha, e clique em 'create a database user'
<img width="828" height="529" alt="image" src="https://github.com/user-attachments/assets/111ba3cb-9a08-4380-a163-d74512766c09" />

2. Em seguida no método de conexão, escolha a opção **Drivers**
<img width="835" height="841" alt="image" src="https://github.com/user-attachments/assets/ffaa9bdc-7934-47ce-8728-4c7c59d36eb5" />

3. Em seguida clique em **Done**
<img width="801" height="905" alt="image" src="https://github.com/user-attachments/assets/aad28ebd-acc4-42b8-9964-1adc127fc474" />

### Etapa 4 — Criando a database

1. No menu **Data explorer**, clique em **Create Database**
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/76c6d2a5-d8d6-47fe-b52f-5a4e9c3cfbfe" />

3. Coloque os nomes como na imagem e salve
<img width="632" height="436" alt="image" src="https://github.com/user-attachments/assets/c8794233-ddc2-4b9c-8a3f-acd248974db5" />


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
