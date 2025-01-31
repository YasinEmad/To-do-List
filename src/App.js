import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Todolist from './component/ToDoList';
import { TodoContext } from './component/todocontext';
import { v4 as uuidv4 } from 'uuid';
import './App.css'; // Import the CSS file

// Get initial todos from localStorage or use defaults
const getInitialTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [
        {
            id: uuidv4(),
            title: 'Task 1',
            description: 'This is the first task',
            completed: false,
            category: 'Personal',
            dueDate: null,
            priority: 'Medium',
        },
        {
            id: uuidv4(),
            title: 'Task 2',
            description: 'This is the second task',
            completed: true,
            category: 'Work',
            dueDate: null,
            priority: 'High',
        },
    ];
};

function App() {
    const [todos, setTodos] = useState(getInitialTodos());
    const [themeMode, setThemeMode] = useState('dark'); // Default to dark mode

    // Sync todos with localStorage when updated
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Toggle the completion status of a todo
    const handleCheck = useCallback((id) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);

    // Delete a todo by ID
    const handleDelete = useCallback((id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, []);

    // Edit a todo's title, description, category, and priority by ID
    const handleEdit = useCallback((id, updatedTitle, updatedDescription, updatedCategory, updatedPriority) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, title: updatedTitle, description: updatedDescription, category: updatedCategory, priority: updatedPriority } : todo
            )
        );
    }, []);

    // Toggle theme mode
    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    // Create dark theme
    const theme = createTheme({
        palette: {
            mode: themeMode, // Set theme mode (dark/light)
            background: {
                default: themeMode === 'dark' ? '#121212' : '#ffffff', // Dark background
                paper: themeMode === 'dark' ? '#1e1e1e' : '#ffffff', // Dark card background
            },
            text: {
                primary: themeMode === 'dark' ? '#ffffff' : '#000000', // White text for dark mode
                secondary: themeMode === 'dark' ? '#b3b3b3' : '#666666', // Light gray text for dark mode
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Apply the dark theme to the entire app */}
            <TodoContext.Provider value={{ todos, setTodos, handleCheck, handleDelete, handleEdit, toggleTheme, themeMode }}>
                <div className="app-container"> {/* Apply the background image */}
                    <Todolist />
                </div>
            </TodoContext.Provider>
        </ThemeProvider>
    );
}

export default App;