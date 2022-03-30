import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'

const Table = ({
    todos,
    editTodo,
    removeTodo,
}: {
    todos: Todos[]
    editTodo: Function
    removeTodo: Function
}) => {
    return (
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
    )
}

export default Table
