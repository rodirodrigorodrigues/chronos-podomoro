# ❓ FAQ e Referência Rápida - Chronos Pomodoro

## 🎯 FAQ - Perguntas Frequentes

### Geral

#### P: O que é o Chronos Pomodoro?
R: É uma aplicação web que implementa a técnica Pomodoro para gerenciamento de tempo e produtividade. Combina timer, histórico de tarefas e configurações personalizáveis.

#### P: É necessário estar conectado à internet?
R: Não! A aplicação funciona completamente offline. Os dados são salvos no localStorage do navegador.

#### P: Meus dados serão perdidos?
R: Seus dados são salvos localmente no navegador. Eles serão perdidos se você:
- Limpar cache/cookies do navegador
- Usar modo privado/anônimo
- Desinstalar/atualizar o navegador
- Manualmente limpar localStorage

Para evitar perda, considere:
- Manter a aba aberta
- Não limpar cookies frequentemente
- Implementar sincronização com servidor (futuro)

---

### Funcionalidades

#### P: Como crio uma tarefa?
R: 
1. Na Home (`/`), digite o nome da tarefa no input
2. Clique no botão verde (▶) ou pressione Enter
3. O timer iniciará automat​icamente

#### P: Como interrompo uma tarefa?
R: Clique no botão vermelho (⏹) enquanto a tarefa está ativa.

#### P: O timer continua se eu fechar a aba?
R: Não. O Worker é descartado quando a página fecha. Você pode:
- Manter a aba aberta
- Criar uma Tarefa em background (PWA - futuro)

#### P: Como reseto tudo?
R: No Histórico (`/history`), clique em "Limpar Histórico" e confirme.

#### P: Posso editar configurações depois?
R: Sim! Em Configurações (`/settings`), ajuste:
- Duração do foco
- Duração da pausa curta
- Duração da pausa longa
Clique em "Salvar"

#### P: O timer é preciso?
R: É aproximado em ±1 segundo. O Web Worker calcula baseado em timestamps, não é 100% preciso mas é aceitável para Pomodoro.

---

### Técnica Pomodoro

#### P: O que é a técnica Pomodoro?
R: É um método de gerenciamento de tempo que alterna:
- 25 min de trabalho intenso
- 5 min de pausa
- Após 4 ciclos de foco: pausa longa (15-30 min)

Este projeto usa duração padrão de 1 minuto para testes.

#### P: Por que 8 ciclos?
R: Padrão estabelecido:
- Ciclos 1, 3, 5, 7: Foco
- Ciclos 2, 4, 6: Pausa curta
- Ciclo 8: Pausa longa

Essa estrutura maximiza produtividade com descanso adequado.

#### P: Posso customizar os ciclos?
R: Não ainda. Está na lista de melhorias futuras. Por enquanto, fixo em 8 ciclos.

---

### Dados e Persistência

#### P: Onde são salvos meus dados?
R: No `localStorage` do navegador.
- **Key:** `"state"`
- **Formato:** JSON
- **Localização:** Dados locais do navegador

#### P: Posso exportar meus dados?
R: Atualmente não há função de export. Você pode manualmente:

```javascript
// No console:
copy(localStorage.getItem("state"))
// Cole em um arquivo .txt
```

#### P: Como faço backup?
R: Opções:
1. Captura de tela do histórico
2. Copy-paste via console (acima)
3. Sincronização com servidor (futuro)

---

### Problemas e Erros

#### P: O som não toca!

**Possíveis causas:**
- Volume do dispositivo no mute
- Navegador bloqueou áudio
- Arquivo de áudio ausente

**Solver:**
1. Verifique volume
2. Permita áudio no navegador (DevTools > Permissions)
3. Verifique se arquivo existe em `src/assets/audios/`

#### P: Historic desapareceu após recarregar!

**Possível causa:** localStorage foi limpo

**Solver:**
1. Verifique em DevTools > Application > LocalStorage
2. Teste em nova aba
3. Teste em outro navegador

#### P: Timer não para quando atinge 00:00!

**Possível causa:** Bug no Web Worker

**Solver:**
1. Recarregue a página
2. Limpe cache do navegador
3. Tente em outro navegador

#### P: Input fica desabilitado mesmo após completar!

**Possível causa:** activeTask não foi limpo

