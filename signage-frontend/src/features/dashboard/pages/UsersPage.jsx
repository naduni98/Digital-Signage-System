// src/components/common/Header.jsx
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../auth/services/authService';
import Pagination from '../../../components/common/Pagination';
import TopSection from '../../../components/layouts/TopSection';
import UserTable from '../../users/components/UserTable';
export default function UsersPage() {

   const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    }

    fetchUsers();
  }, []);
console.log('users',users);


    const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIdx, startIdx + itemsPerPage);
  return (
    

    <div>
      <TopSection page="users" />

<div className='mt-8'>
 <UserTable users={users} />
<div className="px-6 py-4">
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
    />
    </div>
 
</div>
     
    </div>
  );
}
