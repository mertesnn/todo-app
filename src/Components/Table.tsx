import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
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
    return (
        <div className="jobList">
            <h2>Job List</h2>
            <input
                type="text"
                placeholder="Job Name"
                ref={searchByTitleInput}
                onChange={debounce(searchByTitle, 1000)}
            />
            <select
                ref={searchByPriorityInput}
                onChange={debounce(searchByPriority, 1000)}
            >
                <option value="">Priority(All)</option>
                {priority &&
                    priority.map((item) => (
                        <option key={item?.value} value={item?.value}>
                            {item?.text}
                        </option>
                    ))}
            </select>

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
                                    <button onClick={() => removeTodo(index)}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
