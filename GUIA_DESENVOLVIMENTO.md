# 🚀 Guia de Desenvolvimento Rápido - Chronos Pomodoro

## 🎯 Para Iniciantes: Como o Projeto Funciona em 5 Minutos

### 1. Abra o projeto...
```bash
cd c:\Users\rodri\OneDrive\Desktop\Estudos\chronos-podomoro
npm install
npm run dev
```

### 2. Acesse `http://localhost:5173`

### 3. O que você vê:
- **Topo:** Timer em MM:SS (inicialmente 00:00)
- **Meio:** Formulário com input para nome da tarefa + botão ▶
- **Ciclos:** Indicadores visuais (aparecem após primeira tarefa)

### 4. Teste criando uma tarefa:
- Digite "Learn React" no input
- Clique em ▶ (ou Enter)
- O timer começa a contar regressivamente
- Clique em ⏹ para interromper

### 5. Explore as rotas:
- `/` - Home (timer principal)
- `/history` - Histórico de tarefas
- `/settings` - Configurações
- `/about-pomodoro` - Sobre a técnica

---

## 📚 Estrutura Essencial para Iniciantes

### Arquivos Que Você PRECISA Entender

```
1. src/App.tsx
   └─ Ponto raiz da aplicação
   └─ Fornece providers (Context, Toasts, Router)

2. src/contexts/TaskContext/TaskContextProvider.tsx
   └─ Gerencia TODO o estado global
   └─ Conecta com Worker para timer

3. src/contexts/TaskContext/taskReducer.ts
   └─ Lógica de como o estado é atualizado
   └─ Similar a Redux

4. src/components/MainForm/index.tsx
   └─ Lógica principal de criar tarefas
   └─ Coordena dispatch com validações

5. src/workers/timeWorkerSingleton.ts + timeWorker.js
   └─ Timer rodando em background
   └─ Comunica com o Provider via postMessage

6. src/models/TaskStateModel.ts
   └─ Define a forma do estado global
   └─ Tipos TypeScript
```

### Arquivos Secundários

```
src/components/         ─ Componentes UI reutilizáveis
src/utils/              ─ Funções auxiliares
src/Pages/              ─ Páginas roteadas
src/adapters/           ─ Integrações (toast, etc)
```

---

## 🔨 Como Estender o Projeto

### Caso 1: Adicionar Nova Action no Reducer

**Objetivo:** Deletar uma tarefa individual

**Passo 1:** Defina a action em `src/contexts/TaskContext/taskAction.ts`

```typescript
export enum TaskActionTypes {
  START_TASK = "START_TASK",
  // ... outros ...
  DELETE_TASK = "DELETE_TASK",  // ← NOVA
}

type TaskActionWithPayload =
  | {
    type: TaskActionTypes.DELETE_TASK;
    payload: { taskId: string };
  }
  | // ... outros ...
```

**Passo 2:** Implemente o case no reducer (`src/contexts/TaskContext/taskReducer.ts`)

```typescript
case TaskActionTypes.DELETE_TASK: {
  return {
    ...state,
    tasks: state.tasks.filter(task => task.id !== action.payload.taskId)
  };
}
```

**Passo 3:** Use em um componente

```tsx
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { TaskActionTypes } from "../../contexts/TaskContext/taskAction";

export function TaskItem({ task }) {
  const { dispatch } = useTaskContext();
  
  const handleDelete = () => {
    dispatch({
      type: TaskActionTypes.DELETE_TASK,
      payload: { taskId: task.id }
    });
    showMessage.info("Tarefa deletada");
  };
  
  return (
    <div>
      <span>{task.name}</span>
      <button onClick={handleDelete}>🗑</button>
    </div>
  );
}
```

---

### Caso 2: Criar um Novo Componente

**Objetivo:** Componente `TaskStats` que mostra estatísticas

**Passo 1:** Crie `src/components/TaskStats/index.tsx`

