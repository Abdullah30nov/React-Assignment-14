// json-server --watch db.json
// json-server --watch db.json --port 3001
// json-server --watch db.json --port 3001 --host 0.0.0
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BasicTable from '../Table/Table';

export default function App() {
  const [data, setData] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    // Fetch initial data from API
    axios.get('http://localhost:3000/users')
      .then((res) => {
        setData(res.data); // Set data to state
      })
      .catch((err) => {
        console.error(err);
        // Optionally handle errors here
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
<Button variant='contained' onClick={()=>navigate('/Register')}>Create User</Button><br /><hr />
      <BasicTable data={data} setData={setData} />
    </div>
  );
}

