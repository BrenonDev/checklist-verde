<h1 align="center">🌱 Checklist Verde</h1>

<p align="center">
  Plataforma gamificada que incentiva hábitos sustentáveis de forma divertida e acessível.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/licen%C3%A7a-CC%20BY--NC--SA%204.0-yellow?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/feito%20por-Facens-blue?style=for-the-badge"/>
</p>

---
<br>

<h2 align="center"> 🖼️ Preview </h2>

<p align="center">
  <img
    src="frontend/assets/images/welcome-screen.png"
    alt="Tela de boas-vindas do Checklist Verde"
    width="300"
  />
</p>

---
<br>

## 🚀 Funcionalidades

- ✅ **Checklists diários** com ações sustentáveis
- 🎯 **Sistema de pontuação (XP)** por tarefas concluídas
- 🌿 **Dicas diárias** de sustentabilidade
- 🧩 **Interface acessível**, amigável e responsiva
- 🧠 Histórico de ações sustentáveis *(em breve)*

---
<br>

## 🛠️ Tecnologias

**Frontend:**  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=flat)  
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=flat)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat)

**Backend (planejado):**  
Node.js • Express • SQLite / PostgreSQL

---
<br>

## 🛢️ Banco de Dados

A estrutura do banco de dados do projeto **Checklist Verde** é composta por várias tabelas inter-relacionadas, com o objetivo de armazenar informações sobre os usuários, checklists, tarefas, dicas, e histórico de XP. O sistema utiliza um banco de dados relacional, compatível com MySQL e SQL Server.

## 🔗 MER – Modelo Entidade Relacionamento

O Modelo Entidade-Relacionamento (MER) do Checklist Verde mostra como as tabelas se conectam e organizam as informações no banco de dados. Ele é essencial para entender como os dados, como usuários, checklists, tarefas e pontos de XP, são estruturados e interagem. Com isso, conseguimos planejar a criação e manipulação das informações de maneira eficiente, garantindo uma experiência gamificada para os usuários.

<p align="center">
  <img
    src="database/diagram/erd_checklist_verde.png"
    alt="Modelo Entidade Relacionamento do projeto Checklist Verde"
    max-width="700"
  />
</p>

## 🗄️ Estrutura do Banco de Dados

O banco de dados do Checklist Verde é formado por várias tabelas interconectadas que armazenam informações dos usuários, checklists, tarefas e XP. Cada tabela foi pensada para suportar as funcionalidades da plataforma, como a criação de checklists diários, o sistema de pontuação e o armazenamento das dicas sustentáveis. O design do banco é feito de forma a garantir integridade dos dados e facilitar futuras implementações, como a expansão do histórico de ações sustentáveis.

```sql
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS ChecklistVerde;                  -- No SQL Server, o IF NOT EXISTS pode ser removido se der erro
GO

-- Seleciona o banco de dados
USE ChecklistVerde;
GO

-- Tabela: User
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,                       -- Identificador único do usuário
    name VARCHAR(255),                                            -- Nome do usuário
    email VARCHAR(255) UNIQUE,                                    -- Email único para login e identificação
    password VARCHAR(255),                                        -- Senha criptografada do usuário
    birth_date DATE,                                              -- Data de nascimento
    theme VARCHAR(50),                                            -- Tema visual preferido (ex: claro, escuro)
    created_at DATETIME,                                          -- Data de criação do usuário
    updated_at DATETIME                                           -- Data da última atualização do usuário
);

-- Tabela: Checklist
CREATE TABLE Checklist (
    checklist_id INT PRIMARY KEY AUTO_INCREMENT,                  -- Identificador único do checklist
    user_id INT,                                                  -- Referência ao criador do checklist
    type VARCHAR(50),                                             -- Tipo do checklist (diário, semanal, mensal)
    title VARCHAR(255),                                           -- Título do checklist
    start_date DATE,                                              -- Data de início do checklist
    due_date DATE,                                                -- Data de vencimento do checklist
    status VARCHAR(50),                                           -- Status (ativo, concluído, expirado, etc.)
    created_at DATETIME,                                          -- Data de criação
    updated_at DATETIME,                                          -- Última atualização
    FOREIGN KEY (user_id) REFERENCES User(user_id)                -- Definindo chave estrangeira
);

-- Tabela: Task
CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,                       -- Identificador único da tarefa
    checklist_id INT,                                             -- Referência ao checklist
    name VARCHAR(255),                                            -- Nome da tarefa
    description TEXT,                                             -- Descrição da tarefa
    category VARCHAR(100),                                        -- Categoria (ex: sustentabilidade, saúde, etc.)
    priority VARCHAR(50),                                         -- Prioridade (baixa, média, alta)
    xp_points INT,                                                -- XP entregue ao concluir a tarefa
    status VARCHAR(50),                                           -- Status (pendente, concluída, cancelada, etc.)
    checked_at DATETIME,                                          -- Data e hora em que foi concluída (se aplicável)
    created_at DATETIME,                                          -- Data de criação
    updated_at DATETIME,                                          -- Última modificação
    FOREIGN KEY (checklist_id) REFERENCES Checklist(checklist_id) -- Definindo chave estrangeira
);

-- Tabela: TaskHistory
CREATE TABLE TaskHistory (
    task_history_id INT PRIMARY KEY AUTO_INCREMENT,               -- Identificador do histórico
    task_id INT,                                                  -- Referência à tarefa
    timestamp DATETIME,                                           -- Data e hora da alteração
    status_before VARCHAR(50),                                    -- Status anterior
    status_after VARCHAR(50),                                     -- Novo status
    xp_earned INT,                                                -- XP ganho na mudança (se aplicável)
    FOREIGN KEY (task_id) REFERENCES Task(task_id)                -- Definindo chave estrangeira
);

-- Tabela: UserXP
CREATE TABLE UserXP (
    user_xp_id INT PRIMARY KEY AUTO_INCREMENT,                    -- Identificador do registro de XP
    user_id INT,                                                  -- Referência ao usuário
    date DATE,                                                    -- Data associada ao XP diário
    daily_xp INT,                                                 -- XP ganho no dia específico
    total_xp INT,                                                 -- Total acumulado até a data
    FOREIGN KEY (user_id) REFERENCES User(user_id)                -- Definindo chave estrangeira
);

-- Tabela: Tip
CREATE TABLE Tip (
    tip_id INT PRIMARY KEY AUTO_INCREMENT,                        -- Identificador único da dica
    text TEXT,                                                    -- Texto da dica
    day_of_year INT                                               -- Dia do ano (1 a 365) para exibição sazonal
);
```

