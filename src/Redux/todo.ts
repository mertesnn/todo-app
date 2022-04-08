import { createSlice } from '@reduxjs/toolkit'

const initialState: TodoState = {
    value: [],
}

export const todo = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodo: (state, action) => {
            state.value = action?.payload
        },
    },
})

export const { setTodo } = todo.actions

export default todo.reducer
