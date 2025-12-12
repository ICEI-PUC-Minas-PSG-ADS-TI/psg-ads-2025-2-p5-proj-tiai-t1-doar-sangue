

CREATE TABLE Usuario (
    id double PRIMARY KEY,
    nome varchar,
    email varchar,
    senha varchar,
    tipoPermissao varchar,
    Usuario_TIPO INT,
    fk_HistoricoDoacao_id double,
    fk_Agendamento_id double
);

CREATE TABLE Endereco (
    id double PRIMARY KEY,
    cep varchar,
    numero varchar,
    logradouro varchar,
    complemento varchar,
    bairro varchar,
    cidade varchar,
    estado varchar
);

CREATE TABLE tipoSanguineo (
    id double PRIMARY KEY,
    nomeTipo varchar,
    fk_UnidadeSangue_id double
);

CREATE TABLE PostoDeColeta (
    id double PRIMARY KEY,
    nome varchar,
    contato varchar,
    endereco varchar,
    horarioFuncionamento varchar,
    fk_Relatorio_id double,
    fk_HistoricoDoacao_id double,
    fk_Agendamento_id double
);

CREATE TABLE UnidadeSangue (
    id double PRIMARY KEY,
    dataColeta datetime,
    status varchar,
    fk_Estoque_id double
);

CREATE TABLE Estoque (
    id double PRIMARY KEY,
    descricao varchar,
    fk_Relatorio_id double,
    fk_PostoDeColeta_id double
);

CREATE TABLE Relatorio (
    id double PRIMARY KEY,
    periodo varchar,
    dadosDoacao varchar
);

CREATE TABLE Agendamento (
    id double PRIMARY KEY,
    dataHora datetime,
    status varchar
);

CREATE TABLE HistoricoDoacao (
    id double PRIMARY KEY,
    dataDoacao datetime
);

CREATE TABLE Possui (
    fk_Usuario_id double,
    fk_Endereco_id double
);

CREATE TABLE Pertence (
    fk_tipoSanguineo_id double,
    fk_Usuario_id double
);
 
ALTER TABLE Usuario ADD CONSTRAINT FK_Usuario_2
    FOREIGN KEY (fk_HistoricoDoacao_id)
    REFERENCES HistoricoDoacao (id)
    ON DELETE NO ACTION;
 
ALTER TABLE Usuario ADD CONSTRAINT FK_Usuario_3
    FOREIGN KEY (fk_Agendamento_id)
    REFERENCES Agendamento (id)
    ON DELETE RESTRICT;
 
ALTER TABLE tipoSanguineo ADD CONSTRAINT FK_tipoSanguineo_2
    FOREIGN KEY (fk_UnidadeSangue_id)
    REFERENCES UnidadeSangue (id)
    ON DELETE RESTRICT;
 
ALTER TABLE PostoDeColeta ADD CONSTRAINT FK_PostoDeColeta_2
    FOREIGN KEY (fk_Relatorio_id)
    REFERENCES Relatorio (id)
    ON DELETE NO ACTION;
 
ALTER TABLE PostoDeColeta ADD CONSTRAINT FK_PostoDeColeta_3
    FOREIGN KEY (fk_HistoricoDoacao_id)
    REFERENCES HistoricoDoacao (id)
    ON DELETE NO ACTION;
 
ALTER TABLE PostoDeColeta ADD CONSTRAINT FK_PostoDeColeta_4
    FOREIGN KEY (fk_Agendamento_id)
    REFERENCES Agendamento (id)
    ON DELETE RESTRICT;
 
ALTER TABLE UnidadeSangue ADD CONSTRAINT FK_UnidadeSangue_2
    FOREIGN KEY (fk_Estoque_id)
    REFERENCES Estoque (id)
    ON DELETE CASCADE;
 
ALTER TABLE Estoque ADD CONSTRAINT FK_Estoque_2
    FOREIGN KEY (fk_Relatorio_id)
    REFERENCES Relatorio (id)
    ON DELETE NO ACTION;
 
ALTER TABLE Estoque ADD CONSTRAINT FK_Estoque_3
    FOREIGN KEY (fk_PostoDeColeta_id)
    REFERENCES PostoDeColeta (id)
    ON DELETE CASCADE;
 
ALTER TABLE Possui ADD CONSTRAINT FK_Possui_1
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES Usuario (id)
    ON DELETE SET NULL;
 
ALTER TABLE Possui ADD CONSTRAINT FK_Possui_2
    FOREIGN KEY (fk_Endereco_id)
    REFERENCES Endereco (id)
    ON DELETE SET NULL;
 
ALTER TABLE Pertence ADD CONSTRAINT FK_Pertence_1
    FOREIGN KEY (fk_tipoSanguineo_id)
    REFERENCES tipoSanguineo (id)
    ON DELETE SET NULL;
 
ALTER TABLE Pertence ADD CONSTRAINT FK_Pertence_2
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES Usuario (id)
    ON DELETE SET NULL;