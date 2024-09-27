import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('https://api.example.com/login', {
                email,
                password
            });
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, login };
};

export default useLogin;
