import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
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
import { FaPencilAlt, FaSearch, FaTrashAlt } from 'react-icons/fa'
import { priority } from 'src/Constants'
import { debounce } from 'src/Utils'
import Chips from './Chips'

const Table = ({
    todos,
    editTodo,
    removeTodo,
    searchByTitleInput,
    searchByPriorityInput,
    searchByTitle,
    priorityValue,
    handlePriority,
}: TableProps) => {
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
                            onChange={handlePriority}
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
                        {todos &&
                            todos.map((item) => (
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
