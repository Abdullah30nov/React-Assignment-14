// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { Button } from '@mui/material';
// import axios from 'axios';

// export default function BasicTable({ data, setData }) {
//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:3000/users/${id}`)
//       .then(() => {
//         return axios.get('http://localhost:3000/users');
//       })
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell align="right">UserName</TableCell>
//             <TableCell align="right">Email</TableCell>
//             <TableCell align="right">Phone</TableCell>
//             <TableCell align="right">Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row) => (
//             <TableRow
//               key={row.id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.username}</TableCell>
//               <TableCell align="right">{row.email}</TableCell>
//               <TableCell align="right">{row.phone}</TableCell>
//               <TableCell align="right" sx={{ marginRight: '50px' }}>
//                 <Button onClick={() => handleDelete(row.id)}>
//                   <DeleteIcon sx={{ marginRight: "20px" }} />
//                 </Button>
//                 <Button>
//                   <EditIcon />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function BasicTable({ data, setData }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (row) => {
    setEditingId(row.id);
    setEditData({ ...row }); // Set current row data for editing
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:3000/users/${editData.id}`, editData)
      .then(() => {
        return axios.get('http://localhost:3000/users');
      })
      .then((res) => {
        setData(res.data);
        setEditingId(null); // Exit edit mode
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    setEditingId(null); // Exit edit mode
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        return axios.get('http://localhost:3000/users');
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">UserName</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {editingId === row.id ? (
                  <TextField
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                  />
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell align="right">
                {editingId === row.id ? (
                  <TextField
                    name="username"
                    value={editData.username}
                    onChange={handleEditChange}
                  />
                ) : (
                  row.username
                )}
              </TableCell>
              <TableCell align="right">
                {editingId === row.id ? (
                  <TextField
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                  />
                ) : (
                  row.email
                )}
              </TableCell>
              <TableCell align="right">
                {editingId === row.id ? (
                  <TextField
                    name="phone"
                    value={editData.phone}
                    onChange={handleEditChange}
                  />
                ) : (
                  row.phone
                )}
              </TableCell>
              <TableCell align="right" sx={{ marginRight: '50px' }}>
                {editingId === row.id ? (
                  <>
                    <Button onClick={handleSave} variant="contained" color="primary">
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outlined" color="secondary" sx={{ marginLeft: '10px' }}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEditClick(row)}>
                      <EditIcon sx={{ marginRight: "20px" }} />
                    </Button>
                    <Button onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}