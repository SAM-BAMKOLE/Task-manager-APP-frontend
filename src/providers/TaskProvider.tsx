import { createContext } from "react";
import { TaskType } from "../types/taskTypes";
import { useReducer } from "react";

interface taskCtx {
    tasks: Array<TaskType | null>;
    addTask(task: TaskType): void;
    setTasks(tasks: TaskType[]): void;
}

export const TaskContext = createContext<taskCtx | null>(null);

type TaskAction =
    | { type: "ADD_TASK"; payload: TaskType }
    | { type: "SET_TASKS"; payload: TaskType[] };

function taskReducer(state: TaskType[], action: TaskAction) {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload];
        case "SET_TASKS":
            return [...state, ...action.payload];
    }
}

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, dispatch] = useReducer(taskReducer, []);

    function addTask(task: TaskType) {
        dispatch({ type: "ADD_TASK", payload: task });
    }
    function setTasks(tasks: TaskType[]) {
        dispatch({ type: "SET_TASKS", payload: tasks });
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, setTasks }}>{children}</TaskContext.Provider>
    );
};

export default TaskProvider;
