# Sistema de Gestão Industrial (SGI)

Um sistema completo de gestão industrial desenvolvido em React, combinando dashboard analytics, CRM, sistema Kanban e monitoramento de redes sociais.

## 🚀 Funcionalidades

### Dashboard Principal
- **Métricas OEE**: Overall Equipment Effectiveness em tempo real
- **Produção**: Acompanhamento de metas diárias e eficiência
- **Status de Equipamentos**: Monitoramento de linhas de produção
- **Alertas**: Notificações de manutenção e problemas
- **Gráficos Interativos**: Visualização de dados de produção

### CRM Industrial
- **Gestão de Fornecedores**: Cadastro, avaliação e histórico
- **Gestão de Clientes**: Controle de relacionamento e receita
- **Sistema de Avaliação**: Rating por estrelas
- **Filtros e Busca**: Localização rápida de contatos
- **Status de Atividade**: Controle de fornecedores ativos/inativos

### Sistema Kanban
- **Gestão de Tarefas**: Ordens de produção e manutenção
- **Workflow Visual**: Backlog → Em Progresso → Teste → Concluído
- **Priorização**: Sistema de prioridades (alta, média, baixa)
- **Atribuição**: Designação de responsáveis
- **Controle de Prazos**: Alertas de tarefas atrasadas

### Social Media Monitor
- **Análise de Sentimento**: Classificação de menções positivas/negativas
- **Métricas de Engajamento**: Alcance, interações e menções
- **Monitoramento Multi-plataforma**: LinkedIn, Twitter, Facebook
- **Alertas de Crise**: Detecção de problemas de imagem
- **Relatórios Visuais**: Gráficos de pizza e barras

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 com Hooks
- **Styling**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📱 Design Responsivo

- **Desktop**: Layout completo com sidebar fixa
- **Tablet**: Sidebar colapsável
- **Mobile**: Menu hambúrguer e layout adaptado

## 🎨 Características de Design

- **Paleta de Cores**: Azul industrial, verde para sucesso, vermelho para alertas
- **Tipografia**: Inter font para máxima legibilidade
- **Componentes**: Cards modulares, gráficos interativos
- **UX**: Navegação intuitiva e feedback visual

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   cd sistema-gestao-industrial
   pnpm install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   pnpm run dev --host
   ```

3. **Build para produção**:
   ```bash
   pnpm run build
   ```

## 📊 Dados Mock

O sistema utiliza dados simulados realistas para demonstração:
- Métricas de OEE e produção
- Base de fornecedores e clientes
- Tarefas de produção e manutenção
- Menções em redes sociais

## 🔧 Estrutura do Projeto

```
src/
├── components/
│   ├── Layout.jsx          # Layout principal com sidebar
│   ├── Dashboard.jsx       # Dashboard com métricas
│   ├── CRM.jsx            # Sistema CRM
│   ├── KanbanBoard.jsx    # Sistema Kanban
│   └── SocialMedia.jsx    # Monitor de redes sociais
├── data/
│   └── mockData.js        # Dados simulados
├── assets/                # Imagens e recursos
└── App.jsx               # Componente principal
```

## 🎯 Objetivo

Este projeto foi desenvolvido como uma demonstração de habilidades em:
- Desenvolvimento React moderno
- Design de interfaces industriais
- Visualização de dados
- Arquitetura de componentes
- Responsividade e UX

## 📈 Métricas do Projeto

- **Componentes**: 5 módulos principais
- **Linhas de Código**: ~1000+ linhas
- **Responsividade**: Desktop, tablet e mobile
- **Performance**: Otimizado com Vite
- **Acessibilidade**: Navegação por teclado e contraste adequado

## 🚀 Deploy

O projeto está pronto para deploy em plataformas como:
- Vercel
- Netlify
- GitHub Pages
- Ou qualquer servidor estático

---
 **Sthevan santos**
**Desenvolvido para demonstrar competências em desenvolvimento frontend e design de sistemas industriais.**

