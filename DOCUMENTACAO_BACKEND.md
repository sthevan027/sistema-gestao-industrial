# Documentação Backend - Sistema de Monitoramento de Obra Industrial

## 📋 Visão Geral

Esta documentação descreve a arquitetura e implementação do backend para o Sistema de Monitoramento de Obra Industrial, incluindo APIs, banco de dados, autenticação e integrações.

## 🏗️ Arquitetura do Sistema

### Stack Tecnológica Recomendada

#### Backend Principal
- **Node.js** + **Express.js**: API REST
- **TypeScript**: Tipagem estática
- **PostgreSQL**: Banco de dados principal
- **Redis**: Cache e sessões
- **JWT**: Autenticação

#### Microserviços
- **Python** + **FastAPI**: Processamento de dados IoT
- **Node.js** + **Socket.io**: Comunicação em tempo real
- **Python** + **Celery**: Processamento assíncrono

#### Infraestrutura
- **Docker**: Containerização
- **Kubernetes**: Orquestração
- **Nginx**: Proxy reverso
- **AWS/Azure**: Cloud deployment

## 📊 Estrutura do Banco de Dados

### Schema Principal

```sql
-- Tabela de Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'ativo',
    ultimo_acesso TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Projetos
CREATE TABLE projetos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    cliente VARCHAR(200) NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    progresso INTEGER DEFAULT 0,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    orcamento DECIMAL(15,2) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Obras
CREATE TABLE obras (
    id SERIAL PRIMARY KEY,
    projeto_id INTEGER REFERENCES projetos(id),
    nome VARCHAR(200) NOT NULL,
    endereco TEXT,
    coordenadas POINT,
    status VARCHAR(20) DEFAULT 'ativa',
    progresso_geral INTEGER DEFAULT 0,
    orcamento_utilizado DECIMAL(15,2) DEFAULT 0,
    funcionarios_ativos INTEGER DEFAULT 0,
    alertas_ativos INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Atividades
CREATE TABLE atividades (
    id SERIAL PRIMARY KEY,
    obra_id INTEGER REFERENCES obras(id),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'pendente',
    progresso INTEGER DEFAULT 0,
    data_inicio DATE,
    data_fim DATE,
    prioridade VARCHAR(20) DEFAULT 'media',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Equipamentos
CREATE TABLE equipamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    modelo VARCHAR(100),
    status VARCHAR(20) DEFAULT 'ativo',
    localizacao VARCHAR(100),
    horas_uso INTEGER DEFAULT 0,
    eficiencia INTEGER DEFAULT 100,
    ultima_manutencao DATE,
    proxima_manutencao DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Funcionários
CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    telefone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'ativo',
    projeto_atual INTEGER REFERENCES projetos(id),
    horas_trabalhadas INTEGER DEFAULT 0,
    eficiencia INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Materiais
CREATE TABLE materiais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    unidade VARCHAR(20) NOT NULL,
    estoque_minimo DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'adequado',
    fornecedor VARCHAR(100),
    preco_unitario DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Sensores IoT
CREATE TABLE sensores (
    id SERIAL PRIMARY KEY,
    obra_id INTEGER REFERENCES obras(id),
    tipo VARCHAR(50) NOT NULL,
    localizacao VARCHAR(100),
    valor_atual DECIMAL(10,2),
    unidade VARCHAR(20),
    status VARCHAR(20) DEFAULT 'ativo',
    ultima_leitura TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Alertas
CREATE TABLE alertas (
    id SERIAL PRIMARY KEY,
    obra_id INTEGER REFERENCES obras(id),
    tipo VARCHAR(50) NOT NULL,
    severidade VARCHAR(20) NOT NULL,
    mensagem TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'ativo',
    lido BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Relatórios
CREATE TABLE relatorios (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    dados JSONB,
    periodo_inicio DATE,
    periodo_fim DATE,
    gerado_por INTEGER REFERENCES usuarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Logs de Auditoria
CREATE TABLE logs_auditoria (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    acao VARCHAR(100) NOT NULL,
    tabela VARCHAR(50),
    registro_id INTEGER,
    dados_anteriores JSONB,
    dados_novos JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Índices Recomendados

```sql
-- Índices para performance
CREATE INDEX idx_projetos_status ON projetos(status);
CREATE INDEX idx_obras_projeto_id ON obras(projeto_id);
CREATE INDEX idx_atividades_obra_id ON atividades(obra_id);
CREATE INDEX idx_equipamentos_status ON equipamentos(status);
CREATE INDEX idx_funcionarios_projeto ON funcionarios(projeto_atual);
CREATE INDEX idx_materiais_categoria ON materiais(categoria);
CREATE INDEX idx_sensores_obra_id ON sensores(obra_id);
CREATE INDEX idx_alertas_obra_id ON alertas(obra_id);
CREATE INDEX idx_alertas_status ON alertas(status);
CREATE INDEX idx_logs_usuario_id ON logs_auditoria(usuario_id);
CREATE INDEX idx_logs_created_at ON logs_auditoria(created_at);
```

## 🔌 APIs REST

### Autenticação

#### POST /api/auth/login
```json
{
  "email": "usuario@empresa.com",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "usuario@empresa.com",
    "cargo": "Administrador"
  }
}
```

#### POST /api/auth/logout
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Projetos

#### GET /api/projetos
**Parâmetros:**
- `status` (opcional): Filtro por status
- `cliente` (opcional): Busca por cliente
- `page` (opcional): Página para paginação
- `limit` (opcional): Itens por página

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Construção Galpão Industrial A",
      "cliente": "Indústria ABC Ltda",
      "status": "em_andamento",
      "progresso": 75,
      "data_inicio": "2024-01-15",
      "data_fim": "2024-06-30",
      "orcamento": 2500000.00
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### POST /api/projetos
```json
{
  "nome": "Novo Projeto",
  "cliente": "Cliente XYZ",
  "data_inicio": "2024-06-01",
  "data_fim": "2024-12-31",
  "orcamento": 1500000.00,
  "descricao": "Descrição do projeto"
}
```

#### PUT /api/projetos/:id
```json
{
  "progresso": 80,
  "status": "em_andamento"
}
```

### Obras

#### GET /api/obras/:id/monitoramento
**Resposta:**
```json
{
  "success": true,
  "data": {
    "obra": {
      "id": 1,
      "nome": "Galpão Industrial A",
      "progresso_geral": 65,
      "orcamento_utilizado": 78,
      "funcionarios_ativos": 24,
      "alertas_ativos": 3
    },
    "sensores": [
      {
        "tipo": "temperatura",
        "valor": 28.5,
        "unidade": "°C",
        "status": "normal"
      }
    ],
    "alertas": [
      {
        "id": 1,
        "tipo": "critico",
        "mensagem": "Estoque de aço baixo",
        "severidade": "alta"
      }
    ]
  }
}
```

#### GET /api/obras/:id/atividades
**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Fundação",
      "status": "concluida",
      "progresso": 100,
      "data_inicio": "2024-01-15",
      "data_fim": "2024-02-15"
    }
  ]
}
```

