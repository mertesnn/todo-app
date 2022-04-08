type Todos = {
    id: number
    title: string | undefined
    priority: string | undefined
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

type CreateNewTodoData = {
    id: number
    title: string | undefined
    priority: string | undefined
}

type TodoState = {
    value: Todos[]
}
