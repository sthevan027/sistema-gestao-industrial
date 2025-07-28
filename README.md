# Sistema de Monitoramento de Obra Industrial

## 📋 Descrição

Sistema completo de monitoramento e gestão de obras industriais, desenvolvido em React com interface moderna e funcionalidades avançadas para acompanhamento em tempo real de projetos de construção civil.

## 🚀 Funcionalidades Principais

### 📊 Monitoramento de Obra
- **Dashboard em Tempo Real**: Acompanhamento visual do progresso da obra
- **Sensores IoT**: Monitoramento de temperatura, umidade, ruído e vibração
- **Alertas Inteligentes**: Sistema de notificações para eventos críticos
- **Métricas de Performance**: Indicadores de eficiência e produtividade

### 📁 Gestão de Projetos
- **Controle de Projetos**: Criação, edição e acompanhamento de projetos
- **Cronograma**: Planejamento e controle de prazos
- **Orçamento**: Gestão financeira e controle de custos
- **Status Tracking**: Acompanhamento de status e progresso

### 🔧 Gestão de Recursos
- **Equipamentos**: Controle de maquinário e ferramentas
- **Funcionários**: Gestão de equipe e alocação
- **Materiais**: Controle de estoque e solicitações
- **Manutenção**: Agendamento e histórico de manutenções

### 📈 Relatórios e Análises
- **Relatórios Gerais**: Visão consolidada de todos os projetos
- **Análise de Custos**: Controle financeiro detalhado
- **Relatórios de Qualidade**: Métricas de conformidade e segurança
- **Exportação**: Geração de relatórios em diferentes formatos

### ⚙️ Configurações
- **Perfil da Empresa**: Configurações institucionais
- **Notificações**: Personalização de alertas
- **Segurança**: Configurações de autenticação e backup
- **Usuários**: Gestão de acessos e permissões

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19**: Framework principal
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework de estilização
- **Radix UI**: Componentes acessíveis
- **Lucide React**: Ícones
- **Recharts**: Gráficos e visualizações
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de dados

### Dependências Principais
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "tailwindcss": "^4.1.7",
  "recharts": "^2.15.3",
  "lucide-react": "^0.510.0",
  "react-hook-form": "^7.56.3",
  "zod": "^3.24.4"
}
```

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/sistema-gestao-industrial.git
cd sistema-gestao-industrial
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Execute o projeto**
```bash
pnpm dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

## 🏗️ Estrutura do Projeto

```
sistema-gestao-industrial/
├── src/
│   ├── components/
│   │   ├── ui/                    # Componentes base (Radix UI)
│   │   ├── ObraMonitoramento.jsx  # Dashboard principal
│   │   ├── Projetos.jsx           # Gestão de projetos
│   │   ├── Recursos.jsx           # Gestão de recursos
│   │   ├── Relatorios.jsx         # Relatórios e análises
│   │   ├── Configuracoes.jsx      # Configurações do sistema
│   │   ├── Layout.jsx             # Layout principal
│   │   └── Dashboard.jsx          # Dashboard geral
│   ├── hooks/
│   │   └── use-mobile.js          # Hook para responsividade
│   ├── lib/
│   │   └── utils.js               # Utilitários
│   ├── data/
│   │   └── mockData.js            # Dados de exemplo
│   ├── App.jsx                    # Componente principal
│   └── main.jsx                   # Ponto de entrada
├── public/                        # Arquivos estáticos
├── package.json                   # Dependências
└── README.md                      # Documentação
```

## 🎯 Funcionalidades Detalhadas

### 1. Monitoramento de Obra

#### Dashboard em Tempo Real
- **Progresso Geral**: Visualização do percentual de conclusão
- **Funcionários Ativos**: Contagem de equipe em campo
- **Orçamento Utilizado**: Controle financeiro em tempo real
- **Alertas Ativos**: Notificações de eventos críticos

#### Sensores IoT
- **Temperatura**: Monitoramento ambiental
- **Umidade**: Controle de condições climáticas
- **Nível de Ruído**: Conformidade com normas
- **Vibração**: Análise estrutural

#### Gráficos e Análises
- **Progresso da Obra**: Evolução temporal
- **Recursos por Categoria**: Distribuição de materiais
- **Status das Atividades**: Controle de etapas
- **Alertas e Notificações**: Sistema de comunicação

### 2. Gestão de Projetos

#### Controle de Projetos
- **Listagem Completa**: Visualização de todos os projetos
- **Filtros Avançados**: Busca por status, cliente, período
- **Estatísticas**: Métricas de performance
- **Ações Rápidas**: Edição e detalhamento

