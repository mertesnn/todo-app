import { useEffect } from 'react'
import { getTodos } from './Utils'
import Table from './Components/Table'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Container } from '@mui/material'
import { GlobalStyles } from './Styles'
import CreateNewTodo from './Components/CreateNewTodo'
import { setTodo } from './Redux/todo'
import { useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTodo(getTodos()))
    }, [dispatch])

    return (
        <Container maxWidth="lg" style={{ height: '100vh' }}>
            <GlobalStyles />
            <Header />
            <CreateNewTodo />
            <Table />
            <Footer />
        </Container>
    )
}

export default App
