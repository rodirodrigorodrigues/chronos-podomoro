import { useEffect, useReducer, useState } from "react";
import { TaskContext } from "./taskContext";
import { initialTaskState } from "./initialTaskState";

type TextContextProviderProps = {
  children: React.ReactNode;
};

export function TextContextProvider({ children }: TextContextProviderProps) {
  const [state, setState] = useState(initialTaskState);
  const [number, dispatch] = useReducer((state, action) => {
    switch (action) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
      default:
        return state;
    }
  }, 0); // Initial state is 0

  // useEffect(() => {
  //   console.log("TaskContext state changed:", state);
  // }, [state]);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {/* {children} */}
      <h1>Testando: {number}</h1>
      <button onClick={() => dispatch('increment')}>INCREMENT +</button>
      <button onClick={() => dispatch('decrement')}>DECREMENT -</button>
    </TaskContext.Provider>
  );
}
