import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { Foot, FooterIcons, Link } from '../Styles/Main'

const Footer = () => {
    return (
        <Foot>
            <FooterIcons>
                <Link
                    href="https://github.com/mertesnn"
                    rel="noreferrer"
                    target="_blank"
                >
                    <FaGithub />
                </Link>
                <Link
                    href="https://www.instagram.com/mertesen__/"
                    rel="noreferrer"
                    target="_blank"
                >
                    <FaInstagram />
                </Link>
                <Link
                    href="https://www.linkedin.com/in/mert-esen/"
                    rel="noreferrer"
                    target="_blank"
                >
                    <FaLinkedinIn />
                </Link>
            </FooterIcons>
            <div>&#169; 2022 Todo App</div>
        </Foot>
    )
}

export default Footer
