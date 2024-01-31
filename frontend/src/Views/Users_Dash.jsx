import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OptionsUsers_Dash from '../Components/Dashboard/Users/OptionsUsers_Dash';
import { useAuthStore } from '../stores/Auth/authStore';
import { niuxApi } from '../api/niuxApi';
import swal from 'sweetalert';


const Users_Dash = () => {
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState({});
  const [users, setUsers] = useState([]);
  const picture = useAuthStore((state) => state.user?.picture || 'No picture');

  const handleDeleteUser = (userId) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez desactivado, este usuario no se mostrará en la lista.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        niuxApi.patch(`/auth/update/${userId}`, { isActive: false })
          .then(() => {
            setUsers(users.map(user => user.id === userId ? { ...user, isActive: false } : user));
            swal("Usuario desactivado con éxito", { icon: "success" });
          })
          .catch(error => {
            console.error('Error al desactivar el usuario', error);
            swal("Error al desactivar el usuario", { icon: "error" });
          });
      }
    });
  };
  
//Eliminar producto Seleccionado
const handleDeleteSelected = () => {
  const selectedIds = Object.keys(selected).filter(id => selected[id]);

  if (selectedIds.length === 0) {
    swal("Por favor, seleccione al menos un Usuario para eliminar.", { icon: "warning" });
    return;
  }
  // Eliminar un producto específico


  swal({
    title: "¿Estás seguro?",
    text: "Una vez eliminados, no podrás recuperar estos Usuarios.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      Promise.all(selectedIds.map(id => niuxApi.delete(`/auth/find-user/${id}`)))
        .then(() => {
          setUsers(users.filter(user => !selectedIds.includes(user.id.toString())));
          setSelected({});
          swal("Usuarios eliminados con éxito", { icon: "success" });
        })
        .catch(error => {
          console.error('Error al eliminar Usuarios', error);
          swal("Error al eliminar usuario", { icon: "error" });
        });
    }
  });
};

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await niuxApi.get('/auth/get-all-users');
        setUsers(response.data); // Asumiendo que la respuesta es un array de usuarios
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectAll = () => {
    const newSelected = {};
    users.forEach((user) => {
      newSelected[user.id] = !selectAll;
    });
    setSelectAll(!selectAll);
    setSelected(newSelected);
  };

  const handleSelect = (id) => {
    setSelected((prevSelected) => ({ ...prevSelected, [id]: !prevSelected[id] }));
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.reduce((initials, namePart) => initials += namePart.substring(0,1), '').toUpperCase();
  };
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div role="status" className="text-center flex loading-indicator">
            <svg aria-hidden="true" className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}{' '}
      {
        <div className="">
          <OptionsUsers_Dash onDeleteSelected={handleDeleteSelected}/>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="sticky top-0 bg-white px-4 py-2">
                    <input type="checkbox" id="SelectAll" checked={selectAll} onChange={handleSelectAll} className="h-5 w-5 rounded border-gray-300" />
                  </th>
                  {/* Otros encabezados de la tabla aquí */}
                  <th className="text-white px-6 py-3">NOMBRE</th>
                  <th className="text-white px-6 py-3">CORREO ELECTRÓNICO</th>
                  <th className="text-white px-6 py-3">TIPO CUENTA</th>
                  <th className="text-white px-6 py-3">ROL</th>
                  <th className="text-white px-6 py-3">ACTIVO</th>
                  <th className="text-white px-6 py-3"></th>
                  <th className="text-white px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
              {users.filter(user => user.isActive).map((user) => (
                  <tr key={user.id} className="bg-white hover:bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="sticky left-0 bg-white px-4 py-2">
                      <input type="checkbox" id={`select-${user.id}`} checked={!!selected[user.id]} onChange={() => handleSelect(user.id)} className="h-5 w-5 rounded border-gray-300" />
                    </td>
                    <td className="">
                      <Link to="/dashboard/update-user" className="flex items-center">
                        <span className="flex items-center justify-center w-25 h-25 bg-purple-100 uppercase text-purple-600 rounded-full font-bold border border-purple-600/30 mr-4">{getInitials(user.fullName)}</span>
                        {user.fullName}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.source}</td>
                    <td className="px-6 py-4">{user.roles}</td>
                    <td className="px-6 py-4">{user.isActive}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to="/dashboard/update-user" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Editar
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button  onClick={() => handleDeleteUser(user.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
};

export default Users_Dash;
