import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { compare, debounce } from './Utils/Functions'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EditTodoModal from './Components/EditTodoModal'

const App = () => {
    const [todos, setTodos] = useState<Todos[]>([])
    const inputTitle = useRef<HTMLInputElement | null>(null)
    const inputPriority = useRef<HTMLSelectElement | null>(null)
    const modalPriority = useRef<HTMLSelectElement | null>(null)
    const { handleSubmit } = useForm<Todos>()
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        const existingTodos = localStorage.getItem('todos')
        setTodos(existingTodos ? JSON.parse(existingTodos) : [])
    }, [])

    const addTodo: SubmitHandler<Todos> = () => {
        const insert = [
            ...todos,
            {
                title: inputTitle?.current?.value,
                priority: inputPriority?.current?.value,
            },
        ]

        // Sort Todos
        insert.sort(compare)

        // Save Todos
        setTodos(insert)
        localStorage.setItem('todos', JSON.stringify(insert))

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
            setTodos([...todos])
            localStorage.setItem('todos', JSON.stringify([...todos]))
            await MySwal.fire({
                title: 'Success',
                text: 'Updated successfully!',
                icon: 'success',
            })
        }
    }

    return (
        <>
            <div className="header">
                <h1>Logo</h1>
                <hr />
            </div>
            <div className="newJob">
                <h2>Create New Job</h2>
                <hr />
                <form onSubmit={handleSubmit(debounce(addTodo, 1000))}>
                    <label htmlFor="jobName">Job Name</label>
                    <input type="text" id="jobName" ref={inputTitle} />
                    <label htmlFor="jobPriority">Job Priority</label>
                    <select ref={inputPriority} id="jobPriority">
                        <option value="0">Choose</option>
                        <option value="1">Urgent</option>
                        <option value="2">Regular</option>
                        <option value="3">Trivial</option>
                    </select>
                    <button type="submit">Create</button>
                </form>
            </div>
            <div className="jobList">
                <h2>Job List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos &&
                            todos.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.title}</td>
                                    <td>
                                        {item?.priority === '1'
                                            ? 'Urgent'
                                            : item?.priority === '2'
                                            ? 'Regular'
                                            : 'Trivial'}
                                    </td>
                                    <td>
                                        <button onClick={() => editTodo(index)}>
                                            <FaPencilAlt />
                                        </button>
                                        <button
                                            onClick={() => removeTodo(index)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App
