

# Projeto Jobcrew - Hub de Postagem Multiplataforma

## Descrição

O **Projeto Jobcrew** é uma plataforma de postagem multiplataforma desenvolvida para permitir a criação, agendamento e publicação de conteúdo em várias redes sociais de maneira centralizada e eficiente. O projeto suporta postagens no **Instagram**, **Facebook**, **Twitter** e **LinkedIn** e inclui recursos como agendamento de postagens, upload de imagens, e pré-visualização do conteúdo para cada plataforma.

O sistema também oferece sugestões de otimização específicas para cada rede social, ajudando a garantir que as postagens sejam adaptadas às melhores práticas de cada plataforma.

### Características Principais:
- **Postagem Multiplataforma**: Publique simultaneamente no Instagram, Facebook, Twitter e LinkedIn.
- **Agendamento de Postagens**: Defina data e hora específicas para cada postagem ser publicada automaticamente.
- **Sugestões de Melhoria de Conteúdo**: Receba dicas personalizadas para melhorar o conteúdo conforme as melhores práticas de cada rede social.
- **Upload de Imagens**: Faça upload de imagens para serem incluídas nas postagens.
- **Pré-visualização do Conteúdo**: Veja como suas postagens aparecerão em cada plataforma antes de publicá-las.

### Tecnologias Utilizadas:
- **Frontend**: React.js
- **Backend**: Node.js com Express
- **Banco de Dados**: MongoDB
- **APIs Integradas**:
  - **Facebook Graph API** (para Facebook e Instagram)
  - **Twitter API**
  - **LinkedIn API**
- **Agendamento de Tarefas**: node-cron para processar postagens agendadas.

---

## Instruções de Instalação

### 1. Pré-requisitos

- **Node.js** (v14 ou superior)
- **MongoDB** (local ou em uma instância remota)
- **Conta de Desenvolvedor** no [Facebook](https://developers.facebook.com/), [Twitter](https://developer.twitter.com/), e [LinkedIn](https://www.linkedin.com/developers/) para configurar as APIs.

### 2. Clonar o Repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/projeto-jobcrew.git
cd projeto-jobcrew
```

### 3. Instalar Dependências

Instale as dependências do projeto:

```bash
npm install
```

### 4. Configuração do Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto. As variáveis de ambiente são necessárias para a integração com as APIs das redes sociais e conexão ao banco de dados MongoDB. O arquivo `.env` **não foi incluído** no repositório por questões de segurança.

Exemplo de arquivo `.env`:

```bash
# Configurações do MongoDB
MONGO_URI=mongodb://localhost:27017/jobcrew

# Facebook Graph API
FACEBOOK_ACCESS_TOKEN=seu_token_facebook
FACEBOOK_PAGE_ID=seu_facebook_page_id

# Twitter API
TWITTER_API_KEY=sua_api_key
TWITTER_API_SECRET=sua_api_secret
TWITTER_ACCESS_TOKEN=seu_access_token
TWITTER_ACCESS_TOKEN_SECRET=seu_access_token_secret

# LinkedIn API
LINKEDIN_ACCESS_TOKEN=seu_linkedin_access_token
LINKEDIN_USER_ID=seu_linkedin_user_id

# Porta do Servidor
PORT=5000
```

### 5. Iniciar o MongoDB

Certifique-se de que o **MongoDB** está rodando localmente ou configurado remotamente.

### 6. Rodar o Servidor

Inicie o servidor Node.js:

```bash
npm run dev
```

O servidor deve agora estar rodando em `http://localhost:5000` e a interface React estará acessível em `http://localhost:3000` (caso tenha sido configurada).

### 7. Configurar o Frontend

No diretório raiz, inicie o frontend (React):

```bash
npm start
```

### 8. Usar a Aplicação

Acesse o sistema através do navegador e siga as instruções na interface para:
1. Selecionar plataformas.
2. Criar postagens.
3. Agendar e publicar conteúdos.

---

## Considerações Finais

### Estrutura do Projeto

- **Backend**: O backend em Node.js gerencia o agendamento e publicação de postagens nas redes sociais. Ele usa APIs de terceiros para conectar com o Instagram, Facebook, Twitter e LinkedIn.
- **Frontend**: O frontend em React.js oferece uma interface simples e eficiente para gerenciar postagens e visualizações em tempo real.

### Itens Ignorados

O projeto contém um arquivo `.gitignore` que ignora automaticamente:
- Dependências do **node_modules**.
- Arquivos de configuração sensíveis como `.env`.

Sinta-se à vontade para contribuir ou levantar issues para melhorias e ajustes.
