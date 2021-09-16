import {flashbackClient} from "./flashback-client";
import {Principal} from '../dtos/Principal'

export const authenticate = async (credentials: {username: string, password: string}) => {
        let resp = await flashbackClient.post('/auth', credentials);
        console.log(resp.data)

        if (resp.status === 401) {
            throw resp.data;
        }

        let token: string | null = resp.headers['Authorization'];

        let principal: Principal = resp.data;

        if (token && principal) {
                principal.token = token;
                localStorage.setItem('api-token', token);

        }

        return principal;
}
export const logout = (setCurrentUser: (nextUser: Principal | undefined) => void) => {
        localStorage.removeItem('api-token')
        setCurrentUser(undefined);
}