import styles from "./Dashboard.module.css";
import { logout } from "./dashboard";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1>Welcome</h1>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}