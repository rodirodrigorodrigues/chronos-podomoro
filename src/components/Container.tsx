import styles from './Container.module.css'

// Type semelhante ao HeadingProps,contudo não devemos uni-los 
// para não aumentar o acoplamento e evitar problemas futuros ao adicionar novas props
type ContainerProps = {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}