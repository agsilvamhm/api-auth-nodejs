Criar o projeto
    npm init -y

Criar a estrutura inicial das pastas
    mkdir -p src/config src/modules/auth

Instalar as dependências
    npm install express @supabase/supabase-js dotenv

    npm install -D typescript @types/express @types/node ts-node-dev  

Configurar o Typescript
    npx tsc --init

Ajuste no tsconfig.json

        {
        "compilerOptions": {
            "target": "es2022",                          /* Versão do JS de saída */
            "module": "commonjs",                        /* Sistema de módulos */
            "rootDir": "./src",                          /* Onde está seu código fonte */
            "outDir": "./dist",                          /* Onde o código compilado vai cair */
            "esModuleInterop": true,                      /* Melhora compatibilidade de imports */
            "forceConsistentCasingInFileNames": true,            /* Evita problemas de maiúsculas/minúsculas */
            "strict": true,                              /* Ativa validações estritas do TS */
            "skipLibCheck": true                         /* Ignora checagem de tipos das node_modules */
        },
        "include": ["src/**/*"]                        /* Monitora tudo dentro de src */
        }

Configurar as Variáveis de Ambiente, crie um arquivo .env

    PORT=3333
    SUPABASE_URL=https://sua-url-do-supabase.supabase.co
    SUPABASE_ANON_KEY=seu-token-anon-key-aqui   


Criar os Scripts de Inicialização
Abra o seu arquivo package.json e substitua o bloco "scripts" por este, configurando o ambiente de desenvolvimento e o build de produção:     

"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "clean": "rd /s /q dist",
  "build": "tsc"
},