### Recursos

#### GET /api/equipamentos
**Parâmetros:**
- `status` (opcional): Filtro por status
- `tipo` (opcional): Filtro por tipo
- `obra_id` (opcional): Equipamentos de uma obra específica

#### GET /api/funcionarios
**Parâmetros:**
- `status` (opcional): Filtro por status
- `projeto_id` (opcional): Funcionários de um projeto
- `cargo` (opcional): Filtro por cargo

#### GET /api/materiais
**Parâmetros:**
- `categoria` (opcional): Filtro por categoria
- `status` (opcional): Filtro por status (adequado/baixo)

### Relatórios

#### GET /api/relatorios/geral
**Parâmetros:**
- `periodo_inicio` (opcional): Data de início
- `periodo_fim` (opcional): Data de fim
- `obra_id` (opcional): Relatório de obra específica

**Resposta:**
```json
{
  "success": true,
  "data": {
    "metricas": {
      "progresso_geral": 65,
      "orcamento_total": 2400000.00,
      "eficiencia_media": 89,
      "qualidade": 97
    },
    "graficos": {
      "progresso_temporal": [...],
      "distribuicao_custos": [...],
      "utilizacao_recursos": [...]
    }
  }
}
```

#### POST /api/relatorios/exportar
```json
{
  "tipo": "geral",
  "formato": "pdf",
  "periodo_inicio": "2024-01-01",
  "periodo_fim": "2024-06-30"
}
```

## 🔄 WebSocket (Tempo Real)

### Conexão
```javascript
const socket = io('ws://localhost:3001', {
  auth: {
    token: 'jwt_token_here'
  }
});
```

### Eventos

#### Monitoramento de Obra
```javascript
// Escutar atualizações de obra
socket.on('obra:update', (data) => {
  console.log('Obra atualizada:', data);
});

// Escutar novos alertas
socket.on('alerta:novo', (data) => {
  console.log('Novo alerta:', data);
});

// Escutar dados de sensores
socket.on('sensor:update', (data) => {
  console.log('Sensor atualizado:', data);
});
```

#### Emitir eventos
```javascript
// Atualizar progresso de atividade
socket.emit('atividade:update', {
  obra_id: 1,
  atividade_id: 5,
  progresso: 75
});

// Marcar alerta como lido
socket.emit('alerta:lido', {
  alerta_id: 1
});
```

## 🔐 Autenticação e Segurança

### JWT (JSON Web Tokens)
```javascript
// Estrutura do token
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "email": "user@email.com",
    "role": "admin",
    "iat": 1640995200,
    "exp": 1641081600
  }
}
```

### Middleware de Autenticação
```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};
```

### Middleware de Autorização
```javascript
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
  };
};
```

## 📊 Cache e Performance

### Redis Cache
```javascript
// Configuração do Redis
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

// Cache de dados de obra
const getObraCache = async (obraId) => {
  const cached = await client.get(`obra:${obraId}`);
  if (cached) {
    return JSON.parse(cached);
  }
  return null;
};

const setObraCache = async (obraId, data) => {
  await client.setex(`obra:${obraId}`, 300, JSON.stringify(data));
};
```

