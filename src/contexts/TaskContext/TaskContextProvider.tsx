import { useEffect, useState } from "react";
import { TaskContext } from "./taskContext";
import { initialTaskState } from "./initialTaskState";

type TextContextProviderProps = {
  children: React.ReactNode;
};

export function TextContextProvider({ children }: TextContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  useEffect(() => {
    console.log("TaskContext state changed:", state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}
