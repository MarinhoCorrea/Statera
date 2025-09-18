
# 🚀 **Statera – ETEC Bento Quirino**

### Índice

- [Sobre](https://www.notion.so/Ideia-de-README-24e4691a9054801cb4a5d0b1109fe87f?pvs=21)
- [Estrutura do Projeto](https://www.notion.so/Ideia-de-README-24e4691a9054801cb4a5d0b1109fe87f?pvs=21)
- [Como Instalar e Rodar](https://www.notion.so/Ideia-de-README-24e4691a9054801cb4a5d0b1109fe87f?pvs=21)
- [Funcionalidades](https://www.notion.so/Ideia-de-README-24e4691a9054801cb4a5d0b1109fe87f?pvs=21)
- [Documentação da API](https://www.notion.so/Ideia-de-README-24e4691a9054801cb4a5d0b1109fe87f?pvs=21)
- [Endpoints Principais](https://www.notion.so/Ideia-de-README-24e4691a9054801cb4a5d0b1109fe87f?pvs=21)
- [Tecnologias utilizadas](https://www.notion.so/Ideia-de-README-24e4691a9054801cb4a5d0b1109fe87f?pvs=21)
- [Autores do Projeto](https://www.notion.so/Ideia-de-README-24e4691a9054801cb4a5d0b1109fe87f?pvs=21)

## 📌 **Sobre o Projeto**

O mundo é composto por pessoas distintas que se comunicam e interagem com as informações de maneiras diversas, seja por preferência ou necessidade. O acesso ao conhecimento e a oportunidades é um direito de todos, mas nem sempre as informações são transmitidas de maneira acessível.

A **Statera** teve uma iniciativa que conecta animais necessitados com tutores responsáveis, garantindo que cada animal, independentemente de sua história, possa encontrar um lar seguro e amoroso.

Nosso objetivo é eliminar as barreiras para a adoção, tornando o processo mais transparente, seguro e acessível. Usamos tecnologia para gerenciar o cadastro de animais e tutores, otimizar os processos de adoção e garantir que os pets encontrem as melhores famílias.

---

## 📂 **Estrutura do Projeto**

📁 backend/ → Código do servidor e lógica da aplicação

📁 docs/ → Documentação e guias de uso

---

## 🛠 **Como Instalar e Rodar**

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

## 💠 **Tecnologias utilizadas**

🔹 **Node.js + Express.js** → utilizamos **Node.js** pela sua leveza e capacidade de lidar com operações assíncronas de forma eficiente. **Express.js** foi escolhido para estruturar as rotas REST de maneira simples e modular, acelerando o desenvolvimento da API.

🔹 **Sequelize** → optamos pelo **Sequelize** como ORM para mapear nossos modelos de dados e facilitar a comunicação com o banco relacional. Ele gerencia migrations, define validações de campos e mantém automaticamente os campos createdAt e updatedAt em todas as tabelas.

🔹 **SQLite** → empregamos SQLite como banco de dados relacional embarcado, garantindo portabilidade e rapidez sem necessidade de servidor externo. Também é possível substituir por outro banco compatível com Sequelize sem alterar a estrutura do projeto.

[My Skills](https://skillicons.dev/icons?i=nodejs,npm,sqlite,sequelize&theme=light)


[Acessibilidade](https://img.shields.io/badge/A11Y-ready-green)

---

## 👥 **Autores do Projeto**

- Muryllo Jesus Alves Linhares
- Pedro Marinho Rodriguês Camargo Corrêa
- Pedro Isaías Gomes de Jesus
- Pyetro Fabrício Peterlini
- Thiago Lameiras de Mattos
