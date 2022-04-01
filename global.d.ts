type Todos = {
    id: number
    title: string | undefined
    priority: string | undefined
}

type TableProps = {
    todos: Todos[]
    editTodo: Function
    removeTodo: Function
    searchByTitleInput: LegacyRef<HTMLInputElement> | undefined
    searchByPriorityInput: LegacyRef<HTMLSelectElement> | undefined
    searchByTitle: Function
    priorityValue: any
    handlePriority: any
}

type TodoModalProps = {
    todos: Todos[]
    index: number
    modalPriority: LegacyRef<HTMLSelectElement> | undefined
}

type ChipProps = {
    color: 'primary' | 'error' | 'warning'
    label: string
}

type CreateNewTodoProps = {
    addTodo: any
    inputTitle: LegacyRef<HTMLInputElement> | undefined
    inputPriority: LegacyRef<HTMLSelectElement> | undefined
    selectValue: any
    handleChange: any
}
