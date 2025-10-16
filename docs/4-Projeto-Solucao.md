# 4. Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="03-Modelagem do Processo de Negocio.md"> Modelagem do Processo de Negocio</a></span>

---
**ARQUITETURA DO SOFTWARE**
## 4.1. Arquitetura da Solução

Nesta seção, descreva como os componentes do sistema se organizam e interagem.  
Inclua um **diagrama de arquitetura** mostrando módulos, camadas e tecnologias utilizadas.

**Orientações:**
- Indique quais módulos compõem a solução (ex.: frontend, backend, banco de dados, APIs externas).
- Especifique as tecnologias e frameworks adotados (ex.: React, Node.js, MySQL).
- Explique como ocorre a comunicação entre os módulos.

**Exemplo de diagrama:**
 
 ![Exemplo de Arquitetura](./images/DIAGRAMA_C2.jpeg)

O diagrama apresenta a arquitetura do sistema Give Life, desenvolvido para gerenciar doações e campanhas beneficentes. Ele ilustra os principais tipos de usuários, os módulos internos do sistema e a relação com serviços externos de hospedagem.

1. Usuários

Admin: responsável por gerenciar usuários, instituições e doações.

Instituições: organizações que criam campanhas e recebem doações.

Doadores: usuários que realizam doações e acompanham campanhas.

Esses perfis acessam o sistema por meio do site (frontend web) ou do aplicativo móvel.

2. Componentes Internos do Sistema

Frontend Web (React / HTML / CSS / JS):
Interface acessada via navegador, que permite interação de doadores e instituições. Conecta-se ao backend para envio e recebimento de dados via requisições HTTP/JSON.

Aplicativo Mobile (React Native / Expo):
Interface voltada a dispositivos móveis, com funcionalidades de acesso a campanhas e realização de doações. Comunica-se com o backend de forma semelhante ao frontend web.

Supabase Backend (PostgreSQL, Auth, Storage, Edge Functions):
Responsável pela lógica central do sistema, autenticação de usuários, processamento de dados e disponibilização de APIs REST. Atua como intermediário entre o frontend, o aplicativo móvel e o banco de dados.

Database (PostgreSQL / Supabase):
Armazena informações de usuários, instituições, campanhas e doações.
É considerado um componente interno do sistema, embora esteja hospedado em infraestrutura externa (nuvem) por meio da plataforma Supabase.

3. Serviço Externo

Locaweb:
Plataforma de hospedagem utilizada para disponibilizar o site e o backend na web.
Apesar de fornecer a infraestrutura, não faz parte do sistema Give Life, sendo classificada como um sistema externo.

4. Fluxo de Comunicação

Os usuários interagem com o Frontend Web ou o Aplicativo Mobile, que se comunicam com o Supabase Backend para envio e recebimento de dados.
O backend processa as solicitações, realiza autenticações e acessa o Database Supabase para armazenar ou consultar informações.
Toda a solução é disponibilizada na internet por meio da infraestrutura da Locaweb.
 
---
**MODELAGEM VISUAL DAS TELAS**

## 4.2. Wireframe / Mockup

Wireframe e Mockup são representações visuais das telas de um sistema **antes** do desenvolvimento do código.  
Eles ajudam a planejar, comunicar ideias e validar a interface com antecedência.

### Finalidade
- **Planejamento da interface** → organizar elementos (botões, menus, campos, imagens) e definir a estrutura de navegação.  
- **Comunicação da ideia** → facilitar o diálogo entre desenvolvedores, designers, clientes e usuários.  
- **Validação antecipada** → coletar feedback antes de investir tempo e recursos na programação.  
- **Guia para desenvolvimento** → servir como referência visual durante a implementação.

💡 **_Diferença:_**
- **Wireframe** → simples, sem cores ou imagens detalhadas; foca na estrutura e posicionamento.  
- **Mockup** → mais próximo do visual final, com cores, fontes e imagens, mas sem interatividade completa.

**Exemplo de wireframe:**
![Exemplo de Wireframe](images/wireframe-example.png)

📌 **Entrega:** incluir imagens ou links para os wireframes/mockups.

**Wireframe 1 — Tela Principal**  
![alt text](./images/Home_Desktop.png)
.![alt text](./images/tela%20inicial%20do%20usuario.jpeg)


**Wireframe 2 — Tela de Login**  


![alt text](./images/Inicio_Desktop.png)


