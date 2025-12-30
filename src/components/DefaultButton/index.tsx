import styles from "./styles.module.css";

type DefaultButtonPros = {
} & React.ComponentProps<'button'>

export function DefaultButton({ ...props }: DefaultButtonPros) {
  return (
    <>
      <button className={styles.button} {...props} />
    </>
  );
}