#### Informações Detalhadas
- **Dados do Projeto**: Nome, cliente, status
- **Cronograma**: Datas de início e fim
- **Orçamento**: Valores e controle financeiro
- **Equipe**: Alocação de funcionários

### 3. Gestão de Recursos

#### Equipamentos
- **Status em Tempo Real**: Ativo, manutenção, inativo
- **Localização**: Controle de posicionamento
- **Horas de Uso**: Monitoramento de utilização
- **Manutenção**: Agendamento e histórico

#### Funcionários
- **Perfil Completo**: Dados pessoais e profissionais
- **Alocação**: Projeto atual e responsabilidades
- **Performance**: Métricas de eficiência
- **Controle de Acesso**: Gestão de permissões

#### Materiais
- **Estoque**: Controle de quantidade
- **Estoque Mínimo**: Alertas de reposição
- **Categorização**: Organização por tipo
- **Histórico**: Rastreamento de movimentações

### 4. Relatórios e Análises

#### Relatório Geral
- **KPIs Principais**: Indicadores de performance
- **Gráficos Interativos**: Visualizações dinâmicas
- **Comparativos**: Análise temporal
- **Exportação**: Geração de relatórios

#### Análise de Custos
- **Resumo Financeiro**: Visão consolidada
- **Distribuição**: Análise por categoria
- **Variações**: Controle de orçamento
- **Detalhamento**: Breakdown por atividade

#### Relatório de Qualidade
- **Conformidade**: Percentual de adequação
- **Taxa de Rejeição**: Controle de qualidade
- **Inspeções**: Quantidade e resultados
- **Segurança**: Incidentes e prevenção

### 5. Configurações

#### Configurações Gerais
- **Dados da Empresa**: Informações institucionais
- **Configurações Regionais**: Idioma, fuso horário
- **Aparência**: Tema claro/escuro

#### Notificações
- **Canais**: Email, push, SMS
- **Tipos**: Alertas críticos, relatórios
- **Personalização**: Configuração individual

#### Segurança
- **Autenticação 2FA**: Segurança adicional
- **Timeout de Sessão**: Controle de acesso
- **Complexidade de Senha**: Políticas de segurança
- **Backup Automático**: Proteção de dados

#### Usuários
- **Gestão de Acessos**: Criação e edição
- **Perfis**: Administrador, gerente, usuário
- **Controle de Status**: Ativo/inativo
- **Logs de Auditoria**: Rastreamento de ações

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build
pnpm build            # Gera build de produção
pnpm preview          # Visualiza build de produção

# Qualidade
pnpm lint             # Executa linter
```

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop**: Interface completa com sidebar
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Menu hambúrguer e layout otimizado

## 🎨 Design System

### Cores Principais
- **Azul**: `#3b82f6` - Ações principais
- **Verde**: `#10b981` - Sucesso e progresso
- **Amarelo**: `#f59e0b` - Avisos
- **Vermelho**: `#ef4444` - Erros e alertas críticos

### Componentes
- **Cards**: Containers de informação
- **Buttons**: Ações e navegação
- **Badges**: Status e categorização
- **Progress**: Indicadores de progresso
- **Charts**: Gráficos e visualizações

## 🔒 Segurança

### Autenticação
- **Login/Logout**: Sistema de autenticação
- **2FA**: Autenticação de dois fatores
- **Sessão**: Timeout configurável
- **Permissões**: Controle de acesso por usuário

### Dados
- **Backup**: Sistema automático de backup
- **Logs**: Auditoria de ações
- **Criptografia**: Proteção de dados sensíveis

## 📊 Integrações Futuras

### APIs Planejadas
- **Sensores IoT**: Conexão com dispositivos
- **Sistemas ERP**: Integração empresarial
- **Notificações**: Push notifications
- **Relatórios**: Exportação avançada

### Funcionalidades Futuras
- **Mobile App**: Aplicativo nativo
- **IA/ML**: Análise preditiva
- **Realidade Aumentada**: Visualização 3D
- **Chatbot**: Suporte automatizado

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

### Padrões de Código
- **ESLint**: Configuração de linting
- **Prettier**: Formatação de código
- **Conventional Commits**: Padrão de commits
- **TypeScript**: Tipagem estática (futuro)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

### Contato
- **Email**: suporte@empresa.com
- **Telefone**: (11) 3456-7890
- **Documentação**: [docs.empresa.com](https://docs.empresa.com)

### Comunidade
- **GitHub Issues**: Reporte bugs e sugestões
- **Discord**: Comunidade de desenvolvedores
- **Blog**: Artigos e tutoriais

---

**Desenvolvido com ❤️ pela equipe de desenvolvimento industrial**

