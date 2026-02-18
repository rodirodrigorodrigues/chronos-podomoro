import type { TaskModel } from "../../models/TaskModel";
import type { TaskStateModel } from "../../models/TaskStateModel";

export const TaskActionTypes = {
  START_TASK: "START_TASK",
  INTERRUPT_TASK: "INTERRUPT_TASK",
  RESET_TASK: "RESET_TASK",
  COUNT_DOWN: "COUNT_DOWN",
  COMPLETE_TASK: "COMPLETE_TASK",
  CHANGE_SETTINGS: "CHANGE_SETTINGS",
} as const;

type TaskActionWithPayload =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionTypes.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: typeof TaskActionTypes.CHANGE_SETTINGS;
      payload: TaskStateModel["config"];
    }

type TaskActionWithoutPayload =
  | { type: typeof TaskActionTypes.RESET_TASK }
  | { type: typeof TaskActionTypes.INTERRUPT_TASK }
  | { type: typeof TaskActionTypes.COMPLETE_TASK };

export type TaskActionModel = TaskActionWithPayload | TaskActionWithoutPayload;
