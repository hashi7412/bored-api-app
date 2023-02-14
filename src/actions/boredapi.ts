import axios from "axios";

export const getData: any = async (endpoint?: string) => {
    try {
        const res = axios.get('https://www.boredapi.com/api/' + endpoint);
        return res;
    } catch (err) {
        return err;
    }
}