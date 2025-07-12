import React from 'react';

export default function UserTable({ users = [] }) {
  return (
    <div className="overflow-x-auto rounded-b-md text-white">
      <table className="w-full text-left">
        {/* Table Head */}
        <thead className="bg-[#2A2F38] text-[14px] text-white">
          <tr>
            <th className="py-3 px-4">User ID</th>
            <th className="py-3 px-4">User Name</th>
            <th className="py-3 px-4">E-mail</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Register Date</th>
            <th className="py-3 px-4">User Status</th>
            <th className="py-3 px-4">Change Status</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={idx}
              className="border-b border-[#45484d] hover:bg-[#2F353F] transition text-[12px]"
            >
              <td className="py-3 px-4">{user.userId}</td>
              <td className="py-3 px-4">{user.username}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.roleId}</td>
              <td className="py-3 px-4">{user.last_login}</td>
<td className="py-3 px-4">
  <span
    className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium transition-colors duration-200 ${
      user.status ? 'bg-green-900 text-lime-400 text-[12px]' : 'bg-red-900 text-red-300'
    }`}
  >
    {user.status ? 'Active' : 'Inactive'}
  </span>
</td>

              <td className="py-3 px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.active}
                    onChange={() => user.onToggleStatus(user.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                      user.active ? 'bg-blue-500' : 'bg-gray-400'
                    } relative`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        user.active ? 'translate-x-5' : ''
                      }`}
                    />
                  </div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
