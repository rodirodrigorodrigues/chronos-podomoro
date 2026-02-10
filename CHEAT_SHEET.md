# 🎯 Cheat Sheet - Chronos Pomodoro

**Resumo visual para impressão** | Referência rápida durante desenvolvimento

---

## 🚀 Quick Start

```bash
# Instalar
npm install

# Desenvolver
npm run dev
# http://localhost:5173

# Build
npm run build

# Lint
npm run lint
```

---

## 🧩 Estrutura Principal

```
App
 └─ TaskContextProvider (useReducer)
    ├─ Web Worker (Timer)
    ├─ localStorage (Persistence)
    └─ MainRouter
       ├─ Home → MainForm + CountDown
       ├─ History → Tabela
       ├─ Settings → Config
       └─ About → Info
```

---

## 🎨 Componentes Chave

### CountDown
```tsx
const { state } = useTaskContext();
return <div>{state.formattedSecondsRemaining}</div>;
```

### MainForm
```tsx
dispatch(START_TASK) → taskReducer → state atualiza
```

### History
```tsx
Ordenável por qualquer coluna
Status: Concluído | Interrompido
```

### Cycles
```tsx
Dots: 🔵 (foco) 🟢 (pausa) 🟣 (longa)
```

---

## 📊 State Model

```typescript
TaskStateModel {
  tasks: TaskModel[]
  secondsRemaining: number
  formattedSecondsRemaining: "MM:SS"
  activeTask: TaskModel | null
  currentCycle: 1-8 (resets)
  config: {
    workTime: number
    shortBreakTime: number
    longBreakTime: number
  }
}

TaskModel {
  id: string
  name: string
  duration: number (minutos)
  startDate: number
  completeDate: number | null
  interruptDate: number | null
  type: "workTime" | "shortBreakTime" | "longBreakTime"
}
```

---

## 🔄 Actions

| Ação | Payload | Efeito |
|------|---------|--------|
| START_TASK | TaskModel | Inicia tarefa, incrementa ciclo |
| INTERRUPT_TASK | - | Para tarefa |
| COMPLETE_TASK | - | Marca concluída, toca som |
| COUNT_DOWN | { secondsRemaining } | Atualiza a cada 1s |
| RESET_TASK | - | Volta ao inicial |

---

## 📁 Arquivos Críticos

```
src/
├─ App.tsx             ← Root com providers
├─ contexts/TaskContext/
│  ├─ TaskContextProvider.tsx   ← useReducer + Worker
│  ├─ taskReducer.ts            ← State logic
│  ├─ useTaskContext.ts         ← Custom hook
│  └─ initialTaskState.ts       ← Estado inicial
├─ components/
│  ├─ MainForm/                 ← Criar tarefas
│  ├─ CountDown/                ← Timer display
│  ├─ History/                  ← Histórico
│  └─ Cycles/                   ← Indicadores
├─ models/
│  ├─ TaskModel.ts
│  └─ TaskStateModel.ts
├─ utils/
│  ├─ formatSecondsToMinutes.ts
│  ├─ getNextCycle.ts
│  └─ getNextCycleType.ts
└─ workers/
   ├─ timeWorkerSingleton.ts
   └─ timeWorker.js
```

---

## 🔀 Fluxo: Criar Tarefa

```
1. User digita + click ▶️
2. MainForm.handleCreateNewTask()
3. Valida input
4. Cria TaskModel
5. dispatch({ type: START_TASK, payload: newTask })
6. taskReducer calcula:
   - nextCycle = getNextCycle(current)
   - duration = config[nextCycleType]
   - secondsRemaining = duration * 60
7. useEffect([state]):
   - localStorage.setItem()
   - worker.postMessage(state)
8. Web Worker:
   - Calcula endDate
   - Tick a cada 1000ms
   - postMessage(secondsLeft)
9. TaskContextProvider.onmessage:
   - dispatch(COUNT_DOWN)
   - UI atualiza
10. Quando secondsLeft <= 0:
    - playBeep()
    - dispatch(COMPLETE_TASK)
    - worker.terminate()
```

