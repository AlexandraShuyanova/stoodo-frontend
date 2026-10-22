import {useGetTopicsQuery} from "../../services/StoodoService";
import styles from "./TopicsSidebar.module.scss";

export const TopicsSidebar = () => {
    const {data} = useGetTopicsQuery();

    return (
        <div className={styles.rightSideBar}>
            <div className={styles.topics}>
                <div className={styles.topicsHeader}>
                    <div className={styles.topicTitle}>Topics</div>

                    <button className={styles.viewAll}>
                        View all
                    </button>
                </div>

                <div className={styles.topicsGrid}>
                    {data?.map((topic) => (
                        <button
                            key={topic.id}
                            className={styles.topic}
                            style={{ backgroundColor: topic.color }}
                        >
                            {topic.topic}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
