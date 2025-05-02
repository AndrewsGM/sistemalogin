Sistema de Login e E-commerce
Caso tenha dúvidas, sugestões ou críticas, basta entrar em contato pelo e-mail: andrewsgama0@gmail.com

Bem-vindo ao projeto Sistema de Login e E-commerce! Este é um aplicativo simples que permite fazer login, visualizar produtos, adicionar itens a um carrinho e gerenciar um perfil. Se você é novo em programação ou em usar o GitHub, não se preocupe! Vamos te guiar passo a passo para configurar e rodar o projeto no seu computador usando o Visual Studio Code.

O que você vai precisar
Antes de começar, certifique-se de ter instalado o seguinte no seu computador:

Node.js: Um ambiente para rodar JavaScript. Baixe e instale em nodejs.org.
Visual Studio Code: Um editor de código leve e fácil de usar. Baixe em code.visualstudio.com.
Git: Uma ferramenta para baixar e gerenciar o código do GitHub. Baixe em git-scm.com.
MongoDB: Um banco de dados que o projeto usa. Instale o MongoDB Community Server em mongodb.com/try/download/community.
Depois de instalar tudo, vamos começar!

Passo a passo para rodar o projeto

1. Baixe o código do GitHub
   Abra o Visual Studio Code.
   Clique em Terminal no menu superior e selecione New Terminal para abrir uma janela de comando.
   No terminal, digite o seguinte comando para clonar o repositório.

git clone (https://github.com/AndrewsGM/sistemalogin.git)

Pressione Enter. Isso cria uma pasta chamada SistemaLoginE-commerce com todo o código.

2. Entre na pasta do projeto
   No terminal, digite:

cd login

Pressione Enter. Isso leva você para dentro da pasta do projeto.

3. Instale as dependências
   O projeto usa bibliotecas que precisam ser instaladas. Digite os seguintes comandos, um de cada vez, e pressione Enter após cada um:
   Para a parte do backend (servidor):

cd backend
npm install
cd ..

Para a parte do frontend (interface):

cd frontend
npm install
cd ..

Esses comandos baixam tudo que o projeto precisa para funcionar.

4. Configure o MongoDB
   Certifique-se de que o MongoDB está rodando. Abra outro terminal (ou use o mesmo após voltar para a raiz com cd ..):
   Inicie o MongoDB com:

mongod

Deixe essa janela aberta. Se der erro, verifique se o MongoDB foi instalado corretamente e siga as instruções do site oficial.

5. Crie um arquivo para configurações
   No Visual Studio Code, na pasta backend, crie um arquivo chamado .env.
   Abra o arquivo .env e adicione o seguinte (substitua <SUA-SENHA-MONGODB> pela senha do seu banco de dados MongoDB, se aplicável, e <URL-MONGODB> pela URL do seu MongoDB local ou remoto, como mongodb://localhost:27017/ecommerce):

MONGO_URI=<URL-MONGODB>
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000

Salve o arquivo. Atenção: Não compartilhe esse arquivo com outras pessoas, pois contém informações sensíveis.

6. Rode o servidor backend
   No terminal, dentro da pasta backend, digite:

npm run seed

Pressione Enter. Isso cria usuários e produtos iniciais no banco de dados.
Depois, digite:

npm run dev

Pressione Enter. Isso inicia o servidor. Você verá uma mensagem como "Server is running on port 3000". 7. Rode o frontend
No terminal, dentro da pasta frontend, digite:

npm run dev

Pressione Enter. Isso abre uma janela no seu navegador em http://localhost:5173/. Se não abrir automaticamente, copie e cole esse endereço no navegador.

8. Teste o projeto

Na página que abrir, faça login com:
Email: admin@example.com
Senha: admin123

Explore as opções: veja os produtos, adicione ao carrinho, vá para o carrinho, veja seu perfil e faça logout.
Se algo der errado, verifique o terminal para mensagens de erro e volte aos passos anteriores.

Este projeto foi desenvolvido utilizando uma arquitetura client-server com separação clara entre frontend e backend. Abaixo estão os detalhes técnicos:

Tecnologias Utilizadas

Node.js: Ambiente de execução do servidor backend, com versão compatível com as dependências listadas (recomenda-se a LTS mais recente até maio de 2025).
Express.js: Framework para criar as rotas e APIs do backend, versão ~4.17.1.
MongoDB: Banco de dados NoSQL para persistência de usuários, produtos e carrinho, utilizando o driver Mongoose (~6.0.0) para modelagem de dados.
React: Biblioteca para construção do frontend, com Vite como ferramenta de desenvolvimento, versão compatível com a configuração padrão do projeto (recomenda-se React ~18.x).
JWT (JSON Web Tokens): Mecanismo de autenticação stateless, implementado com a biblioteca jsonwebtoken (~8.5.1), usando um segredo configurável via .env.

Ferramentas Utilizadas:

Git: Para controle de versão e upload ao GitHub.
Nodemon: Para reiniciar automaticamente o servidor durante o desenvolvimento (~2.0.15).
Bootstrap: Framework CSS para estilização rápida do frontend, integrado via CDN.
React Router: Para gerenciamento de rotas no frontend, versão compatível com React (~6.x).
React Toastify: Para notificações ao usuário, integrado no frontend.

Conceitos e Padrões de Design:

Arquitetura MVC (Model-View-Controller): Adaptada no backend, com modelos (Mongoose schemas), rotas (controladores) e a interface React como view.
Padrão Repository: Implementado implicitamente via Mongoose para abstrair a interação com o banco de dados.
Autenticação Middleware: Uso de middlewares no Express para validar tokens JWT em todas as rotas protegidas.
Single Page Application (SPA): O frontend é uma SPA, com navegação gerenciada pelo React Router, melhorando a experiência do usuário.

Estrutura do Projeto:

Backend: Organizado em pastas como models (definições de esquemas), routes (lógica de rotas) e server.js (ponto de entrada).
Frontend: Estrutura modular com components (Navbar), pages (telas como Login, Products, etc.) e configuração Vite em main.jsx.
Persistência: Dados de usuários, produtos e carrinho são armazenados no MongoDB, com seeding inicial via script seed.js.

Caso persista erro para clonar repositório ou algo parecido, basta entrar em contato pelo e-mail: andrewsgama0@gmail.com
