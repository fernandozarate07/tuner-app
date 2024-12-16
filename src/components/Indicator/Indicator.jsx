import styles from "./Indicator.module.css";

const Indicator = () => {
  const getLineSize = (index) => {
    const activeIndex = 6;
    const distance = Math.abs(index - activeIndex);
    return 100 - distance * 15;
  };
  return (
    <div className={styles.indicator}>
      <div className={styles.indicator__screen}>
        {[...Array(13)].map((_, index) => (
          <div key={index} className={styles.indicator__lineContainer}>
            <div className={styles.indicator__line} style={{ height: `${getLineSize(index)}%` }}></div>
          </div>
        ))}
      </div>
      <div className={`flex-c-c-column ${styles.indicator__noteDisplay}`}>
        <span className={`${styles.indicator__item} ${styles.indicator__note}`}>E</span>
        <span className={`${styles.indicator__item} ${styles.indicator__frequency}`}>(440H)</span>
      </div>
    </div>
  );
};

export default Indicator;
