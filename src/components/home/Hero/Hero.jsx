import styles from "./Hero.module.css";

function Hero({ titulo, descripcion, imagenSrc, onExplorarCatalogo }) {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>{titulo}</h1>
                <p className={styles.description}>{descripcion}</p>
                <button className={styles.button} onClick={onExplorarCatalogo}>
                    Explorar Catálogo
                </button>
            </div>

            <div className={styles.imageWrapper}>
                {imagenSrc ? (
                    <img src={imagenSrc} alt={titulo} className={styles.image} />
                ) : (
                    <div className={styles.imagePlaceholder}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-moss)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                            <circle cx="9" cy="9" r="2"/>
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                        </svg>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Hero;
