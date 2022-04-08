import { priority } from 'src/Constants'

const EditTodoModal = ({ todos, index, modalPriority }: TodoModalProps) => {
    const getData = () => todos && todos.find((item) => item?.id === index)

    return (
        <>
            <label
                style={{
                    margin: '20px 0 10px 0',
                    justifyContent: 'flex-start',
                }}
                className="swal2-input-label"
            >
                Title
            </label>
            <input
                type="text"
                disabled
                style={{ margin: '0', width: '100%' }}
                className="swal2-input"
                value={getData()?.title}
            />
            <label
                style={{
                    margin: '20px 0 10px 0',
                    justifyContent: 'flex-start',
                }}
                className="swal2-input-label"
            >
                Priority
            </label>
            <select
                ref={modalPriority}
                className="swal2-input"
                style={{ margin: '0', width: '100%' }}
                defaultValue={
                    getData()?.priority === '1'
                        ? '1'
                        : getData()?.priority === '2'
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