**Wireframe 2 — Tela de Campanha**  

![alt text](./images/Campanhas_Desktop.png)

---
**UML**

## 4.3 Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

![alt text](./images/Diagrama%20de%20Classes%20GiveLife.drawio%20(1).png)

---

**BANCO DE DADOS**

## 4.4. Modelo de Dados

A solução proposta exige um banco de dados capaz de armazenar e relacionar as informações necessárias para os processos mapeados, garantindo integridade e controle de acesso por perfil de usuário.

O desenvolvimento deve seguir **três etapas**:

---

### 4.4.1 Diagrama Entidade-Relacionamento (DER)

O **Diagrama Entidade-Relacionamento (DER)** descreve as entidades, atributos e relacionamentos do sistema.  
Utilize a ferramenta **[BR Modelo Web](https://www.brmodeloweb.com/lang/pt-br/index.html)** para criar o diagrama.

**Orientações:**
- Todas as entidades devem possuir chave primária.
- Relacionamentos devem estar corretamente cardinalizados.
- O diagrama deve contemplar todas as funcionalidades levantadas nos processos de negócio.

**Exemplo de imagem:**

![Diagrama ER - Exemplo](./images/DER.png)

📌 **Entrega:** gere o diagrama no BR Modelo, exporte em **.png** e inclua-o nesta seção.


---

### 4.4.2 Esquema Relacional

O **Esquema Relacional** converte o Modelo ER para tabelas relacionais, incluindo chaves primárias, estrangeiras e restrições de integridade.  
Utilize o **[MySQL Workbench](https://www.mysql.com/products/workbench/)** para gerar o diagrama de tabelas (Modelo Lógico).

**Orientações:**
- Inclua todos os atributos das entidades.
- Defina tipos de dados adequados para cada campo.
- Configure as restrições de integridade (NOT NULL, UNIQUE, FOREIGN KEY, etc.).

📌 **Entrega:** exporte o diagrama do Workbench e adicione a imagem aqui.

**Exemplo de imagem:**

![Esquema Relacional - Exemplo](./images/TabelasBD.png)

---

### 4.4.3 Modelo Físico

O **Modelo Físico** é o script SQL que cria as tabelas no banco de dados.  
Este script pode ser gerado automaticamente no MySQL Workbench a partir do esquema relacional.

**Exemplo:**
```sql
CREATE TABLE Medico (
    MedCodigo INT PRIMARY KEY,
    MedNome VARCHAR(100) NOT NULL
);

CREATE TABLE Paciente (
    PacCodigo INT PRIMARY KEY,
    PacNome VARCHAR(100) NOT NULL
);

CREATE TABLE Consulta (
    ConCodigo INT PRIMARY KEY,
    MedCodigo INT,
    PacCodigo INT,
    Data DATE,
    FOREIGN KEY (MedCodigo) REFERENCES Medico(MedCodigo),
    FOREIGN KEY (PacCodigo) REFERENCES Paciente(PacCodigo)
);

CREATE TABLE Medicamento (
    MdcCodigo INT PRIMARY KEY,
    MdcNome VARCHAR(100) NOT NULL
);

CREATE TABLE Prescricao (
    ConCodigo INT,
    MdcCodigo INT,
    Posologia VARCHAR(200),
    PRIMARY KEY (ConCodigo, MdcCodigo),
    FOREIGN KEY (ConCodigo) REFERENCES Consulta(ConCodigo),
    FOREIGN KEY (MdcCodigo) REFERENCES Medicamento(MdcCodigo)
);
```
## 📌ATENÇÃO: salvar como banco.sql na pasta src/bd

---
### 4.4.4 Banco de Dados NoSQL (Opcional)

> **Atenção:** Preencha esta seção **somente se o seu projeto utilizar Banco de Dados NoSQL**.

Se o projeto adotar NoSQL, a entrega deve incluir:

#### 1. Modelo de Coleções / Documentos
- Descreva como os dados serão organizados em **coleções, documentos ou grafos**.  

#### 2. Exemplos de Documentos / Registros
- Mostre exemplos reais de dados para cada coleção ou entidade.  

```json
{
  "_id": "1",
  "nome": "Juliana",
  "email": "juliana@email.com",
  "perfil": "admin"
}
```

📌 **Entrega:** Inclua aqui os scripts utilizados para criar coleções e inserir dados.
