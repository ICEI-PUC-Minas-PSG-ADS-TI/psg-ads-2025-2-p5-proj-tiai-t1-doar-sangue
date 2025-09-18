
# 3. Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="2-Planejamento-Projeto.md"> Planejamento do Projeto do Software (Cronograma) </a></span>

> Nesta seção, você vai detalhar os requisitos do seu sistema e as restrições do projeto, organizando as funcionalidades e características que a solução deve ter.

---

## 3.1 Requisitos Funcionais

Preencha o Quadro abaixo com os requisitos funcionais que **detalham as funcionalidades que seu sistema deverá oferecer**.  
Cada requisito deve representar uma característica única da solução e ser claro para orientar o desenvolvimento.


|ID     | Descrição do Requisito                                                                                          | Prioridade |
|-------|-----------------------------------------------------------------------------------------------------------------|------------|
|RF-01  | O sistema deve permitir que os usuários criem uma conta informando nome, e-mail, senha e endereço.              | ALTA  | 
|RF-02  |O sistema deve permitir o controle de estoque de sangue, registrando e organizando as unidades de acordo com os 
          diferentes tipos sanguíneos                                                                                     | MÉDIA |
|RF-03  |O sistema deve garantir que apenas usuários autorizados (como administradores e profissionais de saúde) 
          possam acessar dados sensíveis.                                                                                 | Alta  |