---

## 🔧 Utilities

```typescript
// Converter segundos para MM:SS
formatSecondsToMinutes(125) → "02:05"

// Próximo ciclo (1-8)
getNextCycle(0) → 1
getNextCycle(8) → 1 (reset)

// Tipo do próximo ciclo
getNextCycleType(2) → "shortBreakTime"
getNextCycleType(1) → "workTime"

// Formatar data
formatDate(1707599400000) → "13/02/2026 23:31"

// Tocar som
const playBeep = loadBeep();
playBeep();

// Notificações
showMessage.success("OK")
showMessage.error("Erro")
showMessage.warn("Aviso")
showMessage.info("Info")
```

---

## 🎯 Usando Context em Componentes

```tsx
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { TaskActionTypes } from "../../contexts/TaskContext/taskAction";

export function MyComponent() {
  const { state, dispatch } = useTaskContext();
  
  // Ler estado
  console.log(state.formattedSecondsRemaining);
  console.log(state.activeTask?.name);
  
  // Disparar ação
  dispatch({
    type: TaskActionTypes.START_TASK,
    payload: newTask
  });
  
  return <div>{state.tasks.length} tarefas</div>;
}
```

---

## 🚀 Adicionar Nova Action

```typescript
// 1. taskAction.ts
enum TaskActionTypes {
  MY_ACTION = "MY_ACTION"
}

type MyActionType = {
  type: TaskActionTypes.MY_ACTION;
  payload: { /* dados */ };
}

// 2. taskReducer.ts
case TaskActionTypes.MY_ACTION: {
  return {
    ...state,
    // modificações
  };
}

// 3. Em componente
dispatch({
  type: TaskActionTypes.MY_ACTION,
  payload: { /* dados */ }
});
```

---

## 📝 Adicionar Novo Componente

```tsx
// 1. src/components/MyComponent/index.tsx
import styles from "./styles.module.css";

export function MyComponent() {
  const { state } = useTaskContext();
  return <div className={styles.container}>{state.tasks.length}</div>;
}

// 2. src/components/MyComponent/styles.module.css
.container {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

// 3. Usar em uma página
import { MyComponent } from "../../components/MyComponent";

<Container><MyComponent /></Container>
```

---

## 🗺 Adicionar Nova Rota

```tsx
// 1. Criar página: src/Pages/MyPage/index.tsx
export function MyPage() {
  return <MainTemplate><Container>...</Container></MainTemplate>;
}

// 2. Atualizar router: src/routers/MainRouter/index.tsx
import { MyPage } from "../../Pages/MyPage";

<Route path="/mypage" element={<MyPage />} />

// 3. Adicionar link no Menu
<Link to="/mypage">My Page</Link>
```

---

## 🐛 Debugar

```javascript
// Console
JSON.parse(localStorage.getItem("state"))
localStorage.clear()

// DevTools
- React Components: Procure TaskContextProvider
- Network: Sem requisições (offline)
- Performance: Procure long tasks
- Console: console.log() do código
```

---

## ⚡ Padrões

### ✅ BOM
```tsx
// Use Context via hook
const { state, dispatch } = useTaskContext();

// Imutabilidade
return { ...state, tasks: [...state.tasks, newTask] };

// CSS Modules
import styles from "./styles.module.css";
<div className={styles.container}></div>

// Types tipados
dispatch({
  type: TaskActionTypes.START_TASK,
  payload: newTask
});

// Acessibilidade
<button aria-label="Start" title="Start task">▶</button>
```

### ❌ EVITAR
```tsx
// Mutação
state.tasks[0].name = "New";

// Inline styles grandes
<div style={{background: "...", color: "..."}}>

// Strings sem tipos
dispatch({ type: "START_TASK" });

// Sem labels/aria
<button>▶</button>

// CSS global
<button className="button">
```

---

## 🎨 Ciclos Pomodoro