**Solver:**
1. Herd está travada - espere o timer terminar
2. Clique em ⏹ se comportar errado
3. Recarregue a página

---

## 🔍 Referência Rápida

### Arquivos Chave

| Arquivo | Linha | Propósito |
|---------|------|-----------|
| [src/App.tsx](src/App.tsx) | - | Root component com providers |
| [src/main.tsx](src/main.tsx) | - | Entry point |
| [src/contexts/TaskContext/TaskContextProvider.tsx](src/contexts/TaskContext/TaskContextProvider.tsx) | - | Global state management |
| [src/contexts/TaskContext/taskReducer.ts](src/contexts/TaskContext/taskReducer.ts) | - | State logic |
| [src/components/MainForm/index.tsx](src/components/MainForm/index.tsx) | - | Task creation logic |
| [src/components/History/index.tsx](src/components/History/index.tsx) | - | Task history display |
| [src/workers/timeWorkerSingleton.ts](src/workers/timeWorkerSingleton.ts) | - | Timer instance mgmt |
| [src/workers/timeWorker.js](src/workers/timeWorker.js) | - | Background countdown |
| [src/models/TaskStateModel.ts](src/models/TaskStateModel.ts) | - | Type definitions |

### Rotas Disponíveis

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | [src/Pages/Home/index.tsx](src/Pages/Home/index.tsx) | Timer principal e criar tarefas |
| `/history` | [src/components/History/index.tsx](src/components/History/index.tsx) | Visualizar histórico |
| `/settings` | [src/Pages/Settings/index.tsx](src/Pages/Settings/index.tsx) | Configurar durations |
| `/about-pomodoro` | [src/components/AboutPomodoro/index.tsx](src/components/AboutPomodoro/index.tsx) | Sobre a técnica |
| `*` | [src/components/NotFound/index.tsx](src/components/NotFound/index.tsx) | Página 404 |

### Componentes Principais

| Componente | Arquivo | Props | Função |
|-----------|---------|-------|--------|
| `CountDown` | [src/components/CountDown/](src/components/CountDown/) | - | Exibe timer MM:SS |
| `MainForm` | [src/components/MainForm/](src/components/MainForm/) | - | Forma criar tarefa |
| `History` | [src/components/History/](src/components/History/) | - | Tabela histórico |
| `Cycles` | [src/components/Cycles/](src/components/Cycles/) | - | Indicadores visuais |
| `DefaultButton` | [src/components/DefaultButton/](src/components/DefaultButton/) | `color`, `icon`, `onClick` | Botão genérico |
| `DefaultInput` | [src/components/DefaultInput/](src/components/DefaultInput/) | `id`, `labelText`, `type` | Input genérico |
| `Container` | [src/components/Container/](src/components/Container/) | `children` | Wrapper max-width |
| `Heading` | [src/components/Heading/](src/components/Heading/) | `children` | Título |
| `Menu` | [src/components/Menu/](src/components/Menu/) | - | Navegação |
| `Footer` | [src/components/Footer/](src/components/Footer/) | - | Rodapé |

### Utilities

| Função | Arquivo | Input | Output | Exemplo |
|--------|---------|-------|--------|---------|
| `formatSecondsToMinutes` | [src/utils/formatSecondsToMinutes.ts](src/utils/formatSecondsToMinutes.ts) | `seconds: number` | `"MM:SS"` | `formatSecondsToMinutes(125)` → `"02:05"` |
| `formatDate` | [src/utils/formatDate.ts](src/utils/formatDate.ts) | `timestamp: number` | `"DD/MM/YYYY HH:mm"` | Veja implementação |
| `getNextCycle` | [src/utils/getNextCycle.ts](src/utils/getNextCycle.ts) | `cycle: number` | `1-8` | `getNextCycle(0)` → `1` |
| `getNextCycleType` | [src/utils/getNextCycleType.ts](src/utils/getNextCycleType.ts) | `cycle: number` | `"workTime"\|"shortBreakTime"\|"longBreakTime"` | `getNextCycleType(2)` → `"shortBreakTime"` |
| `getTaskStatus` | [src/utils/getTaskStatus.ts](src/utils/getTaskStatus.ts) | `task: TaskModel` | `"Concluído"\|"Interrompido"` | Veja implementação |
| `loadBeep` | [src/utils/loadBeep.ts](src/utils/loadBeep.ts) | - | `() => void` | Retorna função para tocar som |

