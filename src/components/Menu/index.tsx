import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

type availableTheme = 'dark' | 'light';

// { children } destructuring from props
export function Menu() {

  const [theme, setTheme] = useState<availableTheme>('dark');

  function handleThemeChange(e: React.MouseEvent) {
    e.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    })
  }

  // useEffect(() => {
  //   console.log("useEffect sem dependencia", new Date())
  // }) // Executado toda vez que o componente renderiza na tela

  // useEffect(() => {
  //   console.log("useEffect com dependencia vazia", new Date())
  // }, []) // Renderiza somente quando o componente é montado pela primeira vez

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]) // Renderiza sempre que theme mudar

  return (
    <nav className={styles.menu}>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ir para home"
        title="Ir para home"
      >
        <HouseIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ir para o histórico"
        title="Ir para o histórico"
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Mudar tema"
        title="Mudar tema"
        onClick={handleThemeChange}
      >
        <SunIcon />
      </a>
    </nav>
  );
}
