import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://docs-point-server-bw7y6chty-hosains-projects-1e2169e4.vercel.app'
})

const useAxiosPublic = () => {
    return [axiosPublic];
};

export default useAxiosPublic;