### Task Actions

| Ação | Type | Payload | Efeito |
|------|------|---------|--------|
| Start Task | `START_TASK` | `TaskModel` | Inicia nova tarefa, incrementa ciclo |
| Interrupt | `INTERRUPT_TASK` | - | Para tarefa, marca como interrompida |
| Complete | `COMPLETE_TASK` | - | Marca como concluída, toca som |
| Count Down | `COUNT_DOWN` | `{ secondsRemaining }` | Atualiza timer a cada segundo |
| Reset | `RESET_TASK` | - | Volta ao estado inicial |

### TypeScript Types

| Type | Arquivo | Definição |
|------|---------|-----------|
| `TaskModel` | [src/models/TaskModel.ts](src/models/TaskModel.ts) | Uma tarefa individual |
| `TaskStateModel` | [src/models/TaskStateModel.ts](src/models/TaskStateModel.ts) | Estado global completo |
| `TaskActionModel` | [src/contexts/TaskContext/taskAction.ts](src/contexts/TaskContext/taskAction.ts) | Type de action para reducer |
| `TaskActionTypes` | [src/contexts/TaskContext/taskAction.ts](src/contexts/TaskContext/taskAction.ts) | Enum de ações |

---

## 🎨 CSS Classes (Úteis)

### Globais

```css
/* From global.css */
body {}
* {}
html {}

/* From theme.css */
:root {} /* CSS variables */
```

### Por Componente

Cada componente tem seu próprio `styles.module.css`:
- `src/components/CountDown/styles.module.css`
- `src/components/MainForm/styles.module.css` (vazio)
- `src/components/Cycles/styles.module.css`
- `src/components/DefaultButton/styles.module.css`
- `src/components/DefaultInput/styles.module.css`
- `src/components/Container/styles.module.css`
- `src/components/Footer/styles.module.css`
- `src/components/History/styles.module.css`
- `src/components/Heading/styles.module.css`
- `src/components/GenericHtml/styles.module.css`
- `src/components/Menu/styles.module.css`

---

## 🎬 Ciclo de Vida Simplificado

```
Usuário cria tarefa
    ↓
dispatch(START_TASK)
    ↓
taskReducer atualiza state
    ↓
Component re-renderiza com novo state
    ↓
useEffect([state]) executa:
  - localStorage.setItem()
  - worker.postMessage()
    ↓
Web Worker começa countdown
    ↓
A cada segundo: worker.postMessage(secondsLeft)
    ↓
TaskContextProvider.onmessage recebe
    ↓
dispatch(COUNT_DOWN) e state.secondsRemaining diminui
    ↓
UI re-renderiza timer
    ↓
Quando secondsLeft <= 0:
  - playBeep()
  - dispatch(COMPLETE_TASK)
  - worker.terminate()
    ↓
Fim
```

---

## 🔧 Comandos DevTools

### Console

```javascript
// Ver estado global
JSON.parse(localStorage.getItem("state"))

// Limpar localStorage
localStorage.removeItem("state")
localStorage.clear()

// Monitorar localStorage
// (DevTools > Application > LocalStorage)

// Ver todas as keys
Object.keys(localStorage)

// Tamanho aproximado
new Blob(Object.values(localStorage)).size
```

### Network

```
DevTools > Network
- Verifique requisições ao abrir
- Verifique tamanho do bundle
- Não deve haver requisições (offline app)
```

### Performance

```
DevTools > Performance
1. Record
2. Execute ação
3. Stop
4. Analise:
   - Long Tasks
   - Frame rate
   - Memory usage
```

### React

```
DevTools > React Components
- Procure por TaskContextProvider
- Inspecione state
- Veja re-renders
```

---

## 📦 Dependências Importantes

### Direct Dependencies

```
react@19.2.0              Gerenciamento de UI
react-dom@19.2.0          Renderização no DOM
react-router@7.13.0       Roteamento SPA
react-toastify@11.0.5     Notificações toast
date-fns@4.1.0            Utilitários de data (pode se usado mais)
lucide-react@0.561.0      Ícones SVG
```

### Dev Dependencies

