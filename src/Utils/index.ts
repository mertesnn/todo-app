export const debounce = (fnc: Function, delay: number) => {
    let timeout: any

    return () => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            fnc()
        }, delay)
    }
}

const compareTitle = (a: any, b: any) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1

    return 0
}

export const compare = (item: Todos[]) => {
    const urgent: Todos[] = []
    const regular: Todos[] = []
    const trivial: Todos[] = []

    item.forEach((item) => {
        switch (item?.priority) {
            case '1':
                urgent.push(item)
                break
            case '2':
                regular.push(item)
                break
            case '3':
                trivial.push(item)
                break
        }
    })

    return [
        ...urgent.sort(compareTitle),
        ...regular.sort(compareTitle),
        ...trivial.sort(compareTitle),
    ]
}

export const getTodos = () => {
    const existingTodos = localStorage.getItem('todos')
    return existingTodos && JSON.parse(existingTodos)
}
