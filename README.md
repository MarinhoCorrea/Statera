
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

### **Frontend Web**

1️⃣ Instalar dependências:

```bash
  npm install

```

2️⃣ Iniciar o projeto:

```bash
  npm start

```

### **Frontend Mobile**

1️⃣ Instalar dependências:

```bash
  npm install

```

2️⃣ Rodar no navegador:

```bash
  npx expo start --web

```

---

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
| POST | /animais | Cadastra um novo animal disponível para adoção |
| GET | /animais |  Lista os animais disponíveis para adoção com suporte a filtros |
| POST | /tutores |  Cadastra um novo usuario com seus dados |
| PATCH | /tutores/:id | Permite ao tutor atualizar seus dados e/ou completar o questionário obrigatório |
| GET | /tutores/:id | Retorna os dados e o questionário preenchido do tutor. |
| POST | /questionário | Cadastra o questionário que o tutor precisa responder para adotar |
| POST | /adocoes | Cria um novo pedido de adoção |
| GET | /admin/animais | Permite ao administrador visualizar todos os animais com filtros avançados  |
| PATCH | /admin/animais/:id | Atualiza status do animal ( vacinado/castrado/etc |
| DELETE | /admin/animais/:id | Remove um animal da base de dado |
| GET | /animais/:id | Busca um animal por seu id e retorna todas as informações do animal com lista de pedidos (interessados) |
| POST | /login | Realizar a validação do email e senha registrados pelo usuário |
| POST | /doacoes | Registra uma doação recebida com nome, valor e data. |

---

## 💠 **Tecnologias utilizadas**

🔹 **Node.js + Express.js** → Escolhemos **Node.js** por sua eficiência em operações assíncronas e escalabilidade para múltiplas requisições simultâneas. A utilização de **Express.js** facilita a organização das rotas REST, permitindo uma estrutura modular e expansível.

🔹 **JWT (JSON Web Token)** → Implementamos **JWT** para autenticação segura, garantindo sessões protegidas sem necessidade de consultas frequentes ao banco de dados.

🔹 **SQLite + Sequelize** → O projeto utiliza **SQLite** para armazenar os dados localmente, garantindo rapidez e portabilidade, combinado com **Sequelize** para gerenciamento ORM, facilitando consultas e manipulação de dados.

[My Skills](https://skillicons.dev/icons?i=nodejs,npm,sqlite,sequelize&theme=light)


[Acessibilidade](https://img.shields.io/badge/A11Y-ready-green)

---

## 👥 **Autores do Projeto**

- Pedro Marinho Rodriguês Camargo Corrêa
- Pedro Isaías Gomes de Jesus
- Pyetro Fabrício Peterlini
- Thiago Lameiras de Mattos
