import styles from './Search.module.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { setSearch } from '../../../../store/searchSlice';

export const Search = () => {
    const [tmpSearch, setTmpSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearch(tmpSearch));
        }, 500);

        return () => clearTimeout(timer);
    }, [tmpSearch, dispatch])

    return (
        <label className={styles.search}>
            <SearchOutlinedIcon className={styles.icon}/>
            <input
                value={tmpSearch}
                onChange={(e) => setTmpSearch(e.target.value)}
                type="search"
                placeholder="Search posts..."
                aria-label="Search posts"
            />
        </label>
    )
}