|RF-04  | *(Descreva aqui o requisito funcional 4 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-05  | *(Descreva aqui o requisito funcional 5 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-06  | *(Descreva aqui o requisito funcional 6 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-07  | *(Descreva aqui o requisito funcional 7 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-08  | *(Descreva aqui o requisito funcional 8 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-09  | *(Descreva aqui o requisito funcional 9 do seu sistema)*                                                        | *(Alta/Média/Baixa)*  |
|RF-10  | *(Descreva aqui o requisito funcional 10 do seu sistema)*                                                       | *(Alta/Média/Baixa)*  |

---

## 3.2 Histórias de Usuário

> Cada história de usuário deve ser escrita no formato:  
>  
> **Como [persona], eu quero [funcionalidade], para que [benefício/motivo].**  seguindo o modelo e conceitos ensinados na disciplina de       
> Engenharia de Requisitos.   
---
⚠️ **ATENÇÃO:** Escreva de forma que cada história de usuário esteja associada a um requisito funcional específico para facilitar o acompanhamento e validação. Por exemplo:

> **História 1 (relacionada ao Requisito RF-001):**  
> Como usuário, quero registrar minhas tarefas para não esquecer de fazê-las.  
>  
> **História 2 (relacionada ao Requisito RF-002):**  
> Como administrador, quero alterar permissões para controlar o acesso ao sistema.  
>  
> Para melhor organização, as histórias podem ser agrupadas por contexto ou módulo funcional.

---

### ✏️ Escreva aqui as histórias de usuário do seu projeto:

<div style="border: 2px dashed #999999; padding: 15px; margin: 10px 0;">
  
<!-- Espaço para escrever o texto -->  
**[Escreva aqui as histórias do seu projeto]**

- **História 1 (relacionada ao Requisito RF-01):** 

- **História 2 (relacionada ao Requisito RF-02):** 




</div>

---

## 3.3 Requisitos Não Funcionais

Preencha o Quadro abaixo com os requisitos não funcionais que definem **características desejadas para o sistema que irão desenvolver**, como desempenho, segurança, usabilidade, etc.  
> Lembre-se que esses requisitos são importantes para garantir a qualidade da solução.

|ID     | Descrição do Requisito                                                                              |Prioridade |
|-------|-----------------------------------------------------------------------------------------------------|-----------|
|RNF-01 | O sistema deve carregar as páginas em até 3 segundos para garantir uma boa experiência ao usuário.  | MÉDIA     | 
|RNF-02 | O sistema deve proteger as informações dos clientes por meio de criptografia e medidas de segurança.| ALTA      | 
|RNF-03 | *(Descreva aqui o requisito não funcional 3 do seu sistema)*                                       | *(Alta/Média/Baixa)*  |
|RNF-04 | *(Descreva aqui o requisito não funcional 4 do seu sistema)*                                       | *(Alta/Média/Baixa)*  |
|RNF-05 | *(Descreva aqui o requisito não funcional 5 do seu sistema)*                                       | *(Alta/Média/Baixa)*  |
|RNF-06 | *(Descreva aqui o requisito não funcional 6 do seu sistema)*                                       | *(Alta/Média/Baixa)*  |

---

## 3.4 Restrições do Projeto

> Estas são limitações externas que estão impostas ao projeto obedecidas durante o desenvolvimento. Elas estão relacionadas a prazos, tecnologias obrigatórias ou proibidas, ambiente de execução, normas legais ou políticas internas do projeto.

| ID  | Restrição                                                              |
|------|-----------------------------------------------------------------------|
| R-01   | O projeto deverá ser entregue até o final do semestre.              |
| R-02   | A plataforma deve seguir as diretrizes e regulamentações do Ministério da Saúde e da Anvisa referentes à coleta e doação de sangue no Brasil, garantindo a conformidade legal.|
| R-03   | O sistema deve ser acessível via web, compatível com navegadores modernos (Chrome, Firefox, Safari e Edge) e com interface responsiva para dispositivos móveis.|
| R-04   | O uso de dados de pacientes, doadores e instituições deve estar em total conformidade com a Lei Geral de Proteção de Dados (LGPD), garantindo a segurança e a privacidade das informações.|
| R-05   |A plataforma deve integrar-se com sistemas de agendamento de hemocentros parceiros ou hospitais, exigindo a utilização de APIs compatíveis.|
| R-06   | O sistema deve suportar um volume de usuários e acessos que atenda a demanda em períodos de pico, como em campanhas de doação ou desastres naturais, sem comprometer o desempenho.|
| R-07   | *(Descreva aqui a restrição 7 do seu projeto)*                      |
| R-08   | *(Descreva aqui a restrição 8 do seu projeto)*                      |

---
## 3.5 Regras de Negócio

> Estas são as condições e políticas que o sistema deve seguir para garantir o correto funcionamento alinhado ao propósito do projeto e legislação.  

---

 A tabela abaixo esta preenchida com as regras de negócio que **impactam o projeto**.

|ID    | Regra de Negócio                                                       |
|-------|-----------------------------------------------------------------------|
|RN-01 | Se o doador tiver entre 16 e 17 anos, então ele precisará de autorização formal dos responsáveis para se cadastrar e agendar uma doação. Isso garante a conformidade com a legislação de doação de sangue para menores de idade.|
|RN-02 | Se o doador potencial informar que pesa menos de 50 kg ou não atende aos requisitos básicos de saúde, então a plataforma deve impedi-lo de agendar a doação e exibir uma mensagem informativa sobre os critérios de doação. Isso evita agendamentos inviáveis e direciona o usuário corretamente.|
|RN-03 | Se o doador tentar agendar uma doação e houver uma restrição temporária (ex: doou há menos de 60 dias para homens ou 90 para mulheres), então o sistema deve bloquear o agendamento e informar a data mínima em que ele poderá doar novamente. Isso é crucial para a saúde do doador e a qualidade da doação.|
|RN-04 | Se um hemocentro ou hospital parceiro atualizar seus estoques de sangue, então a plataforma deve refletir essa mudança em tempo real para os doadores, destacando os tipos sanguíneos em nível crítico com alertas visuais. Isso serve para direcionar as doações para onde são mais necessárias.|
|RN-05 | Se a data e horário de agendamento escolhidos por um doador já estiverem lotados no hemocentro, então o sistema deve informar a indisponibilidade e sugerir horários alternativos. Isso otimiza o fluxo de doadores e o atendimento nas unidades de coleta.|
|RN-06 | Se uma campanha de doação para um tipo sanguíneo específico for lançada por uma instituição, então os doadores cadastrados que possuírem esse tipo sanguíneo devem ser notificados por e-mail ou notificação no aplicativo. Isso aumenta o engajamento e a eficácia das campanhas.|
|RN-07 | Se um doador potencial concluir o cadastro com todos os dados obrigatórios e cumprir os critérios de doação, então o sistema deve permitir o agendamento da primeira doação.|
|RN-08 | Se uma instituição de saúde for cadastrada, então a equipe responsável deve ser designada como administrador da conta, com permissão para gerenciar a agenda, o estoque de sangue e as campanhas de doação.|

---
> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
