type Todos = {
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
    searchByPriority: Function
}

type TodoModalProps = {
    todos: Todos[]
    index: number
    modalPriority: LegacyRef<HTMLSelectElement> | undefined
}