```
typescript@5.9.3          Tipagem estática
vite@7.2.4                Build tool
eslint@9.39.1             Linting
@vitejs/plugin-react-swc  Fast refresh com SWC
```

---

## ⚡ Performance Tips

1. **Usar React DevTools Profiler**
   - Identifique re-renders desnecessários
   - Use `useMemo` se needed

2. **Lazy Load Routes**
   ```typescript
   const History = lazy(() => import("../../components/History"));
   ```

3. **Optimize CSS**
   - CSS Modules evitam conflito
   - Use media queries para responsive

4. **Bundle Size**
   - Analise com `npm run build` e `npm preview`
   - Considere tree-shaking de dependências

5. **localStorage vs IndexedDB**
   - localStorage: OK para estado pequeno
   - IndexedDB: Necessário se crescer muito

---

## 🔐 Segurança

### O Que Está Seguro

✅ Dados no localStorage (usuário local)
✅ sem requisições HTTP (nenhuma exposição)
✅ sem credenciais armazenadas
✅ Web Worker isolado (sem acesso ao DOM)

### O Que Falta (para privado total)

❌ Sincronização com servidor
❌ Autenticação de usuário
❌ Criptografia de dados
❌ Controle de acesso

### Recomendações

- Não armazene dados sensíveis
- Use HTTPS se deployar com backend
- Implemente autenticação se necessário
- Valide entrada do usuário sempre

---

## 🌍 Acessibilidade (WCAG)

Implementações presentes:

✅ `aria-label` em botões
✅ `title` attributes para tooltips
✅ Navegação via teclado (form)
✅ Cores com bom contraste
✅ Fonte legível
✅ Sem autoplay de audio

Melhorias recomendadas:

⚠️ Adicionar `tabindex` estratégico
⚠️ Testar com screen reader
⚠️ Melhorar contrast ratio WCAG AAA
⚠️ Adicionar skip links

---

## 📱 Compatibilidade

### Navegadores Suportados

| Navegador | Versão | Status |
|-----------|--------|--------|
| Chrome | 90+ | ✅ Completo |
| Firefox | 88+ | ✅ Completo |
| Safari | 14+ | ✅ Completo |
| Edge | 90+ | ✅ Completo |
| Internet Explorer | Qualquer | ❌ Não suportado |

### Recursos Requeridos

- JavaScript habilitado
- localStorage habilitado
- Web Workers
- ES2020+ support

### Mobile

- Responsivo em 320px+
- Touch-friendly (botões 44px+)
- Funcional em modo portrait e landscape

---

## 🚀 Próximas Features

Based em observações do código:

1. **UPDATE_CONFIG Action** - Configurações funcionam na UI mas não salvam
2. **Categorias** - Agrupar tarefas por tipo
3. **Estatísticas** - Dashboard com gráficos
4. **PWA** - Instalável como app
5. **Dark Mode** - Tema escuro
6. **Sincronização** - Cloud backup
7. **Notificações** - Sistema de alertas
8. **Mobile App** - React Native version

---

## 📋 Checklistde Funcionalidades

### MVP (Atual)

- ✅ Timer funcionando
- ✅ Criar tarefas
- ✅ Histórico
- ✅ Ciclos visuais
- ✅ Persistência
- ✅ Som
- ✅ Notificações toast

### Phase 2

- ⏳ Editar tarefa
- ⏳ Deletar tarefa individual
- ⏳ Filtros no histórico
- ⏳ Estatísticas
- ⏳ Configurações persistem

### Phase 3

- ⏳ PWA
- ⏳ Dark mode
- ⏳ Cloud sync
- ⏳ Mobile app
- ⏳ Notificações sistema

---

## 🎓 Recursos para Aprender

### React Concepts
- [Hooks](https://react.dev/reference/react)
- [Context API](https://react.dev/reference/react/useContext)
- [useReducer](https://react.dev/reference/react/useReducer)

### TypeScript
- [Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### Web APIs
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## 📞 Support & Community

Para dúvidas:

1. Verifique `DOCUMENTACAO_COMPLETA.md`
2. Verifique `ARQUITETURA_E_DIAGRAMAS.md`
3. Verifique `GUIA_DESENVOLVIMENTO.md`
4. Procure no código com comentários

---

**Última atualização:** 10/02/2026
**Versão:** 0.0.0
**Status:** Em Desenvolvimento
