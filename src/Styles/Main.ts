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
    margin: 0 15%;
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
export const Grid = styled.div`
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
export const CreateNewJob = styled.div`
    display: grid;
`
export const GridTwo = styled.form`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    gap: 10px;
`
export const JobName = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
`
export const Input = styled.input`
    display: block;
    width: 97%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`
export const Select = styled.select`
    display: block;
    width: 97%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    height: calc(2.25rem + 2px);
`
export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
export const Button = styled.button`
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`
