import * as yup from 'yup'

export const createNewTodoSchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .required('Title required!')
        .matches(/^[a-zA-Z0-9 ]+$/, 'Invalid characters!')
        .max(255, 'Title cannot be more than 255 characters!'),
    priority: yup.string().required('Priority required!'),
})
