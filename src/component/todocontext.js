
import { createContext } from 'react';

export const TodoContext = createContext({
    todos: [],
    setTodos: () => {}, // Placeholder for setTodos function
    handleCheck: () => {},
    handleDelete: () => {},
    handleEdit: () => {},
});
