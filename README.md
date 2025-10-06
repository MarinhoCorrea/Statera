
# 🚀 **Statera – ETEC Bento Quirino**

### Índice

- [📌 Sobre](#sobre-o-projeto)
- [📦 Estrutura do Projeto](#estrutura-do-projeto)
- [⚙️ Como Instalar e Rodar](#como-instalar-e-rodar)
- [💠 Funcionalidades](#funcionalidades)
- [📄 Documentação da API](#documentacao-da-api)
- [Endpoints Principais](#endpoints-principais)
- [📦 Dependências](#dependencias)
- [👥 Autores do Projeto](#autores-do-projeto)

## 📌 **Sobre o Projeto**

A **Statera** é uma API que tem por objetivo ser  utilizada por abrigos de adoção para facilitar os processos decorrentes de uma adoção.


.

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
git clone <https://github.com//MarinhoCorrea/Statera.git>
cd Statera

```

### **Backend**

1️⃣ **Criar um arquivo `.env`** baseado no `exemplo.env`.

2️⃣ **Instalar dependências**:

```bash
 npm install

```

3️⃣ **Iniciar o servidor**:

```bash
  npm start

```

## 💠 **Funcionalidades**

 🔹 Gestão de Animais: Cadastro, visualização, atualização e remoção de animais disponíveis para adoção, com campos detalhados como espécie, porte, status de castração e vacinação.

 🔹 Gestão de Tutores: Registro de novos usuários com dados pessoais, incluindo um questionário detalhado para avaliar o perfil do potencial adotante. Isso garante que os animais sejam encaminhados para lares compatíveis e responsáveis.

 🔹 Processo de Adoção: Criação de pedidos de adoção que são organizados em uma fila de análise. O sistema assegura que apenas tutores com o questionário preenchido possam solicitar a adoção, mantendo a integridade do processo.

 🔹 Área Administrativa: Endpoints exclusivos para administradores, que permitem a visualização de todos os animais (mesmo os adotados), a atualização de seus status e a remoção de perfis. Isso garante controle e segurança sobre as informações da plataforma.

 🔹 Apoio Financeiro: Um endpoint dedicado para registro de doações, que gera um link e um QR Code Pix para facilitar o apoio à ONG.

---

## 📄 **Documentação da API**

📌 A API segue o padrão REST e está documentada no Swagger.

✅ Acesse a documentação Swagger: 🔗 [Clique Aqui](https://www.notion.so/backend/swagger.json)

---

### Endpoints Principais

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | /animais |  Lista os animais disponíveis para adoção com suporte a filtros |
| GET | /tutores/:id | Retorna os dados e o questionário preenchido do tutor. |
| GET | /admin/animais | Permite ao administrador visualizar todos os animais com filtros avançados  |
| GET | /animais/:id | Busca um animal por seu id e retorna todas as informações do animal com lista de pedidos (interessados) |
| POST | /animais | Cadastra um novo animal disponível para adoção |
| POST | /tutores |  Cadastra um novo usuario com seus dados |
| POST | /questionário | Cadastra o questionário que o tutor precisa responder para adotar |
| POST | /adocoes | Cria um novo pedido de adoção |
| POST | /login | Realizar a validação do email e senha registrados pelo usuário |
| POST | /doacoes | Registra uma doação recebida com nome, valor e data. |
| PATCH | /tutores/:id | Permite ao tutor atualizar seus dados e/ou completar o questionário obrigatório |
| PATCH | /admin/animais/:id | Atualiza status do animal ( vacinado/castrado/etc |
| DELETE | /admin/animais/:id | Remove um animal da base de dado |

---

## 📦 **Dependências**

***Este projeto utiliza várias dependências para fornecer funcionalidades como autenticação, manipulação de banco de dados, geração de QR codes e muito mais. Abaixo está uma descrição de cada uma das bibliotecas utilizadas.***

**🔐 bcryptjs**

 Utilizado para criptografar senhas de forma segura. É uma implementação pura em JavaScript da biblioteca bcrypt, ideal para autenticação de usuários.


**🌱 dotenv**

 Carrega variáveis de ambiente de um arquivo .env para o process.env, permitindo uma separação clara entre código e configuração sensível (como senhas e tokens).


**🌐 express**

 Framework web minimalista e rápido para Node.js. Utilizado para criar rotas, middlewares e estruturar a API de forma organizada.


**🔑 jsonwebtoken**

 Permite gerar e validar tokens JWT (JSON Web Tokens), comumente usados para autenticação de usuários em APIs seguras.


**🚀 nodemon (Dev Dependency)**

 Ferramenta de desenvolvimento que reinicia automaticamente a aplicação sempre que arquivos são alterados, facilitando testes e iteração durante o desenvolvimento.


**📷 qrcode** 

 Gera códigos QR diretamente a partir de strings. Útil para criar sistemas de autenticação, links rápidos, validação de entradas etc.


**🧩 sequelize** 

 ORM (Object Relational Mapper) para Node.js. Permite interagir com bancos de dados relacionais como se estivesse manipulando objetos JavaScript. Este projeto usa com sqlite3.


**🗃️ sqlite3** 

 Banco de dados leve e rápido baseado em arquivos. Ideal para aplicações menores, testes ou quando não se deseja depender de servidores de banco externos.

---

## 👥 **Autores do Projeto**

- Muryllo Jesus Alves Linhares
- Pedro Marinho Rodriguês Camargo Corrêa
- Pedro Isaías Gomes de Jesus
- Pyetro Fabrício Peterlini
- Thiago Lameiras de Mattos
