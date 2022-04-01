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
} from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import { priority } from 'src/Constants'
import { createNewTodoSchema } from 'src/Constants/YupSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const CreateNewTodo = ({
    addTodo,
    inputTitle,
    inputPriority,
    selectValue,
    handleChange,
}: CreateNewTodoProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Todos>({
        resolver: yupResolver(createNewTodoSchema),
    })
    return (
        <form onSubmit={handleSubmit(debounce(addTodo, 1000))}>
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
                            inputRef={inputPriority}
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
                        style={{ height: '100%' }}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default CreateNewTodo
