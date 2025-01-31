import React, { useContext, useState } from 'react';
import { Container, Card, CardContent, Button, Typography, Divider, TextField, IconButton, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';

import ClearIcon from '@mui/icons-material/Clear';
import Todo from './Todo';
import { TodoContext } from './todocontext';
import { v4 as uuidv4 } from 'uuid';

export default function Todolist() {
    const { todos, setTodos, toggleTheme, themeMode } = useContext(TodoContext);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAddTask = () => {
        if (newTaskTitle.trim() === '') return;

        const newTodo = {
            id: uuidv4(),
            title: newTaskTitle,
            description: '',
            completed: false,
            category: 'Personal',
            priority: 'Medium',
        };

        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setNewTaskTitle('');
    };

    const handleClearInput = () => {
        setNewTaskTitle('');
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
                <CardContent>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        My Tasks
                    </Typography>
                    <Tooltip title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}>
                        <Button onClick={toggleTheme} sx={{ mb: 2 }}>
                            {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </Button>
                    </Tooltip>
                    <Divider sx={{ mb: 2 }} />
                    {todos.length === 0 ? (
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                            No tasks yet. Add a new task to get started!
                        </Typography>
                    ) : (
                        todos.map((t) => <Todo key={t.id} todo={t} />)
                    )}
                </CardContent>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                label="New Task"
                                variant="outlined"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                placeholder="Enter a new task..."
                                InputProps={{
                                    endAdornment: newTaskTitle && (
                                        <IconButton onClick={handleClearInput} size="small">
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: 'text.primary',
                                        '& fieldset': {
                                            borderColor: 'text.secondary',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'text.primary',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleAddTask}
                                sx={{ height: '56px' }}
                            >
                                Add Task
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}