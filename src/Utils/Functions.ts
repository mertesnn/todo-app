export const debounce = (fnc: Function, delay: number) => {
    let timeout: any

    return () => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            fnc()
        }, delay)
    }
}

export const compare = (a: any, b: any) => {
    if (a.priority < b.priority) return -1
    if (a.priority > b.priority) return 1

    return 0
}