```tsx
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./styles.module.css";

export function TaskStats() {
  const { state } = useTaskContext();
  
  const completedTasks = state.tasks.filter(t => t.completeDate).length;
  const interruptedTasks = state.tasks.filter(t => t.interruptDate).length;
  const totalMinutes = state.tasks.reduce((sum, t) => sum + t.duration, 0);
  
  return (
    <div className={styles.stats}>
      <div>✅ Concluídas: {completedTasks}</div>
      <div>❌ Interrompidas: {interruptedTasks}</div>
      <div>⏱️ Total: {totalMinutes} min</div>
    </div>
  );
}
```

**Passo 2:** Crie `src/components/TaskStats/styles.module.css`

```css
.stats {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 0.9rem;
}

.stats > div {
  flex: 1;
  text-align: center;
}
```

**Passo 3:** Use em uma página

```tsx
import { TaskStats } from "../../components/TaskStats";

export function Home() {
  return (
    <MainTemplate>
      <Container><TaskStats /></Container>
      {/* ... resto do conteúdo ... */}
    </MainTemplate>
  );
}
```

---

### Caso 3: Adicionar Nova Rota

**Objetivo:** Criar página `/stats` de estatísticas

**Passo 1:** Crie `src/Pages/Stats/index.tsx`

```tsx
import { MainTemplate } from "../../Templates/MainTemplate";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { TaskStats } from "../../components/TaskStats";


export function Stats() {
  return (
    <>
      <MainTemplate>
        <Container><Heading>Estatísticas</Heading></Container>
        <Container><TaskStats /></Container>
      </MainTemplate>
    </>
  );
}
```

**Passo 2:** Atualize o router em `src/routers/MainRouter/index.tsx`

```tsx
import { Stats } from "../../Pages/Stats";

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/stats" element={<Stats />} />  {/* ← NOVA */}
        <Route path="/about-pomodoro" element={<AboutPomodoro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
```

**Passo 3:** Adicione link no Menu

```tsx
<Link to="/stats">Estatísticas</Link>
```

---

### Caso 4: Criar Nova Utility Function

**Objetivo:** Função para calcular produtividade do dia

**Passo 1:** Crie `src/utils/getProductivityToday.ts`

```typescript
import { TaskModel } from "../models/TaskModel";

export function getProductivityToday(tasks: TaskModel[]): {
  completed: number;
  interrupted: number;
  percentage: number;
} {
  const today = new Date().toDateString();
  
  const tasksToday = tasks.filter(
    task => new Date(task.startDate).toDateString() === today
  );
  
  const completed = tasksToday.filter(t => t.completeDate).length;
  const interrupted = tasksToday.filter(t => t.interruptDate).length;
  const total = completed + interrupted;
  
  return {
    completed,
    interrupted,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
  };
}
```

**Passo 2:** Use em um componente

```tsx
import { getProductivityToday } from "../../utils/getProductivityToday";

export function Home() {
  const { state } = useTaskContext();
  const today = getProductivityToday(state.tasks);
  
  return (
    <div>
      Produtividade de hoje: {today.percentage}%
      ({today.completed} concluídas, {today.interrupted} interrompidas)
    </div>
  );
}
```

---

## 🎨 Padrões de Código

### Pattern 1: Usar o Context

```tsx
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function MyComponent() {
  // ✅ BOM
  const { state, dispatch } = useTaskContext();
  
  // ❌ EVITADOR (usar direto)
  // const context = React.useContext(TaskContext);
  
  return <div>{state.formattedSecondsRemaining}</div>;
}
```

### Pattern 2: Validar inputs

```tsx
function handleCreateNewTask(e: React.FormEvent) {
  e.preventDefault();
  
  const taskName = taskNameInput.current?.value.trim();
  
  // ✅ BOM: Validar ANTES de usar
  if (!taskName) {
    showMessage.warn("Por favor, digite um nome");
    return;
  }
  
  // ❌ RUIM: Validar DEPOIS
  let newTask;
  try {
    newTask = createTask(taskName);
  } catch(e) {
    showMessage.error("Erro!");
  }
}
```

### Pattern 3: Usar CSS Modules

```tsx
// ✅ BOM
import styles from "./styles.module.css";

export function Button() {
  return <button className={styles.button}>Click</button>;
}
```

```css
/* styles.module.css */
.button {
  background: #007BFF;
  color: white;
}
```

