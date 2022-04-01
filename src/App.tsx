import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { compare, debounce, getTodos } from './Utils/Functions'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EditTodoModal from './Components/EditTodoModal'
import { priority } from './Utils/Constants'
import Table from './Components/Table'
import Header from './Components/Header'
import Footer from './Components/Footer'
import {
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Button,
    SelectChangeEvent,
} from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import { GlobalStyles } from './Styles/Main'

const App = () => {
    const [todos, setTodos] = useState<Todos[]>([])
    const [selectValue, setSelectValue] = useState<string>('')
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

    const addTodo = () => {
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
            confirmButtonColor: '#66bb6a',
            showCancelButton: true,
            reverseButtons: true,
            preConfirm: () => [modalPriority?.current?.value],
        })

        if (formValues) {
            const selectedPriority = allTodos.find((item) => item?.id === index)
            selectedPriority!.priority = formValues[0]

            // Clear inputs
            if (inputTitle.current?.value) inputTitle.current.value = ''
            if (selectValue) setSelectValue('')

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

    const searchByPriority = (priority: string) => {
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

    return (
        <Container maxWidth="lg" style={{ height: '100vh' }}>
            <GlobalStyles />
            <Header />
            <form onSubmit={handleSubmit(debounce(addTodo, 1000))}>
                <Grid container spacing={2}>
                    <Grid item xs={12} my="10px">
                        <Typography variant="h5" component="h2">
                            Create New Job
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="Job Name"
                            inputRef={inputTitle}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth>
                            <InputLabel id="jobPriorityLabel">
                                Choose
                            </InputLabel>
                            <Select
                                labelId="jobPriorityLabel"
                                inputRef={inputPriority}
                                label="Choose"
                                value={selectValue}
                                onChange={handleChange}
                                required
                            >
                                {priority &&
                                    priority.map((item) => (
                                        <MenuItem
                                            key={item?.value}
                                            value={item?.value}
                                        >
                                            {item?.text}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2} textAlign="right">
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<FaPlus />}
                            size="large"
                            style={{ height: '100%' }}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Table
                todos={todos}
                editTodo={editTodo}
                removeTodo={removeTodo}
                searchByPriority={searchByPriority}
                searchByPriorityInput={searchByPriorityInput}
                searchByTitle={searchByTitle}
                searchByTitleInput={searchByTitleInput}
            />
            <Footer />
        </Container>
    )
}

export default App
