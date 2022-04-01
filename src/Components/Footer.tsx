import { Stack, Link } from '@mui/material'
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                mt="40px"
                position="sticky"
                top="100vh"
            >
                <Link
                    href="https://github.com/mertesnn"
                    rel="noreferrer"
                    target="_blank"
                    fontSize="26px"
                >
                    <FaGithub />
                </Link>

                <Link
                    href="https://www.instagram.com/mertesen__/"
                    rel="noreferrer"
                    target="_blank"
                    fontSize="26px"
                >
                    <FaInstagram />
                </Link>

                <Link
                    href="https://www.linkedin.com/in/mert-esen/"
                    rel="noreferrer"
                    target="_blank"
                    fontSize="26px"
                >
                    <FaLinkedinIn />
                </Link>
            </Stack>
        </>
    )
}

export default Footer
