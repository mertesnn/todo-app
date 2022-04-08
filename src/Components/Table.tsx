import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table as TableMui,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import { useRef, useState } from 'react'
import { FaPencilAlt, FaSearch, FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { priority } from 'src/Constants'
import { setTodo } from 'src/Redux/todo'
import { RootState } from 'src/store'
import { compare, debounce, getTodos } from 'src/Utils'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Chips from './Chips'
import EditTodoModal from './EditTodoModal'

const Table = () => {
    const todo = useSelector((state: RootState) => state?.todo?.value)
    const modalPriority = useRef<HTMLSelectElement | null>(null)
    const searchByTitleInput = useRef<HTMLInputElement | null>(null)
    const searchByPriorityInput = useRef<HTMLSelectElement | null>(null)
    const [priorityValue, setPriorityValue] = useState<string>('')
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()

    const editTodo = async (index: number) => {
        const allTodos: Todos[] = getTodos()

        const { value: formValues } = await MySwal.fire({
            title: 'Todo Edit',
            width: '900px',
            html: (
                <EditTodoModal
                    todos={todo}
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

            dispatch(setTodo(compare(allTodos)))
            localStorage.setItem('todos', JSON.stringify(compare(allTodos)))

            await MySwal.fire({
                title: 'Success',
                text: 'Updated successfully!',
                icon: 'success',
            })
        }
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

                todo.forEach((item) => {
                    if (item?.id !== index) newTodos.push(item)
                })

                dispatch(setTodo(newTodos))
                localStorage.setItem('todos', JSON.stringify(newTodos))

                await MySwal.fire({
                    title: 'Success',
                    text: 'Deleted successfully!',
                    icon: 'success',
                })
            }
        })
    }

    const searchByPriority: Function = (priority: string) => {
        const allTodos: Todos[] = getTodos()

        dispatch(
            setTodo(
                allTodos &&
                    allTodos.filter((item) =>
                        item?.priority?.includes(priority ? priority : '')
                    )
            )
        )
    }

    const searchByTitle = () => {
        const allTodos: Todos[] = getTodos()
        const searchKey = searchByTitleInput?.current?.value

        dispatch(
            setTodo(
                allTodos &&
                    allTodos.filter((item) =>
                        item?.title
                            ?.toLowerCase()
                            ?.includes(
                                searchKey ? searchKey?.toLowerCase() : ''
                            )
                    )
            )
        )
    }

    const handlePriorityChange = (event: SelectChangeEvent) => {
        setPriorityValue(event?.target?.value)
        searchByPriority(event?.target?.value)
    }
    return (
        <>
            <Typography variant="h5" my="20px">
                Todo List
            </Typography>
            <Grid container spacing={2} mb="20px">
                <Grid item xs={12} sm={9}>
                    <TextField
                        fullWidth
                        placeholder="Search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaSearch />
                                </InputAdornment>
                            ),
                        }}
                        inputRef={searchByTitleInput}
                        onChange={debounce(searchByTitle, 1000)}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <InputLabel id="todoPriorityLabel">
                            Priority (All)
                        </InputLabel>
                        <Select
                            labelId="todoPriorityLabel"
                            inputRef={searchByPriorityInput}
                            label="Priority (All)"
                            value={priorityValue}
                            onChange={handlePriorityChange}
                        >
                            <MenuItem value="">Priority (All)</MenuItem>
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
            </Grid>

            <TableContainer component={Paper}>
                <TableMui>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography fontWeight="bold">Name</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography fontWeight="bold">
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography fontWeight="bold">
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todo &&
                            todo.map((item) => (
                                <TableRow key={item?.id}>
                                    <TableCell component="th" scope="row">
                                        <Typography>{item?.title}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        {item?.priority === '1' ? (
                                            <Chips
                                                color="error"
                                                label="Urgent"
                                            />
                                        ) : item?.priority === '2' ? (
                                            <Chips
                                                color="warning"
                                                label="Regular"
                                            />
                                        ) : (
                                            <Chips
                                                color="primary"
                                                label="Trivial"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton
                                                aria-label="Edit"
                                                size="small"
                                                onClick={() =>
                                                    editTodo(item?.id)
                                                }
                                            >
                                                <FaPencilAlt fontSize="inherit" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                aria-label="Delete"
                                                size="small"
                                                onClick={() =>
                                                    removeTodo(item?.id)
                                                }
                                            >
                                                <FaTrashAlt />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </TableMui>
            </TableContainer>
        </>
    )
}

export default Table