```tsx
// ❌ EVITAR: CSS global
<button className="button">Click</button>

// ❌ EVITAR: Inline styles grandes
<button style={{ background: "#007BFF", color: "white" }}>Click</button>
```

### Pattern 4: Dispatch com Types

```tsx
// ✅ BOM: Tipado
dispatch({
  type: TaskActionTypes.START_TASK,
  payload: newTask
});

// ❌ RUIM: String direta
dispatch({
  type: "START_TASK",
  payload: newTask
});

// ❌ RUIM: Sem validação
dispatch(someRandomObject);
```

### Pattern 5: Acessibilidade

```tsx
// ✅ BOM: Acessível
<button
  aria-label="Iniciar tarefa"
  title="Iniciar tarefa (Alt+Enter)"
  onClick={handleStart}
>
  ▶
</button>

// ❌ RUIM: Não acessível
<button onClick={handleStart}>▶</button>

// ✅ ÓTIMO: Input com label
<label htmlFor="taskInput">Nome da Tarefa</label>
<input id="taskInput" placeholder="..." />

// ❌ RUIM: Sem label associada
<input placeholder="Nome da Tarefa" />
```

---

## 🧪 Como Debugar

### 1. Usar React DevTools

```
1. Instale extensão "React Developer Tools"
2. Devtools > Components
3. Procure por TaskContextProvider
4. Inspecione state na aba Props
```

### 2. Verificar localStorage

```javascript
// No console do navegador:
localStorage.getItem("state")  // Vê o estado salvo
JSON.parse(localStorage.getItem("state"))  // Formatado
localStorage.removeItem("state")  // Limpa
localStorage.clear()  // Limpa tudo
```

### 3. Monitorar Dispatch Actions

```typescript
// Em taskReducer.ts, adicione:
export function taskReducer(state: TaskStateModel, action: TaskActionModel) {
  console.log("ACTION:", action.type);
  console.log("STATE ANTES:", state);
  
  const newState = /* ... seu switch ... */;
  
  console.log("STATE DEPOIS:", newState);
  return newState;
}
```

### 4. Debugar Web Worker

```javascript
// Em src/workers/timeWorker.js, adicione:
self.onmessage = function (e) {
  console.log("[Worker] Recebido:", e.data);
  
  // ... seu código ...
  
  function tick() {
    console.log("[Worker] Tick:", secondsLeft);
    self.postMessage(secondsLeft);
  }
}
```

### 5. Network/Performance

```
DevTools > Performance
1. Click "Record"
2. Use a aplicação por alguns segundos
3. Click "Stop"
4. Analise o timeline

Procure por:
  - Long Tasks (layout thrashing)
  - Memory leaks
  - Renders desnecessários
```

---

## 🐛 Problemas Comuns e Soluções

### Problema 1: Timer não inicia

**Sintomas:** Clica no botão, nada acontece

**Possíveis Causas:**
1. Web Worker não suportado
2. Erro no dispatch
3. Input vazio

**Solução:**
```typescript
// Adicione em TaskContextProvider.tsx
useEffect(() => {
  console.log("Active task:", state.activeTask);
  console.log("Worker:", worker);
}, [state.activeTask]);
```

---

### Problema 2: Estado desaparece ao recarregar

**Sintomas:** Histórico sumiu após refresh

**Possíveis Causas:**
1. localStorage desabilitado
2. Modo privado/anônimo
3. localStorage.clear() foi chamado

**Solução:**
```typescript
// Em TaskContextProvider.tsx
useEffect(() => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.error("localStorage não disponível:", e);
    showMessage.warn("Seu histórico não será salvo");
  }
}, [state]);
```

---

### Problema 3: Som não toca

**Sintomas:** Timer completa, sem som

**Possíveis Causas:**
1. Arquivo de áudio não encontrado
2. Permissões de áudio negadas
3. Volume no mute

**Solução:**
```typescript
// Em loadBeep.ts
export function loadBeep() {
  try {
    const audio = new Audio("/audios/beep.mp3");
    return () => {
      audio.currentTime = 0;
      audio.play().catch(e => console.error("Audio erro:", e));
    };
  } catch (e) {
    console.error("Falha ao carregar áudio:", e);
    return () => {}; // Fallback silencioso
  }
}
```

