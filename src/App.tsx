import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { compare, debounce, getTodos } from './Utils/Functions'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EditTodoModal from './Components/EditTodoModal'
import { priority } from './Utils/Constants'
import Table from './Components/Table'
import { Container, GlobalStyles } from './Styles/Main'
import Header from './Components/Header'

const App = () => {
    const [todos, setTodos] = useState<Todos[]>([])
    const inputTitle = useRef<HTMLInputElement | null>(null)
    const inputPriority = useRef<HTMLSelectElement | null>(null)
    const modalPriority = useRef<HTMLSelectElement | null>(null)
    const searchByTitleInput = useRef<HTMLInputElement | null>(null)
    const searchByPriorityInput = useRef<HTMLSelectElement | null>(null)
    const { handleSubmit } = useForm<Todos>()
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        setTodos(getTodos())
    }, [])

    const addTodo: SubmitHandler<Todos> = () => {
        const insert = [
            ...todos,
            {
                title: inputTitle?.current?.value,
                priority: inputPriority?.current?.value,
            },
        ]

        // Save Todos
        setTodos(compare(insert))
        localStorage.setItem('todos', JSON.stringify(compare(insert)))

        // Clear inputs
        if (inputTitle.current?.value) inputTitle.current.value = ''
        if (inputPriority.current?.value) inputPriority.current.value = '0'
    }

    const removeTodo = async (index: number) => {
        await MySwal.fire({
            title: <strong>Are you sure you want to delete it?</strong>,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Approve',
            width: '600px',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const newTodos: Todos[] = []

                todos.forEach((item, i) => {
                    if (i !== index) newTodos.push(item)
                })

                setTodos(newTodos)
                localStorage.setItem('todos', JSON.stringify(newTodos))

                await MySwal.fire({
                    title: 'Success',
                    text: 'Deleted successfully!',
                    icon: 'success',
                })
            }
        })
    }

    const editTodo = async (index: number) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Job Edit',
            width: '600px',
            html: (
                <EditTodoModal
                    todos={todos}
                    index={index}
                    modalPriority={modalPriority}
                />
            ),
            confirmButtonText: 'Save',
            showCancelButton: true,
            reverseButtons: true,
            preConfirm: () => [modalPriority?.current?.value],
        })

        if (formValues) {
            todos[index]!.priority = formValues[0]

            setTodos(compare(todos))
            localStorage.setItem('todos', JSON.stringify(compare(todos)))
            await MySwal.fire({
                title: 'Success',
                text: 'Updated successfully!',
                icon: 'success',
            })
        }
    }

    const searchByTitle = () => {
        const allTodos: Todos[] = getTodos()
        const searchKey = searchByTitleInput?.current?.value

        setTodos(
            allTodos &&
                allTodos.filter((item) =>
                    item?.title
                        ?.toLowerCase()
                        ?.includes(searchKey ? searchKey?.toLowerCase() : '')
                )
        )
    }

    const searchByPriority = () => {
        const allTodos: Todos[] = getTodos()
        const searchKey = searchByPriorityInput?.current?.value

        setTodos(
            allTodos &&
                allTodos.filter((item) =>
                    item?.priority?.includes(searchKey ? searchKey : '')
                )
        )
    }

    return (
        <Container>
            <GlobalStyles />
            <Header />
            <div className="newJob">
                <h2>Create New Job</h2>
                <form onSubmit={handleSubmit(debounce(addTodo, 1000))}>
                    <label htmlFor="jobName">Job Name</label>
                    <input type="text" id="jobName" ref={inputTitle} />
                    <label htmlFor="jobPriority">Job Priority</label>
                    <select ref={inputPriority} id="jobPriority">
                        <option value="">Choose</option>
                        {priority &&
                            priority.map((item) => (
                                <option key={item?.value} value={item?.value}>
                                    {item?.text}
                                </option>
                            ))}
                    </select>
                    <button type="submit">Create</button>
                </form>
            </div>
            <Table
                todos={todos}
                editTodo={editTodo}
                removeTodo={removeTodo}
                searchByPriority={searchByPriority}
                searchByPriorityInput={searchByPriorityInput}
                searchByTitle={searchByTitle}
                searchByTitleInput={searchByPriorityInput}
            />
        </Container>
    )
}

export default App
