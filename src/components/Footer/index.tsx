import { Link } from 'react-router'
import styles from './styles.module.css'

export function Footer() {
    return <footer className={styles.footer}>
        <Link to='/about-pomodoro/'>Entenda como funciona a técnica do pomodoro</Link>
        <Link to='/'>Chronos Podomo &copy; {new Date().getFullYear()}</Link>
    </footer>
}