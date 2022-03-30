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
    #root {
        height: 100vh;
    }

`
export const Container = styled.div`
    margin: 0 5%;
    height: 100%;
`
export const HorizontalLine = styled.hr`
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin: 1rem 0;
`
export const Foot = styled.div`
    position: sticky;
    top: 100vh;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    background: lightgray;
    border-radius: 5px;
`
export const Head = styled.div`
    display: grid;
`
export const FooterIcons = styled.div`
    display: flex;
    height: 100%;
    font-size: 20pt;
    gap: 15px;
`
export const Link = styled.a`
    color: black;
`
