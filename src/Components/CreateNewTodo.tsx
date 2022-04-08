import {
    debounce,
    Grid,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormHelperText,
    SelectChangeEvent,
} from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import { priority } from 'src/Constants'
import { createNewTodoSchema } from 'src/Constants/YupSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { setTodo } from 'src/Redux/todo'
import { compare } from 'src/Utils'
import { useRef, useState } from 'react'

const CreateNewTodo = () => {
    const [selectValue, setSelectValue] = useState<string>('')
    const inputTitle = useRef<HTMLInputElement | null>(null)
    const todos = useSelector((state: RootState) => state?.todo?.value)
    const dispatch = useDispatch()

    const addTodo: Function = (data: CreateNewTodoData) => {
        const uniqueId = new Date().getTime()
        let insert: Todos[]

        if (todos) {
            insert = [
                ...todos,
                {
                    id: uniqueId,
                    title: data?.title,
                    priority: data?.priority,
                },
            ]
        } else {
            insert = [
                {
                    id: uniqueId,
                    title: data?.title,
                    priority: data?.priority,
                },
            ]
        }
        // Save Todos
        dispatch(setTodo(compare(insert)))
        localStorage.setItem('todos', JSON.stringify(compare(insert)))

        // Clear inputs
        if (inputTitle.current?.value) inputTitle.current.value = ''
        if (selectValue) setSelectValue('')
    }

    const handleChange = (event: SelectChangeEvent) => {
        setSelectValue(event?.target?.value)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Todos>({
        resolver: yupResolver(createNewTodoSchema),
    })

    return (
        <form
            onSubmit={handleSubmit((data) => {
                debounce(addTodo(data), 1000)
            })}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} my="10px">
                    <Typography variant="h5" component="h2">
                        Create New Todo
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        fullWidth
                        label="Title"
                        inputRef={inputTitle}
                        {...register('title')}
                        helperText={errors?.title?.message}
                        error={!!errors?.title}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth error={!!errors?.priority}>
                        <InputLabel id="todoPriorityLabel">Priority</InputLabel>
                        <Select
                            labelId="todoPriorityLabel"
                            label="Priority"
                            value={selectValue}
                            {...register('priority')}
                            onChange={handleChange}
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
                        <FormHelperText>
                            {errors?.priority?.message}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={2}
                    textAlign={{ xs: 'center', sm: 'right' }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<FaPlus />}
                        size="large"
                        style={{ height: '56px' }}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default CreateNewTodo
