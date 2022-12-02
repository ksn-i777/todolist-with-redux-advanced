import React from 'react'
import './App.css'
import { Todolist } from './components/Todolist'
import { UniversalAddItemForm } from './components/UniversalAddItemForm'
import { AppBarComponent } from './components/AppBarComponent'
import { Container, Grid, Paper } from '@mui/material';
import { addTodolistAC, removeTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC } from './store/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from './store/store'

export type TodolistFilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    todolistId: string,
    todolistTitle: string,
    todolistFilter: TodolistFilterValuesType,
}

export type TaskType = {
    taskId: string,
    taskTitle: string,
    taskIsDoneStatus: boolean,
}
export type TasksType = {
    [key: string]: Array<TaskType>,
}

export function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<RootStateType, Array<TodolistType>>(state => state.todolists)

    function addTodolist(titleOfNewTodolist:string):void {
        dispatch(addTodolistAC(titleOfNewTodolist))
    }
    function removeTodolist(todolistID:string):void {
        dispatch(removeTodolistAC(todolistID));
    }
    function changeTodolistTitle(todolistID:string, newTodolistTitle:string):void {
        dispatch(changeTodolistTitleAC(todolistID, newTodolistTitle))
    }
    function changeTodolistFilter(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void {
        dispatch(changeTodolistFilterAC(todolistID, newTodolistFilter));
    }

    return (
        <div className="App">
            <AppBarComponent/>
            <Container style={{padding: '30px', margin: '0', maxWidth: '100%'}} fixed>
                <Grid container>
                    <Paper style={{padding: '10px', backgroundColor: ''}} elevation={3}>
                        <Grid item>
                            <div>
                                <h3 style={{margin: '0 0 5px 0'}}>Add new todolist</h3>
                                <UniversalAddItemForm what={'todolist name'} callback={addTodolist}/>
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid style={{marginTop: '30px', justifyContent: 'flex-start', gap: '30px'}} container>
                    {todolists.map(tl => {
                        return (
                            <Paper key={tl.todolistId} style={{padding: '10px'}} elevation={3}>
                                <Grid item>
                                    <Todolist
                                        todolistId={tl.todolistId}
                                        todolistTitle={tl.todolistTitle}
                                        todolistFilter={tl.todolistFilter}

                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTodolistFilter={changeTodolistFilter}
                                    />
                                </Grid>
                            </Paper>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}