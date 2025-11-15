import styles from '../styles/Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.brand}>API Movies</div>
      </header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>Feito com ❤️</footer>
    </div>
  )
}
