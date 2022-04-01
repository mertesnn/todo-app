import {
    Chip,
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
import { useState } from 'react'
import { FaPencilAlt, FaSearch, FaTrashAlt } from 'react-icons/fa'
import { priority } from 'src/Utils/Constants'
import { debounce } from 'src/Utils/Functions'

const Table = ({
    todos,
    editTodo,
    removeTodo,
    searchByTitleInput,
    searchByPriorityInput,
    searchByTitle,
    searchByPriority,
}: TableProps) => {
    const [selectValue, setSelectValue] = useState<string>('')

    const handleChange = (event: SelectChangeEvent) => {
        setSelectValue(event?.target?.value)
        debounce(searchByPriority(event?.target?.value), 1000)
    }
    return (
        <>
            <Typography variant="h5" my="20px">
                Job List
            </Typography>
            <Grid container spacing={2} mb="20px">
                <Grid item sm={9}>
                    <TextField
                        fullWidth
                        label="Job Name"
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
                <Grid item sm={3}>
                    <FormControl fullWidth>
                        <InputLabel id="jobPriorityLabel">
                            Priority (All)
                        </InputLabel>
                        <Select
                            labelId="jobPriorityLabel"
                            inputRef={searchByPriorityInput}
                            label="Priority (All)"
                            value={selectValue}
                            onChange={handleChange}
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
                                            <Chip
                                                color="error"
                                                label="Urgent"
                                                style={{
                                                    borderRadius: '5px',
                                                    fontWeight: 'bold',
                                                    width: '80px',
                                                }}
                                            />
                                        ) : item?.priority === '2' ? (
                                            <Chip
                                                color="warning"
                                                label="Regular"
                                                style={{
                                                    borderRadius: '5px',
                                                    fontWeight: 'bold',
                                                    width: '80px',
                                                }}
                                            />
                                        ) : (
                                            <Chip
                                                color="primary"
                                                label="Trivial"
                                                style={{
                                                    borderRadius: '5px',
                                                    fontWeight: 'bold',
                                                    width: '80px',
                                                }}
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