---
<br>

## 📁 Estrutura de Pastas

```bash
checklist-verde/
├── backend/                # API e lógica do servidor
│   ├── config/             # Configurações
│   ├── controllers/        # Controladores das rotas
│   ├── routes/             # Rotas da API
│   ├── services/           # Regras de negócio
│   └── models/             # Modelos do banco
├── database/               # Estrutura do banco
│   ├── diagram/            # Diagramas
│   ├── migrations/         # Criação de tabelas
│   └── seeds/              # Dados iniciais
├── frontend/               # Interface do usuário
│   ├── index.html          # Página inicial
│   ├── assets/             # Recursos visuais do projeto
│   │   ├── fonts/          # Fontes
│   │   ├── icons/          # Ícones
│   │   └── images/         # Imagens
│   ├── pages/              # Páginas internas
│   │   ├── login.html      # Login
│   │   ├── signup.html     # Cadastro
│   │   ├── dashboard.html  # Painel
│   │   ├── checklists.html # Checklists
│   │   └── settings.html   # Configurações
│   ├── styles/             # CSS
│   │   ├── app.css         # Inicializador de estilos
│   │   ├── global.css      # Estilo global
│   │   ├── utils.css       # Utilitários
│   │   ├── welcome.css     # Tela inicial
│   │   ├── login.css       # Login
│   │   ├── signup.css      # Cadastro
│   │   ├── dashboard.css   # Painel
│   │   ├── checklists.css  # Checklists
│   │   └── settings.css    # Configurações
│   └── scripts/            # JS
│       ├── app.js          # Inicializador de scripts
│       ├── utils.js        # Funções
│       ├── welcome.js      # Tela inicial
│       ├── login.js        # Login
│       ├── signup.js       # Cadastro
│       ├── dashboard.js    # Painel
│       ├── checklists.js   # Checklists
│       └── settings.js     # Configurações
├── LICENSE.md              # Licença
├── README.md               # Documentação
└── .gitignore              # Ignorados pelo Git
```

---
<br>

## 🌐 Acesse o Projeto Online

O projeto está publicado via GitHub Pages e pode ser acessado aqui:

🔗 https://brenondev.github.io/checklist-verde/ 👁️

📌 Atenção: O projeto utiliza apenas front-end estático no GitHub Pages. Para funcionalidades dinâmicas com backend e banco de dados, será necessário executar o backend localmente (Node.js + banco relacional).

---
<br>

## ▶️ Como Executar Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/brenondev/checklist-verde.git
   cd checklist-verde
   ```

2. Abra o arquivo index.html localizado na pasta frontend/ com seu navegador, ou utilize uma extensão de servidor local como Live Server (VSCode).

---
<br>

## 📚 Projeto Acadêmico

Desenvolvido para a disciplina de **UPX – Usina de Projetos Experimentais II**

Curso: **Análise e Desenvolvimento de Sistemas**

Instituição: **Centro Universitário Facens - Sorocaba-SP**

---
<br>

## 👨‍💻 Equipe

- Brenon Olivetti Rondello
- Jessica Alessandra Camargo Estevão
- Lucas Gabriel Leonel Silva
- Luiz Fernando de Souza Campos

---
<br>

## 📈 Futuras Implementações

🔐 Login com autenticação real (JWT)

📱 Versão mobile com React Native

🧠 Rank de usuários e conquistas sustentáveis

🌎 Integração com API de clima

---
<br>

## 📄 Licença

Este projeto é distribuído sob a **Licença Creative Commons Atribuição - Não Comercial - Compartilha Igual 4.0 Internacional (CC BY-NC-SA 4.0)**.

- **Atribuição (BY)**: Você deve dar crédito ao autor original de forma apropriada, fornecer um link para a licença e indicar se houve alterações.
- **Não Comercial (NC)**: Você não pode usar o material para fins comerciais.
- **Compartilha Igual (SA)**: Se você modificar ou construir sobre o material, deve distribuir suas contribuições sob a mesma licença.

Sinta-se livre para usar, modificar e compartilhar, desde que respeite as condições acima. 💚


---
<br>

<p align="center">🌍<i> Um pequeno passo diário para a sustentabilidade — gamificado. </i>🎮</p>