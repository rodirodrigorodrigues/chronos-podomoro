import { useEffect, useReducer, useState } from "react";
import { TaskContext } from "./taskContext";
import { initialTaskState } from "./initialTaskState";
import { taskReducer } from "./taskReducer";
import { TimerWorkerSingleton } from "../../workers/timeWorkerSingleton";
import { TaskActionTypes } from "./taskAction";

type TextContextProviderProps = {
  children: React.ReactNode;
};

export function TextContextProvider({ children }: TextContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const worker = TimerWorkerSingleton.getInstance();

  worker.onmessage((e: MessageEvent) => {
    const secondsLeft = e.data;
    if(secondsLeft <= 0) {
      worker.terminate();
      dispatch({ type: TaskActionTypes.COMPLETE_TASK });
    } else {
      dispatch({ type: TaskActionTypes.COUNT_DOWN, payload: { secondsRemaining: secondsLeft } });
    }
  });

  useEffect(() => {
    if(!state.activeTask) {
      worker.terminate();
    }
    worker.postMessage(state);
    // Precisamos vigiar as variáveis dentro do useEffect mesmo que não mudem
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
