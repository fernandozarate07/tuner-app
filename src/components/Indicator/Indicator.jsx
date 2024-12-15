import styles from "./Indicator.module.css";

const Indicator = () => {
  const getLineSize = (index) => {
    const activeIndex = 6;
    const distance = Math.abs(index - activeIndex);
    return 100 - distance * 15;
  };
  return (
    <div className={styles.indicator}>
      <div className={styles.tuner__indicatorContainer}>
        <div className={styles.tuner__indicatorContent}>
          {[...Array(13)].map((_, index) => (
            <div key={index} className={styles.tuner__lineContainer}>
              <div className={styles.tuner__line} style={{ height: `${getLineSize(index)}%` }}></div>
            </div>
          ))}
        </div>
      </div>
      <div className={`flex-c-c ${styles.tuner__noteDisplay}`}>
        <span className={styles.tuner_item}>E</span>
        <span className={`${styles.tuner_item} ${styles.tuner_frequency}`}>(440Hz)</span>
      </div>
    </div>
  );
};

export default Indicator;
