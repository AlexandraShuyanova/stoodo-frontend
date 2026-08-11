import styles from './Search.module.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const Search = () => {
    return (
        <label className={styles.search}>
            <SearchOutlinedIcon className={styles.icon}/>
            <input type="search" placeholder="Search Stoodo..." aria-label="Search Stoodo"/>
        </label>
    )
}