### Otimizações de Query
```sql
-- Query otimizada com JOIN
SELECT 
  p.nome as projeto_nome,
  o.nome as obra_nome,
  o.progresso_geral,
  COUNT(f.id) as funcionarios_ativos,
  COUNT(e.id) as equipamentos_ativos
FROM obras o
JOIN projetos p ON o.projeto_id = p.id
LEFT JOIN funcionarios f ON f.projeto_atual = p.id AND f.status = 'ativo'
LEFT JOIN equipamentos e ON e.status = 'ativo'
WHERE o.status = 'ativa'
GROUP BY p.id, o.id;
```

## 🔄 Processamento Assíncrono

### Celery Tasks (Python)
```python
from celery import Celery

app = Celery('obras')

@app.task
def processar_dados_sensores(obra_id):
    """Processa dados de sensores IoT"""
    # Lógica de processamento
    pass

@app.task
def gerar_relatorio(relatorio_id):
    """Gera relatório em background"""
    # Lógica de geração
    pass

@app.task
def enviar_notificacao(usuario_id, mensagem):
    """Envia notificação por email/SMS"""
    # Lógica de envio
    pass
```

### Queue de Jobs (Node.js)
```javascript
const Queue = require('bull');

// Fila de processamento de dados
const dataQueue = new Queue('data-processing', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

// Adicionar job
dataQueue.add('process-sensor-data', {
  obraId: 1,
  sensorData: {...}
});

// Processar job
dataQueue.process('process-sensor-data', async (job) => {
  const { obraId, sensorData } = job.data;
  // Processar dados
});
```

## 🐳 Docker e Deploy

### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/obras
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=obras
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf

volumes:
  postgres_data:
  redis_data:
```

## 📈 Monitoramento e Logs

### Winston Logger
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log de auditoria
const logAuditoria = (usuarioId, acao, tabela, registroId, dadosAnteriores, dadosNovos) => {
  logger.info('Auditoria', {
    usuario_id: usuarioId,
    acao,
    tabela,
    registro_id: registroId,
    dados_anteriores: dadosAnteriores,
    dados_novos: dadosNovos,
    ip_address: req.ip,
    user_agent: req.get('User-Agent')
  });
};
```

### Métricas com Prometheus
```javascript
const prometheus = require('prom-client');

// Contador de requisições
const httpRequestsTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'route', 'status']
});

// Histograma de duração
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP',
  labelNames: ['method', 'route']
});

// Middleware para métricas
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    httpRequestsTotal.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    });
    
    httpRequestDuration.observe({
      method: req.method,
      route: req.route?.path || req.path
    }, duration);
  });
  
  next();
});
```

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente (.env)
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/obras
DB_HOST=localhost
DB_PORT=5432
DB_NAME=obras
DB_USER=user
DB_PASSWORD=password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=24h

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# AWS S3 (para uploads)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=obras-uploads

# Sentry (monitoramento de erros)
SENTRY_DSN=your-sentry-dsn

# Porta do servidor
PORT=3000
NODE_ENV=development
```

## 🚀 Deploy em Produção

### Script de Deploy
```bash
#!/bin/bash

# Deploy script
echo "Iniciando deploy..."

# Pull das mudanças
git pull origin main

# Instalar dependências
npm ci --only=production

# Executar migrações
npm run migrate

# Build da aplicação
npm run build

# Reiniciar serviços
pm2 restart all

echo "Deploy concluído!"
```

### PM2 Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'obras-backend',
    script: './dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

## 📚 Documentação da API

### Swagger/OpenAPI
```yaml
openapi: 3.0.0
info:
  title: Sistema de Monitoramento de Obra Industrial
  version: 1.0.0
  description: API para gestão de obras industriais

servers:
  - url: https://api.obras.com/v1
    description: Servidor de produção

paths:
  /auth/login:
    post:
      summary: Autenticar usuário
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                senha:
                  type: string
      responses:
        '200':
          description: Login bem-sucedido
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                  usuario:
                    $ref: '#/components/schemas/Usuario'

components:
  schemas:
    Usuario:
      type: object
      properties:
        id:
          type: integer
        nome:
          type: string
        email:
          type: string
        cargo:
          type: string
```

## 🔄 Integrações Externas

### APIs de Terceiros
```javascript
// Integração com sistema de pagamentos
const processarPagamento = async (dados) => {
  const response = await axios.post('https://api.pagamentos.com/v1/charges', {
    amount: dados.valor,
    currency: 'BRL',
    description: dados.descricao,
    payment_method: dados.metodo
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.PAYMENT_API_KEY}`
    }
  });
  
  return response.data;
};

// Integração com serviço de SMS
const enviarSMS = async (numero, mensagem) => {
  const response = await axios.post('https://api.sms.com/v1/messages', {
    to: numero,
    message: mensagem
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.SMS_API_KEY}`
    }
  });
  
  return response.data;
};
```

---

**Esta documentação fornece uma base sólida para implementação do backend do Sistema de Monitoramento de Obra Industrial. Para dúvidas técnicas, consulte a equipe de desenvolvimento.** 