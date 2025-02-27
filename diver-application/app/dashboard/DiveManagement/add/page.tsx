import styles from "@/app/ui/dashboard/divemanagementpage/addDive/addDive.module.css";


export default async function AddDive() {

   
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add New Dive</h1>
            <form action="/api/add-dive" method="POST" encType="multipart/form-data" className={styles.form}>
                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label>Title</label>
                        <input type="text" name="title" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Date</label>
                        <input type="date" name="date" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Location</label>
                        <input type="text" name="location" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Dive Depth (m)</label>
                        <input type="number" name="depth" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Dive Time</label>
                        <input type="text" name="time" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Upload Image</label>
                        <input type="file" name="image" accept="image/*" />
                    </div>
                </div>

                <div className={styles.textAreaGroup}>
                    <label>Description</label>
                    <textarea name="description" required />
                </div>

                <div className={styles.textAreaGroup}>
                    <label>Notes</label>
                    <textarea name="notes" />
                </div>

                <button type="submit" className={styles.submitBtn}>Add Dive</button>
            </form>
        </div>
    );
}
