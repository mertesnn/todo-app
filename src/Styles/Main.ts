import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: 
    }
`
export const Container = styled.div`
    margin: 0 5%;
`
export const HorizontalLine = styled.hr`
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin: 1rem 0;
`
