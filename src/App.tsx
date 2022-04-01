import { useEffect, useRef, useState } from 'react'
import { compare, getTodos } from './Utils'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EditTodoModal from './Components/EditTodoModal'
import Table from './Components/Table'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Container, SelectChangeEvent } from '@mui/material'
import { GlobalStyles } from './Styles'
import CreateNewTodo from './Components/CreateNewTodo'

const App = () => {
    const [todos, setTodos] = useState<Todos[]>([])
    const [selectValue, setSelectValue] = useState<string>('')
    const [priorityValue, setPriorityValue] = useState<string>('')
    const inputTitle = useRef<HTMLInputElement | null>(null)
    const inputPriority = useRef<HTMLSelectElement | null>(null)
    const modalPriority = useRef<HTMLSelectElement | null>(null)
    const searchByTitleInput = useRef<HTMLInputElement | null>(null)
    const searchByPriorityInput = useRef<HTMLSelectElement | null>(null)

    const MySwal = withReactContent(Swal)

    useEffect(() => {
        setTodos(getTodos())
    }, [])

    const addTodo: Function = () => {
        const uniqueId = new Date().getTime()
        let insert: Todos[]
        if (todos) {
            insert = [
                ...todos,
                {
                    id: uniqueId,
                    title: inputTitle?.current?.value,
                    priority: inputPriority?.current?.value,
                },
            ]
        } else {
            insert = [
                {
                    id: uniqueId,
                    title: inputTitle?.current?.value,
                    priority: inputPriority?.current?.value,
                },
            ]
        }
        // Save Todos
        setTodos(compare(insert))
        localStorage.setItem('todos', JSON.stringify(compare(insert)))

        // Clear inputs
        if (inputTitle.current?.value) inputTitle.current.value = ''
        if (selectValue) setSelectValue('')
    }

    const removeTodo = async (index: number) => {
        await MySwal.fire({
            title: <strong>Are you sure you want to delete it?</strong>,
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Approve',
            confirmButtonColor: '#d32f2f',
            width: '600px',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const newTodos: Todos[] = []

                todos.forEach((item) => {
                    if (item?.id !== index) newTodos.push(item)
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
        const allTodos: Todos[] = getTodos()

        const { value: formValues } = await MySwal.fire({
            title: 'Todo Edit',
            width: '900px',
            html: (
                <EditTodoModal
                    todos={todos}
                    index={index}
                    modalPriority={modalPriority}
                />
            ),
            confirmButtonText: 'Save',
            confirmButtonColor: '#66bb6a',
            showCancelButton: true,
            reverseButtons: true,
            preConfirm: () => [modalPriority?.current?.value],
        })

        if (formValues) {
            const selectedPriority = allTodos.find((item) => item?.id === index)
            selectedPriority!.priority = formValues[0]

            // Clear inputs
            if (searchByTitleInput.current?.value)
                searchByTitleInput.current.value = ''
            if (priorityValue) setPriorityValue('')

            setTodos(compare(allTodos))
            localStorage.setItem('todos', JSON.stringify(compare(allTodos)))

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

    const searchByPriority: Function = (priority: string) => {
        const allTodos: Todos[] = getTodos()

        setTodos(
            allTodos &&
                allTodos.filter((item) =>
                    item?.priority?.includes(priority ? priority : '')
                )
        )
    }

    const handleChange = (event: SelectChangeEvent) => {
        setSelectValue(event?.target?.value)
    }

    const handlePriorityChange = (event: SelectChangeEvent) => {
        setPriorityValue(event?.target?.value)
        searchByPriority(event?.target?.value)
    }

    return (
        <Container maxWidth="lg" style={{ height: '100vh' }}>
            <GlobalStyles />
            <Header />
            <CreateNewTodo
                addTodo={addTodo}
                inputTitle={inputTitle}
                inputPriority={inputPriority}
                selectValue={selectValue}
                handleChange={handleChange}
            />

            <Table
                todos={todos}
                editTodo={editTodo}
                removeTodo={removeTodo}
                searchByPriorityInput={searchByPriorityInput}
                searchByTitle={searchByTitle}
                searchByTitleInput={searchByTitleInput}
                priorityValue={priorityValue}
                handlePriority={handlePriorityChange}
            />
            <Footer />
        </Container>
    )
}

export default App
