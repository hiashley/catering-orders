import { BounceLoader } from "react-spinners";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div className={styles.overlay}>
      <BounceLoader
        color="#1976d2"
        loading={props?.isLoading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;