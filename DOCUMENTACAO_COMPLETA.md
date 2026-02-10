# 📚 Documentação Completa - Chronos Pomodoro

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Características](#características)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Arquitetura do Projeto](#arquitetura-do-projeto)
5. [Estrutura de Pastas](#estrutura-de-pastas)
6. [Models e Types](#models-e-types)
7. [Context API e State Management](#context-api-e-state-management)
8. [Componentes](#componentes)
9. [Web Workers](#web-workers)
10. [Utilitários](#utilitários)
11. [Rotas e Navegação](#rotas-e-navegação)
12. [Sistema de Ciclos Pomodoro](#sistema-de-ciclos-pomodoro)
13. [Persistência de Dados](#persistência-de-dados)
14. [Notificações e Mensagens](#notificações-e-mensagens)
15. [Como Usar](#como-usar)
16. [Desenvolvimento e Build](#desenvolvimento-e-build)

---

## 🎯 Visão Geral

**Chronos Pomodoro** é uma aplicação web moderna para gerenciamento de tarefas usando a técnica Pomodoro. Construída com React, TypeScript e Vite, oferece uma experiência fluida e responsiva para aumentar a produtividade.

O projeto é uma implementação educational de um gerenciador de tarefas que segue a metodologia Pomodoro, com suporte a:
- Criação e gerenciamento de tarefas
- Sistema de ciclos de trabalho e pausa
- Histórico detalhado de tarefas
- Configurações personalizáveis
- Persistência de dados no localStorage

---

## ✨ Características

### Funcionalidades Principais

1. **Iniciação de Tarefas** - Crie novas tarefas com duração configurável
2. **Timer em Tempo Real** - Contador regressivo sincronizado com Web Worker
3. **Sistema de Ciclos** - 8 ciclos com padrão: foco → pausa curta → foco → ... → pausa longa
4. **Histórico de Tarefas** - Visualize, ordene e gerencie todas as tarefas criadas
5. **Configurações** - Personalize durações de foco, pausa curta e pausa longa
6. **Notificações de Áudio** - Alerta sonoro quando uma tarefa é concluída
7. **Sincronização de Abas** - LocalStorage mantém o estado entre sessões
8. **Interface Intuitiva** - Design responsivo e acessível

### Ciclos Pomodoro

O aplicativo segue o padrão clássico de 8 ciclos:
1. Foco (padrão: 1 minuto)
2. Pausa Curta (padrão: 1 minuto)
3. Foco (padrão: 1 minuto)
4. Pausa Curta (padrão: 1 minuto)
5. Foco (padrão: 1 minuto)
6. Pausa Curta (padrão: 1 minuto)
7. Foco (padrão: 1 minuto)
8. Pausa Longa (padrão: 1 minuto)

Após completar 8 ciclos, o contador reinicia.

---

## 🛠 Stack Tecnológico

### Dependências Principais

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router": "^7.13.0",
  "react-toastify": "^11.0.5",
  "date-fns": "^4.1.0",
  "lucide-react": "^0.561.0"
}
```

### Dependências de Desenvolvimento

```json
{
  "typescript": "~5.9.3",
  "vite": "^7.2.4",
  "eslint": "^9.39.1",
  "@vitejs/plugin-react-swc": "^4.2.2",
  "typescript-eslint": "^8.46.4"
}
```

### Ferramentas e Tecnologias

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router v7** - Navegação SPA
- **CSS Modules** - Estilos isolados
- **Web Workers** - Timer em thread separada
- **LocalStorage** - Persistência de dados
- **React Toastify** - Notificações toast
- **Lucide React** - Ícones SVG

---

## 🏗 Arquitetura do Projeto

### Padrões Utilizados

1. **Context API + useReducer** - Gerenciamento global de estado
2. **Web Worker** - Processamento de timer em background
3. **Singleton Pattern** - Instância única do Web Worker
4. **Custom Hooks** - Abstração de contexto (useTaskContext)
5. **Component Composition** - Templates, Containers, Components
6. **CSS Modules** - Escopo de estilos por componente

### Fluxo de Dados

```
App
  ├── TaskContextProvider
  │    ├── useReducer(taskReducer)
  │    ├── TimerWorkerSingleton
  │    └── localStorage persistence
  ├── ShowMessage (Toast notifications)
  └── MainRouter
       ├── Home (Página principal)
       ├── History (Histórico)
       ├── Settings (Configurações)
       └── AboutPomodoro (Sobre)
```

---

## 📁 Estrutura de Pastas

```
src/
├── adapters/                    # Adaptadores para serviços externos
│   └── showMessage.ts          # Wrapper do react-toastify
├── assets/                      # Recursos estáticos
│   └── audios/                 # Sons de alerta
├── components/                  # Componentes reutilizáveis
│   ├── AboutPomodoro/          # Informações sobre Pomodoro
│   ├── Container/              # Wrapper com max-width
│   ├── CountDown/              # Display do timer
│   ├── Cycles/                 # Indicador de ciclos
│   ├── DefaultButton/          # Botão padrão
│   ├── DefaultInput/           # Input padrão
│   ├── Footer/                 # Rodapé
│   ├── GenericHtml/            # Componente HTML genérico
│   ├── Heading/                # Títulos
│   ├── History/                # Página de histórico
│   ├── Logo/                   # Logo da app
│   ├── MainForm/               # Formulário principal
│   ├── Menu/                   # Menu de navegação
│   ├── NotFound/               # Página 404
│   ├── RouterLink/             # Link com roteamento
│   ├── ShowMessage/            # Provider de notificações
│   └── Tips/                   # Dicas úteis
├── contexts/                    # Context API
│   └── TaskContext/
│       ├── initialTaskState.ts
│       ├── taskAction.ts
│       ├── taskReducer.ts
│       ├── TaskContext.tsx
│       ├── TaskContextProvider.tsx
│       └── useTaskContext.ts
├── models/                      # TypeScript types e interfaces
│   ├── TaskModel.ts
│   └── TaskStateModel.ts
├── Pages/                       # Páginas roteadas
│   ├── Home/
│   └── Settings/
├── routers/                     # Configuração de rotas
│   └── MainRouter/
├── styles/                      # Estilos globais
│   ├── global.css
│   └── theme.css
├── Templates/                   # Layouts/Templates
│   └── MainTemplate/
├── utils/                       # Funções utilitárias
│   ├── formatDate.ts
│   ├── formatSecondsToMinutes.ts
│   ├── getNextCycle.ts
│   ├── getNextCycleType.ts
│   ├── getTaskStatus.ts
│   └── loadBeep.ts
├── workers/                     # Web Workers
│   ├── timeWorker.js
│   └── timeWorkerSingleton.ts
├── App.tsx                      # Componente raiz
└── main.tsx                     # Ponto de entrada
```

---

## 🎨 Models e Types

### TaskModel

Define a estrutura de uma tarefa individual.

```typescript
type TaskModel = {
    id: string;                    // Identificador único (timestamp)
    name: string;                  // Nome da tarefa
    duration: number;              // Duração em minutos
    startDate: number;             // Timestamp de início
    completeDate: number | null;   // Timestamp de conclusão
    interruptDate: number | null;  // Timestamp de interrupção
    type: keyof TaskStateModel["config"]; // Tipo: workTime | shortBreakTime | longBreakTime
};
```

### TaskStateModel

Define o estado global da aplicação.

```typescript
type TaskStateModel = {
  tasks: TaskModel[];                        // Array de todas as tarefas
  secondsRemaining: number;                  // Segundos restantes (atual)
  formattedSecondsRemaining: string;        // Formato MM:SS
  activeTask: TaskModel | null;             // Tarefa em execução
  currentCycle: number;                     // Ciclo atual (1-8)
  config: {
    workTime: number;                       // Minutos de foco
    shortBreakTime: number;                 // Minutos de pausa curta
    longBreakTime: number;                  // Minutos de pausa longa
  };
};
```

---

## 🔄 Context API e State Management

### TaskContext

O contexto central que fornece estado e dispatch para toda a aplicação.

```typescript
type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

const TaskContext = createContext<TaskContextProps>({...});
```

### useTaskContext Custom Hook

Simplifica o acesso ao contexto em qualquer componente.

```typescript
export function useTaskContext() {
  return useContext(TaskContext);
}

// Uso:
const { state, dispatch } = useTaskContext();
```

### TaskContextProvider

Componente que envolve toda a aplicação e gerencia o estado.

**Responsabilidades:**
- Inicializa o estado com valores do localStorage
- Configura o Web Worker para o timer
- Sincroniza estado com localStorage a cada mudança
- Gerencia a fila de beeps de áudio

```typescript
export function TextContextProvider({ children }: TextContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem("state");
    if (storageState === null) return initialTaskState;
    
    const parsedStorageState = JSON.parse(storageState);
    return {
      ...parsedStorageState,
      activeTask: null,              // Reset após reload
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00"
    };
  });
  
  // ... gerenciamento do worker e beeps
}
```

### Task Reducer

Processa ações e atualiza o estado imutavelmente.

**Ações disponíveis:**

| Ação | Payload | Descrição |
|------|---------|-----------|
| `START_TASK` | TaskModel | Inicia uma nova tarefa, incrementa ciclo |
| `INTERRUPT_TASK` | - | Interrompe tarefa ativa |
| `COMPLETE_TASK` | - | Marca tarefa como completa |
| `RESET_TASK` | - | Reseta todo o estado inicial |
| `COUNT_DOWN` | { secondsRemaining } | Atualiza segundos restantes |

---

## 🧩 Componentes

### Componentes Principais

#### **CountDown**
Exibe o timer em formato MM:SS.

```tsx
export function CountDown() {
  const { state } = useTaskContext();
  return <div>{state.formattedSecondsRemaining}</div>;
}
```

#### **Cycles**
Visualiza os ciclos completados com indicadores visuais coloridos.

```tsx
export function Cycles() {
  const { state } = useTaskContext();
  const cycleStep = Array.from({ length: state.currentCycle });
  
  // Mapeia cada ciclo para um ponto com cor específica
  // workTime: azul, shortBreakTime: verde, longBreakTime: roxo
}
```

#### **MainForm**
Formulário para criar novas tarefas e gerenciar a tarefa ativa.

**Funcionalidades:**
- Input para nome da tarefa
- Auto-preenche com última tarefa criada
- Botão play/stop contextual
- Mostra dicas de produtividade

```tsx
export function MainForm() {
  // handleCreateNewTask: Submete novo task
  // handleInterruptTask: Interrompe tarefa ativa
}
```

#### **History**
Tabela de histórico com scroll horizontal e sorting.

**Funcionalidades:**
- Visualizar todas as tarefas
- Ordenar por qualquer coluna
- Status visual: Concluído (✓), Interrompido (✗), Ativo
- Reset do histórico com confirmação

```tsx
export function History() {
  // Estado local para ordenação
  const [orderBy, setOrderBy] = useState("startDate");
  const [orderDirection, setOrderDirection] = useState("desc");
}
```

#### **DefaultButton**
Botão reutilizável com ícone, cor e estados.

```tsx
<DefaultButton 
  icon={<PlayCircleIcon />}
  color="green"
  aria-label="Iniciar"
  title="Iniciar tarefa"
  onClick={handleClick}
/>
```

#### **DefaultInput**
Input padrão com label e estados.

```tsx
<DefaultInput 
  id="taskName"
  labelText="Tarefa"
  placeholder="Digite o nome da tarefa"
  disabled={!!state.activeTask}
  ref={taskNameInput}
/>
```

#### **Container**
Wrapper com max-width e padding para layout consistente.

```tsx
<Container>
  <Content />
</Container>
```

### Componentes Estruturais

- **MainTemplate** - Layout principal com header, footer e menu
- **Menu** - Navegação principal
- **Footer** - Rodapé com informações
- **Logo** - Logo da aplicação
- **Heading** - Componente de títulos
- **NotFound** - Página 404
- **AboutPomodoro** - Informações sobre a técnica
- **Tips** - Dicas de produtividade
- **ShowMessage** - Provider de notificações toast
- **GenericHtml** - Envolvedor HTML genérico
- **RouterLink** - Link de navegação

---

## 🔧 Web Workers

### Propósito

O Web Worker executa o countdown em uma thread separada, prevenindo travamentos da UI.

### TimerWorkerSingleton

Implementa o padrão Singleton para garantir uma única instância do Worker.

```typescript
export class TimerWorkerSingleton {
  private static instance: TimerWorkerSingleton | null = null;
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL("./timeWorker.js", import.meta.url));
  }

  static getInstance(): TimerWorkerSingleton {
    if (!instance) {
      instance = new TimerWorkerSingleton();
    }
    return instance;
  }

  postMessage(message: TaskStateModel): void {
    this.worker.postMessage(message);
  }

  onmessage(cb: (e: MessageEvent) => void): void {
    this.worker.onmessage = cb;
  }

  terminate(): void {
    if (instance) {
      instance.worker.terminate();
      instance = null;
    }
  }
}
```

### timeWorker.js

Script executado no Worker que calcula o countdown.

```javascript
let isRunning = false;

self.onmessage = function (e) {
  if (isRunning) return; // Evita múltiplos timers
  
  isRunning = true;
  const state = e.data;
  const { activeTask, secondsRemaining } = state;
  
  // Calcula o tempo final
  const endDate = activeTask.startDate + secondsRemaining * 1000;

  let secondsLeft = Math.ceil((endDate - Date.now()) / 1000);

  function tick() {
    self.postMessage(secondsLeft);
    secondsLeft = Math.floor((endDate - Date.now()) / 1000);
    setTimeout(tick, 1000);
  }

  tick();
}
```

**Fluxo:**
1. TaskContextProvider envia estado via `postMessage()`
2. Worker calcula segundos restantes baseado em timestamps
3. A cada segundo, Worker envia `secondsLeft` de volta
4. TaskContextProvider dispatch `COUNT_DOWN` action
5. Quando `secondsLeft <= 0`, dispatch `COMPLETE_TASK`

---

## 🛠 Utilitários

### formatSecondsToMinutes

Converte segundos para formato MM:SS.

```typescript
formatSecondsToMinutes(125); // "02:05"
```

### formatDate

Formata timestamp para formato legível usando date-fns.

```typescript
formatDate(1234567890000); // "13/02/2009 23:31"
```

### getNextCycle

Retorna o próximo número de ciclo (1-8).

```typescript
getNextCycle(0);  // 1
getNextCycle(1);  // 2
getNextCycle(8);  // 1 (reset)
```

### getNextCycleType

Retorna o tipo do próximo ciclo.

```typescript
// Padrão: workTime em ciclos ímpares
// shortBreakTime em ciclos pares (exceto 8)
// longBreakTime no ciclo 8

getNextCycleType(1); // "workTime"
getNextCycleType(2); // "shortBreakTime"
getNextCycleType(8); // "longBreakTime"
```

### getTaskStatus

Retorna o status visual de uma tarefa.

```typescript
getTaskStatus(task); // "Concluído" | "Interrompido" | "Ativo"
```

### loadBeep

Carrega e retorna uma função para tocar o som de alerta.

```typescript
const playBeep = loadBeep();
playBeep(); // Toca o áudio
```

### showMessage (Adapter)

Wrapper do react-toastify para notificações.

```typescript
showMessage.success("Tarefa iniciada");
showMessage.error("Erro ao salvar");
showMessage.warn("Aviso importante");
showMessage.info("Informação");
showMessage.dismiss(); // Fecha notificação
```

---

## 🗺 Rotas e Navegação

### Rotas Disponíveis

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | Home | Página principal com timer e forma |
| `/history` | History | Histórico de tarefas |
| `/settings` | Settings | Configurações da aplicação |
| `/about-pomodoro` | AboutPomodoro | Informações sobre a técnica |
| `*` | NotFound | Página 404 para rotas inválidas |

### ScrollToTop

Componente sem renderização que causa scroll para topo ao mudar de rota.

```tsx
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
```

---

## ⏰ Sistema de Ciclos Pomodoro

### O Que é Pomodoro?

Técnica de gerenciamento de tempo que alterna períodos de foco intenso com pausas curtas.

### Implementação no Chronos

**Padrão de 8 Ciclos:**

```
Ciclo 1: Foco (workTime)
Ciclo 2: Pausa Curta (shortBreakTime)
Ciclo 3: Foco (workTime)
Ciclo 4: Pausa Curta (shortBreakTime)
Ciclo 5: Foco (workTime)
Ciclo 6: Pausa Curta (shortBreakTime)
Ciclo 7: Foco (workTime)
Ciclo 8: Pausa Longa (longBreakTime) ← Repouso maior
↓
Reset para Ciclo 1
```

### Lógica de Determinação de Tipo

```typescript
function getNextCycleType(currentCycle: number): TaskModel["type"] {
  if (currentCycle % 8 === 0) return "longBreakTime";  // 8, 16, 24...
  if (currentCycle % 2 === 0) return "shortBreakTime"; // 2, 4, 6...
  return "workTime";                                     // 1, 3, 5, 7...
}
```

### Visual de Ciclos

O componente `Cycles` exibe dots coloridos:
- 🔵 Azul: Ciclo de foco
- 🟢 Verde: Pausa curta
- 🟣 Roxo: Pausa longa

---

## 💾 Persistência de Dados

### Estratégia

O estado completo é salvo no `localStorage` após cada mudança.

```typescript
// Em TaskContextProvider
useEffect(() => {
  localStorage.setItem("state", JSON.stringify(state));
}, [state]);
```

### Recuperação

Ao carregar a aplicação, o state é recuperado do localStorage.

```typescript
const [state, dispatch] = useReducer(
  taskReducer, 
  initialTaskState,
  () => {
    const storageState = localStorage.getItem("state");
    if (storageState === null) return initialTaskState;
    
    const parsedStorageState = JSON.parse(storageState);
    // Reset de fields durante a recarga
    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00"
    };
  }
);
```

### Dados Persistidos

- ✅ Lista de tarefas completa
- ✅ Configurações (workTime, breakTime, etc)
- ✅ Ciclo atual
- ✅ ❌ Tarefa ativa (resetada no reload)
- ✅ ❌ Segundos restantes (recalculados)

### Local Storage Key

- **Key:** `"state"`
- **Formato:** JSON stringificado
- **Tamanho típico:** ~1-5 KB

---

## 📢 Notificações e Mensagens

### React Toastify Integration

Notificações toast no canto inferior direito.

### Tipos de Mensagens

```typescript
showMessage.success("Tarefa criada com sucesso");
showMessage.error("Erro ao salvar configurações");
showMessage.warn("Confirme antes de deletar");
showMessage.info("Nova funcionalidade disponível");
```

### ShowMessage Adapter

Centraliza todas as notificações em um único adaptador.

```typescript
export const showMessage = {
    sucess: (message: string) => toast.success(message),  // Nota: typo em "sucess"
    error: (message: string) => toast.error(message),
    warn: (message: string) => toast.warn(message),
    info: (message: string) => toast.info(message),
    dismiss: () => toast.dismiss(),
};
```

### ShowMessage Component

Provider que envolve a aplicação e ativa o container.

```tsx
<ShowMessage>
  <MainRouter />
</ShowMessage>
```

---

## 🎯 Como Usar

### 1. Iniciar uma Tarefa

1. Acesse a Home (`/`)
2. Digite o nome da tarefa no input
3. Clique no botão verde (Play) ou pressione Enter
4. O timer iniciará automaticamente

### 2. Estados da Tarefa

**Enquanto ativo:**
- Input fica desabilitado
- Botão muda para vermelho (Stop)
- Clique para interromper a tarefa
- O timer conta regressivamente

**Ao concluir:**
- Alerta sonoro é reproduzido
- Tarefa é marcada como "Concluído"
- Próximo ciclo é iniciado automaticamente
- Contador zera

### 3. Interromper uma Tarefa

Clique no botão vermelho enquanto a tarefa está ativa, ou:
- Feche a aba/navegador
- O status será marcado como "Interrompido"

### 4. Visualizar Histórico

1. Clique em "Histórico" no menu
2. Veja todas as tarefas com:
   - Nome
   - Data/hora de início
   - Duração
   - Status (Concluído/Interrompido)
   - Tipo (Foco/Pausa)
3. Ordene por qualquer coluna (clique no header)
4. Clique no ícone lixo para deletar histórico

### 5. Configurações

1. Acesse "Configurações" (`/settings`)
2. Modifique:
   - Duração do foco (trabalho)
   - Duração da pausa curta
   - Duração da pausa longa
3. Clique em "Salvar"

### 6. Sobre Pomodoro

Clique em "Sobre Pomodoro" para saber mais sobre a técnica.

---

## 🔨 Desenvolvimento e Build

### Requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
npm install
```

### Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev
# Abrirá em http://localhost:5173

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Executar linter
npm run lint
```

### Scripts do Package.json

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

### Estrutura de Build

- **Entry:** `src/main.tsx`
- **Output:** `dist/`
- **Config:** `vite.config.ts`
- **TypeScript:** `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`

### Hot Module Replacement (HMR)

Vite configura HMR automaticamente. Mudanças em arquivos são refletidas sem refresh.

---

## 📝 Notas Importantes

### 1. Typo em showMessage

Há um typo no adaptador `showMessage`:
```typescript
sucess: (message: string) => toast.success(message),  // "sucess" em vez de "success"
```

**Para corrigir:**
```typescript
success: (message: string) => toast.success(message),
```

### 2. Typo em History

Há um typo no getTaskTypeDict:
```typescript
longFormattersBreakTime: "Descanso longo"  // Deveria ser "longBreakTime"
```

### 3. Conversão de Tempo

O Worker calcula baseado em timestamps (ms), enquanto a UI exibe em MM:SS:
- Segundos são arredondados para cima no início
- Arredondados para baixo a cada tick
- Garante precisão de ±1 segundo

### 4. Estado Ativo após Reload

Quando a página é recarregada:
- O histórico de tarefas é preservado
- A tarefa ativa é resetada
- Os segundos restantes são recalculados
- Isso previne bugs de timer duplicate

### 5. Acessibilidade

O projeto inclui:
- `aria-label` em botões e ícones
- `title` attributes para hover hints
- Navegação via teclado no formulário
- Cores que respeitam contraste WCAG

---

## 🎓 Aprendizados e Padrões

### Padrões Identificados

1. **Context + useReducer** - Alternativa elegante ao Redux
2. **Web Workers** - Isolamento de processamento pesado
3. **Singleton Pattern** - Gerenciamento de instância única
4. **Custom Hooks** - Abstração e reutilização
5. **CSS Modules** - Encapsulamento de estilos
6. **localStorage API** - Persistência simples
7. **Composition Pattern** - Componentes reutilizáveis e compostos

### Boas Práticas Implementadas

✅ TypeScript strong typing
✅ Imutabilidade no reducer
✅ Separação de responsabilidades
✅ Naming conventions claras
✅ Modularização
✅ Reutilização de componentes
✅ Persistência de estado
✅ Acessibilidade
✅ Tratamento de erros com mensagens

---

## 📦 Deploymentis

### Build para Produção

```bash
npm run build
```

Gera pasta `dist/` pronta para produção.

### Plataformas Recomendadas

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

### Variáveis de Ambiente

Atualmente não há variáveis de ambiente configuradas.

---

## 🐛 Troubleshooting

### Timer não inicia

- Verifique se o navegador permite Web Workers
- Verifique console para erros
- Tente recarregar a página

### Som não toca

- Verifique permissões de áudio do navegador
- Verifique volume do dispositivo
- Arquivo de áudio pode estar ausente em `src/assets/audios/`

### Estado não persiste

- Verifique se localStorage está habilitado
- Abra DevTools > Application > LocalStorage
- Chave `"state"` deve estar presente

### Histórico desaparece

- Pode ter sido resetado manualmente
- localStorage foi limpo
- Modo privado/anônimo limpa ao fechar

---

## 🚀 Próximas Melhorias

Sugestões para expansão do projeto:

1. **Edição de Tarefas** - Permitir editar nome/duração
2. **Categorias** - Agrupar tarefas por categoria
3. **Estatísticas** - Dashboard com gráficos de produtividade
4. **Dark Mode** - Tema escuro
5. **Mobile** - Otimizar para dispositivos móveis
6. **Push Notifications** - Notificações do sistema
7. **Sincronização Cloud** - Backup em servidor
8. **Temas Customizáveis** - Usuário escolhe cores
9. **Intervals Customizáveis** - Ciclos personalizados
10. **Estatísticas por Data** - Visualizar progresso diário/semanal

---

## 📞 Suporte

Para dúvidas sobre o projeto:
1. Verifique este documento
2. Revise o código-fonte (bem comentado)
3. Consulte a documentação das dependências
4. Abra uma issue no repositório

---

## 📄 Licença

Este projeto é fornecido como material educacional.

---

**Documentação gerada em:** 10/02/2026

**Versão do Projeto:** 0.0.0

**Autor:** [Seu Nome]

---

## 🗂 Referência Rápida de Arquivos Chave

| Arquivo | Propósito |
|---------|-----------|
| `src/App.tsx` | Componente raiz com providers |
| `src/main.tsx` | Ponto de entrada da aplicação |
| `src/contexts/TaskContext/TaskContextProvider.tsx` | State management |
| `src/components/MainForm/index.tsx` | Lógica principal de tarefas |
| `src/components/History/index.tsx` | Visualização do histórico |
| `src/workers/timeWorkerSingleton.ts` | Gerenciamento do timer |
| `src/models/TaskStateModel.ts` | Definição de tipos |
| `src/routers/MainRouter/index.tsx` | Configuração de rotas |
| `package.json` | Dependências e scripts |
| `vite.config.ts` | Configuração do build |

---

**Fim da Documentação**
