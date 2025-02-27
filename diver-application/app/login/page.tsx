import styles from "@/app/ui/dashboard/login/login.module.css"

export default function login() {
    return (

        <div className={styles.container}>
            
            <form action="" className={styles.form}>
                <h1 className={styles.text}>ML Dive Log-in</h1>
                <input className={styles.input} type="text" placeholder="Username"/>
                <input className={styles.input} type="password" placeholder="Password"/>
                <button className={styles.button}>Login</button>
            </form>

        </div>
    )};