```
Padrão de 8 ciclos:

1. Foco          (workTime)
2. Pausa Curta   (shortBreakTime)
3. Foco          (workTime)
4. Pausa Curta   (shortBreakTime)
5. Foco          (workTime)
6. Pausa Curta   (shortBreakTime)
7. Foco          (workTime)
8. Pausa Longa   (longBreakTime)
↓ reset
1. Foco...

Lógica:
  if (cycle % 8 === 0) → longBreakTime
  if (cycle % 2 === 0) → shortBreakTime
  else → workTime
```

---

## 💾 localStorage

```javascript
// Salvar
localStorage.setItem("state", JSON.stringify(state))

// Carregar
const stored = JSON.parse(localStorage.getItem("state"))

// Limpar
localStorage.removeItem("state")
localStorage.clear()

// Ver tudo
console.log(localStorage)

// Tamanho
new Blob(Object.values(localStorage)).size
```

---

## 📱 Rotas

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | Home | Timer + create task |
| `/history` | History | Histórico com sort |
| `/settings` | Settings | Configurações |
| `/about-pomodoro` | AboutPomodoro | Info |
| `*` | NotFound | 404 |

---

## 🔌 Dependências Principais

```json
{
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "react-router": "7.13.0",
  "react-toastify": "11.0.5",
  "date-fns": "4.1.0",
  "lucide-react": "0.561.0"
}
```

---

## 📊 Task Status

```typescript
// Tarefa pode estar em um desses estados:

✅ Concluído
  → task.completeDate !== null
  → showMessage.success("Concluído")

⏸️ Ativa
  → state.activeTask === task
  → Timer rodando

❌ Interrompida
  → task.interruptDate !== null
  → showMessage.error("Interrompido")

🔸 Planejada/Futura
  → Não existe ainda no código
  → Possível feature futura
```

---

## 🌍 Acessibilidade

```tsx
// ✅ Sempre adicione
<button
  aria-label="Descrição clara"
  title="Dica do hover"
  onClick={handler}
>
  ▶
</button>

<label htmlFor="input">Label</label>
<input id="input" />

// Validar contraste
// Testar com teclado
// Testar com screen reader
```

---

## 🚀 Deploy

```bash
# Vercel (recomendado)
npm i -g vercel
vercel deploy --prod

# Netlify
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir dist

# GitHub Pages
npm run build
# Enviar dist/ para gh-pages
```

---

## ✅ Antes do Deploy

- [ ] `npm run lint` sem erros
- [ ] `npm run build` sem erros
- [ ] Teste create tarefa
- [ ] Teste histórico
- [ ] Teste localStorage (reload)
- [ ] Teste som
- [ ] Teste mobile (DevTools)
- [ ] Remova console.log() debug
- [ ] Atualize versão em package.json

---

## 📚 Documentação Disponível

- **INDICE_DOCUMENTACAO.md** - Índice principal
- **DOCUMENTACAO_COMPLETA.md** - Referência técnica completa
- **ARQUITETURA_E_DIAGRAMAS.md** - Diagramas visuais e fluxos
- **GUIA_DESENVOLVIMENTO.md** - Como desenvolver e estender
- **FAQ_E_REFERENCIA.md** - FAQ e referência rápida
- **CHEAT_SHEET.md** - Este arquivo!

---

## 📞 Quick Links

| Necessidade | Link |
|----------|------|
| Iniciar rápido | GUIA_DESENVOLVIMENTO.md |
| Entender arquitetura | ARQUITETURA_E_DI​AGRAMAS.md |
| Dúvida rápida | FAQ_E_REFERENCIA.md |
| Referência técnica | DOCUMENTACAO_COMPLETA.md |
| Este resumo | CHEAT_SHEET.md |

---

## 🎓 Estado do Projeto

- **Versão:** 0.0.0
- **Status:** Desenvolvimento
- **Data:** 10/02/2026
- **Cobertura Docs:** 95%+
- **Componentes:** 15+
- **Rotas:** 5
- **Actions:** 5

---

**Pronto para começar? → Rode `npm run dev` e bom desenvolvimento!** 🚀

