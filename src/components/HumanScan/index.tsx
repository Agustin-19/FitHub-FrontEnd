import Spline from "@splinetool/react-spline/next";
import styles from "./room.module.css";

const Home = () => {
  return (
    <div className={styles.splineContainer}>
      <Spline scene="https://prod.spline.design/zCxB5iUWNjULxcCB/scene.splinecode" />
    </div>
  );
};

export default Home;
