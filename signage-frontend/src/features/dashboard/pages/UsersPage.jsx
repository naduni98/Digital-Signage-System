// src/components/common/Header.jsx
import React, { useEffect, useState } from "react";
import { getAllUsers,softDeleteUser } from "../../auth/services/authService";
import Pagination from "../../../components/common/Pagination";
import TopSection from "../../../components/layouts/TopSection";
import UserTable from "../../users/components/UserTable";
import UserModal from "../../users/components/UserModal";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
const [showModal, setShowModal] = useState(false);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIdx, startIdx + itemsPerPage);
 
// UsersPage.jsx
const fetchUsers = async () => {
  try {
    const data = await getAllUsers();
    setUsers(data);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

useEffect(() => {
  fetchUsers(); // ✅ initial load
}, []);



  const handleToggleStatus = async (userId) => {
  const confirm = window.confirm("Are you sure you want to delete this user?");
  if (!confirm) return;

  try {
    await softDeleteUser(userId);
    alert("User deactivated successfully");

    // Refresh user list
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  } catch (err) {
    console.error("Soft delete failed:", err);
    alert("Failed to delete user");
  }
};
 
  return (
    <div>
      <TopSection page="users" onAdd={() => setShowModal(true)}/>

      <div className="mt-8">
        <UserTable users={users} onToggleStatus={handleToggleStatus}/>
        <div className="px-6 py-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>


      </div>
       {showModal && (
       <UserModal isOpen={showModal} onClose={() => setShowModal(false)} onUserCreated={fetchUsers}  />

      )}
    </div>
  );
}
