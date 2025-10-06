
# 🚀 **Statera – ETEC Bento Quirino**

### Índice

- [📌 Sobre](#sobre-o-projeto)
- [📦 Estrutura do Projeto](#estrutura-do-projeto)
- [⚙️ Como Instalar e Rodar](#como-instalar-e-rodar)
- [💠 Funcionalidades](#funcionalidades)
- [📄 Documentação da API](#documentacao-da-api)
- [📍 Endpoints Principais](#endpoints-principais)
- [📦 Dependências](#dependencias)
- [👥 Autores do Projeto](#autores-do-projeto)

---


## 📌 **Sobre o Projeto**


A **Statera** é uma API que tem por objetivo ser  utilizada por abrigos de adoção para facilitar os processos decorrentes de uma adoção.

---
## 📦 **Estrutura do Projeto**
    📂 Statera/
     │
     
     ├──📁 src/
     
     │   ├──📁 models/
     
     │   │   ├── Animal.js
     
     │   │   ├── Doacao.js
     
     │   │   ├── Modelos.js
     
     │   │   ├── PedidoAdocao.js
     
     │   │   ├── Questionario.js
     
     │   │   └── Usuario.js
     
     │   │
     
     │   ├──📁 controllers/
     
     │   │   ├── adminController.js
     
     │   │   ├── adocaoController.js
     
     │   │   ├── animalController.js
     
     │   │   ├── authController.js
     
     │   │   ├── doacaoController.js
     
     │   │   ├── questionarioController.js
     
     │   │   └── tutorController.js
     
     │   │
     
     │   ├──📁 services/
     
     │   │   ├── adminService.js
     
     │   │   ├── adocaoService.js
     
     │   │   ├── animalService.js
     
     │   │   ├── authService.js
     
     │   │   ├── doacaoService.js
     
     │   │   ├── questionarioService.js
     
     │   │   └── tutorService.js
     
     │   │
     
     │   ├──📁 routes/
     
     │   │   ├── adminRoutes.js
     
     │   │   ├── adocaoRoutes.js
     
     │   │   ├── animalRoutes.js
     
     │   │   ├── authRoutes.js
     
     │   │   ├── doacaoRoutes.js
     
     │   │   ├── questionarioRoutes.js
     
     │   │   └── tutorRoutes.js
     
     │   │
     
     │   │
     
     │   ├──📁 database/
     
     │   │   ├── init.js
     
     │   │   └── seeders/

     │   │   │   ├── seedAdmin.js
     
     │   │
     
     │   ├──📁 middlewares/
     
     │   ├── isAdmin.js
     
     │   └── verifytoken.js
     
     │
     
     │
     
     ├── .gitignore
     
     ├── package.json
     
     ├── Swagger.json
     
     ├── server.js
     
     └── README.md             



---

## ⚙️ **Como Instalar e Rodar**

### **Clone o repositório:**

```bash
git clone https://github.com//MarinhoCorrea/Statera.git
cd Statera

```

### **Backend**

1️⃣ **Criar um arquivo `.env`** 

2️⃣ **Instalar dependências**:

```bash
 npm install

```

3️⃣ **Iniciar o servidor**:

```bash
  npm start

```

## 💠 **Funcionalidades**

 🔹 Autenticação: Para fazer login no sistema é feita uma verificação que ao aprovada libera o token para acessar as rotas protegidas . 
 
 🔹 Gestão de Animais: Cadastro, visualização e atualização, com campos detalhados como espécie, porte, status de castração e vacinação.

 🔹 Gestão de Tutores: Registro de novos usuários com dados pessoais, incluindo um questionário detalhado para avaliar o perfil do potencial adotante. Isso garante que os animais sejam encaminhados para lares compatíveis e responsáveis.

 🔹 Processo de Adoção: Criação de pedidos de adoção que são organizados em uma fila de análise. O sistema assegura que apenas tutores com o questionário preenchido possam solicitar a adoção, mantendo a integridade do processo.

 🔹 Área Administrativa: Endpoints exclusivos para administradores, que permitem a visualização de todos os animais (mesmo os adotados) ou a visualização de um somente, a atualização de seus status e a remoção de perfis. Isso garante controle e segurança sobre as informações da plataforma.

 🔹 Apoio Financeiro: Um endpoint dedicado para registro de doações, que gera um link e um QR Code Pix para facilitar o apoio à ONG.

---

## 📄 **Documentação da API**


📌 A API segue o padrão REST e está documentada no Swagger.

---

### Endpoints Principais

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | /animais |  Lista os animais disponíveis para adoção com suporte a filtros |
| GET | /tutores/:id | Busca os dados de um tutor pelo ID, incluindo o questionário se existir. |
| GET | /admin/animais | Retorna a lista completa de animais, incluindo os já adotados, com opções de filtros.  |
| GET | /admin/animais/:id | Busca os detalhes completos de um animal, incluindo informações sobre os pedidos de adoção. |
| POST | /autenticacao | Realiza o login de Tutor/Administrador |
| POST | /animais | Cadastra um novo animal no sistema. |
| POST | /tutores |  Cria uma nova conta de usuário/tutor no sistema |
| POST | /questionário | Envia o questionário de adoção, que é pré-requisito para fazer um pedido. |
| POST | /adocoes | Cria um pedido de adoção para um animal |
| POST | /doacao | Registra uma doação e simula a geração de um QR Code/Link Pix |
| PATCH | /tutores/:id | Permite atualizar dados do tutor e/ou preencher/atualizar o questionário de adoção simultaneamente. |
| PATCH | /admin/animais/:id | Atualiza o status de um animal |
| DELETE | /admin/animais/:id | Remove um animal da base de dados  |

---

## 📦 **Dependências**

***Este projeto utiliza várias dependências para fornecer funcionalidades como autenticação, manipulação de banco de dados, geração de QR codes e muito mais. Abaixo está uma descrição de cada uma das bibliotecas utilizadas.***

**🔐 bcryptjs**

 Biblioteca utilizada para criptografar e hashear senhas de forma segura.

**⚙️ dotenv**

 Carrega variáveis de ambiente de um arquivo .env para o process.env, permitindo uma separação clara entre código e configuração sensível (como senhas e tokens).


**🌐 express**

 Framework web minimalista e rápido para Node.js. Utilizado para criar rotas, middlewares e estruturar a API de forma organizada.


**🔑 jsonwebtoken**

 Implementa **JSON Web Tokens (JWT)**, essencial para a autenticação e autorização dos usuários, permitindo acesso seguro às rotas protegidas.


**🔄 nodemon (Dev Dependency)**

 Ferramenta de desenvolvimento que reinicia o servidor automaticamente ao detectar alterações nos arquivos.


**📷 qrcode** 

 Biblioteca para geração de códigos QR. Utilizada para criar QR codes Pix.

**🧩 sequelize** 

 ORM (Object-Relational Mapper). Usado para interagir com o banco de dados de forma orientada a objetos, facilitando as operações de CRUD.

**🗃️ sqlite3** 

 Driver do SQLite. Um banco de dados leve baseado em arquivos, para o banco de dados local.

**📄 Swagger Ui Express**

 Adiciona uma interface de documentação interativa (Swagger UI) à API, facilitando a visualização e teste dos endpoints.

**🛣️ Path**
 Módulo nativo do Node.js usado para lidar com caminhos de arquivos e diretórios de forma consistente entre diferentes sistemas operacionais.

**🔗 Url**
 Módulo nativo do Node.js usado para parsing (análise) e formatação de URLs, facilitando a manipulação de endereços web.

**🆔 Uudi**
Gera identificadores universais únicos (UUIDs), utilizados para criar IDs únicos e não sequenciais para animais, usuários ou outros recursos.

**🐘 Pg**
Driver do PostgreSQL. Permite que o Sequelize se conecte e gerencie dados no banco de dados PostgreSQL,para o banco de dados da nuvem.

---

## 👥 **Autores do Projeto**

- Muryllo Jesus Alves Linhares
- Pedro Marinho Rodriguês Camargo Corrêa
- Pedro Isaías Gomes de Jesus
- Pyetro Fabrício Peterlini
- Thiago Lameiras de Mattos
