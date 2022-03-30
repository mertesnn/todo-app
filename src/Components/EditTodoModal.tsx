import { priority } from 'src/Utils/Constants'

const EditTodoModal = ({ todos, index, modalPriority }: TodoModalProps) => {
    return (
        <>
            <label
                style={{
                    margin: '20px 0 10px 0',
                    justifyContent: 'flex-start',
                }}
                className="swal2-input-label"
            >
                Job Name
            </label>
            <input
                type="text"
                disabled
                style={{ margin: '0', width: '100%' }}
                className="swal2-input"
                value={todos[index]?.title}
            />
            <label
                style={{
                    margin: '20px 0 10px 0',
                    justifyContent: 'flex-start',
                }}
                className="swal2-input-label"
            >
                Job Priority
            </label>
            <select
                ref={modalPriority}
                className="swal2-input"
                style={{ margin: '0', width: '100%' }}
                defaultValue={
                    todos[index]?.priority === '1'
                        ? '1'
                        : todos[index]?.priority === '2'
                        ? '2'
                        : '3'
                }
            >
                {priority &&
                    priority.map((item) => (
                        <option key={item?.value} value={item?.value}>
                            {item?.text}
                        </option>
                    ))}
            </select>
        </>
    )
}

export default EditTodoModal
