import styles from "./styles.module.css";

<<<<<<< HEAD
type DefaultButtonPros = {
} & React.ComponentProps<'button'>

export function DefaultButton({ ...props }: DefaultButtonPros) {
  return (
    <>
      <button className={styles.button} {...props} />
=======
// Tem o tipo id e todos os tipos esperados pelo elemento button
// & (intersecção)
type DefaultButtonPros = {
  icon: React.ReactNode;
  color?: 'green' | 'red';
} & React.ComponentProps<'button'>

export function DefaultButton({ icon, color = 'green', ...props }: DefaultButtonPros) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props} >
        {icon}
      </button>
>>>>>>> ed20d2dcf48380d48859b54566d8d97318d7daca
    </>
  );
}
