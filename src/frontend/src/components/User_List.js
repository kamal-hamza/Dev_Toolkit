import react, {useState, useEffect} from 'react'
import axios from 'axios'

function User_List() {
        const[data, setData] = useState(null);
        const[error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/userAPI/")
                setData(response.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='User_List'>
            {data && <p>Data: {JSON.stringify(data)}</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}

export default User_List;