import React, { useContext } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Tooltip, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { TodoContext } from './todocontext';

export default function Todo({ todo }) {
    const { handleCheck, handleDelete, handleEdit } = useContext(TodoContext);

    const handleEditTask = async () => {
        const { value: newTitle } = await Swal.fire({
            title: 'Edit Task Title',
            input: 'text',
            inputValue: todo.title,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value || value.trim() === "") {
                    return 'Title cannot be empty!';
                }
            }
        });
        if (!newTitle) return;

        const { value: newDescription } = await Swal.fire({
            title: 'Edit Task Description',
            input: 'textarea',
            inputValue: todo.description,
            showCancelButton: true,
        });
        if (newDescription === null) return;

        const { value: newCategory } = await Swal.fire({
            title: 'Edit Task Category',
            input: 'text',
            inputValue: todo.category,
            showCancelButton: true,
        });
        if (newCategory === null) return;

        const { value: newPriority } = await Swal.fire({
            title: 'Edit Task Priority',
            input: 'select',
            inputOptions: {
                High: 'High',
                Medium: 'Medium',
                Low: 'Low'
            },
            inputValue: todo.priority,
            showCancelButton: true,
        });
        if (newPriority === null) return;

        handleEdit(todo.id, newTitle.trim(), newDescription.trim(), newCategory.trim(), newPriority.trim());
    };

    const handleDeleteTask = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            handleDelete(todo.id);
        }
    };

    return (
        <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3, transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "scale(1.02)", boxShadow: 6 }, backgroundColor: 'background.paper' }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3} sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title={todo.completed ? "Uncheck Task" : "Complete Task"}>
                            <IconButton onClick={() => handleCheck(todo.id)} sx={{ color: todo.completed ? "grey.500" : "success.main", "&:hover": { backgroundColor: "success.light" } }}>
                                <CheckIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Task">
                            <IconButton onClick={handleEditTask} sx={{ color: "primary.main", "&:hover": { backgroundColor: "primary.light" } }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Task">
                            <IconButton onClick={handleDeleteTask} sx={{ color: "error.main", "&:hover": { backgroundColor: "error.light" } }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography variant="h6" gutterBottom sx={{ textDecoration: todo.completed ? "line-through" : "none", color: 'text.primary' }}>
                            {todo.title}
                        </Typography>
                        <Typography variant="body2" sx={{ textDecoration: todo.completed ? "line-through" : "none", color: 'text.secondary' }}>
                            {todo.description}
                        </Typography>
                        <Chip label={todo.category} sx={{ mt: 1, mr: 1, backgroundColor: 'primary.dark', color: 'text.primary' }} />
                        <Chip label={todo.priority} sx={{ mt: 1, backgroundColor: 'secondary.dark', color: 'text.primary' }} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}