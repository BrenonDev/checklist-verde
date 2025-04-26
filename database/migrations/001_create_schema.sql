-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS SustainabilityApp;                  -- No SQL Server, o IF NOT EXISTS pode ser removido se der erro
GO

-- Seleciona o banco de dados
USE SustainabilityApp;
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