import { LegacyRef } from 'react'

const EditTodoModal = ({
    todos,
    index,
    modalPriority,
}: {
    todos: Todos[]
    index: number
    modalPriority: LegacyRef<HTMLSelectElement> | undefined
}) => {
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
                <option value="1">Urgent</option>
                <option value="2">Regular</option>
                <option value="3">Trivial</option>
            </select>
        </>
    )
}

export default EditTodoModal