---

### Problema 4: Multiple React instances warning

**Sintomas:** Console avisa sobre múltiplas instâncias React

**Possível Causa:** React importado 2+ vezes

**Solução:**
```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}

// Rode:
npm dedupe
npm install
```

---

### Problema 5: Componente não re-renderiza

**Sintomas:** Mudou no state mas UI não atualizou

**Possível Causa:** Mutação acidental do state

```typescript
// ❌ ERRADO: Mutação
state.tasks[0].name = "New Name";
return state;

// ✅ CORRETO: Cópia imutável
return {
  ...state,
  tasks: state.tasks.map((t, i) =>
    i === 0 ? { ...t, name: "New Name" } : t
  )
};
```

---

## ✅ Checklist Antes do Deploy

- [ ] `npm run lint` sem erros
- [ ] `npm run build` sem erros
- [ ] Teste no navegador localmente
- [ ] Teste criar tarefa
- [ ] Teste interromper tarefa
- [ ] Teste histórico
- [ ] Teste localStorage:
  -   [ ] Recarregar e ver dados persistidos
  -   [ ] Limpar localStorage e começar novo
- [ ] Teste em mobile (DevTools responsive)
- [ ] Teste som (deve tocar ao concluir)
- [ ] Teste em outro navegador (Chrome, Firefox, Edge)
- [ ] Remova `console.log()` de debug
- [ ] Versão no `package.json` atualizada
- [ ] .gitignore configurado (node_modules, dist, etc)

---

## 🚀 Deploy em 5 Minutos

### Opção 1: Vercel (Recomendado)

```bash
# Instale Vercel CLI
npm i -g vercel

# Na pasta do projeto
vercel deploy --prod

# Acesse a URL gerada
```

### Opção 2: GitHub Pages

```bash
# Atualize vite.config.ts
export default defineConfig({
  base: '/chronos-pomodoro/',
  // ...
})

# Build
npm run build

# Envie a pasta dist/ para GitHub Pages
```

### Opção 3: Netlify

```bash
# Instale Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir dist

# Acesse o link gerado
```

---

## 📖 Referências Úteis

### React
- [React Docs](https://react.dev)
- [React Context](https://react.dev/reference/react/useContext)
- [useReducer](https://react.dev/reference/react/useReducer)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React + TypeScript](https://react-typescript-cheatsheet.netlify.app/)

### Vite
- [Vite Guide](https://vitejs.dev/guide/)
- [Vite API](https://vitejs.dev/guide/ssr.html)

### Web Workers
- [MDN: Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

### Dependências
- [React Router v7](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [Lucide Icons](https://lucide.dev/)
- [date-fns](https://date-fns.org/)

---

## 💡 Tips & Tricks

### 1. Atalhos de Teclado (implementar)

```typescript
// Adicione em MainForm.tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Ctrl+N: Nova tarefa
    if (e.ctrlKey && e.key === 'n') {
      taskNameInput.current?.focus();
    }
    // Ctrl+S: Parar tarefa
    if (e.ctrlKey && e.key === 's') {
      handleInterruptTask();
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 2. Service Worker para PWA (futuro)

```typescript
// em main.tsx
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### 3. Dark Mode Toggle (futuro)

```typescript
const [isDark, setIsDark] = useState(false);

useEffect(() => {
  document.documentElement.setAttribute(
    'data-theme',
    isDark ? 'dark' : 'light'
  );
}, [isDark]);
```

---

## 🎓 Praticar: Desafios

### Desafio 1: Long Break Automático
Após 4 ciclos de foco, criar uma pausa longa automática.

### Desafio 2: Categorias
Permitir usuário categorizar tarefas (Trabalho, Estudo, Hobby).

### Desafio 3: Alarme Visual
Fazer a página piscar quando tarefa é concluída.

### Desafio 4: Histórico Filtrado
Filtrar histórico por data, status ou categoria.

### Desafio 5: Local Notifications
Usar Notification API em vez de toast.

---

**Fim do Guia de Desenvolvimento**
