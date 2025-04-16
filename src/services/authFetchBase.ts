import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { setCredentials } from '../store/authSlice';
import {RootState} from "../store/store";

const baseUrl = '/api/v1/';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).auth.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    },
});

const authFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.meta?.response?.status === 403) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                api.dispatch(setCredentials({access_token: null}));

                const { data: refreshResult } = await baseQuery(
                    { url: 'auth/refresh_token', method: 'POST' },
                    api,
                    extraOptions
                );

                if ((refreshResult as any)?.access_token !== undefined
                    && (refreshResult as any)?.access_token !== null) {

                    let token: string = (refreshResult as any)?.access_token
                    api.dispatch(setCredentials({access_token: token}))
                }

                result = await baseQuery(args, api, extraOptions)
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};


export default authFetchBase;
