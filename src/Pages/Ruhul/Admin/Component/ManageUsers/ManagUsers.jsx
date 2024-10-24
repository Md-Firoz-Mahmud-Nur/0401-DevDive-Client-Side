import { useState, useEffect } from "react";
import UseUser from "../../../../../Hooks/UseUser";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";

const ManageUsers = () => {
  const [showModal, setShowModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, , refetch] = UseUser();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const filtered = users?.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleMouseEnter = (index) => setShowModal(index);
  const handleMouseLeave = () => setShowModal(null);

  const handleUserAction = (user, actionType) => {
    const isRoleChange = actionType === 'roleChange';
    const actionMessage = isRoleChange
      ? `Change role for <strong>${user.name}</strong>?`
      : `Do you really want to ${user.role === 'blocked' ? 'unblock' : 'block'} <strong>${user.name}</strong>?`;

    Swal.fire({
      title: `<h2 class="text-2xl text-[#2c3e57] dark:text-white font-serif font-semibold">Are you sure?</h2>`,
      html: `<p class="text-sm text-gray-500">${actionMessage}</p>`,
      imageUrl: `${user.photoUrl}`,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: `${user.name}`,
      showCancelButton: true,
      confirmButtonText: isRoleChange ? "Yes, change role!" : `${user.role === 'blocked' ? 'Unblock' : 'Block'} User`,
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: 'swal2-show bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4',
        confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200 transform hover:scale-105 mr-2',
        cancelButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200 transform hover:scale-105',
      }
    }).then((result) => {
      if (!result.isConfirmed) {
        refetch();
        return;
      }

      const newRole = isRoleChange
        ? (user.role === 'admin' ? 'member' : 'admin')
        : (user.role === 'blocked' ? 'member' : 'blocked');
      const newRoleData = { data: newRole };

      axiosPublic.put(`/update-user-role/${user.email}`, newRoleData)
        .then((res) => {
          refetch();
          if (res.status === 200) {
            refetch();
            Swal.fire({
              title: `<h2 class="text-xl font-semibold text-[#2c3e57] dark:text-white">${isRoleChange ? 'Role Changed!' : (user.role === 'blocked' ? 'Unblocked!' : 'Blocked!')}</h2>`,
              html: `<p class="text-gray-600 dark:text-gray-300">${isRoleChange
                ? `The role for <strong>${user.name}</strong> has been successfully changed to <strong>${newRole}</strong>.`
                : `User <strong>${user.name}</strong> has been successfully ${user.role === 'blocked' ? 'unblocked' : 'blocked'}.`
              }</p>`,
              icon: "success",
              customClass: {
                popup: 'swal2-show bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4',
                confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200 transform hover:scale-105',
              }
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: `<h2 class="text-xl font-semibold text-[#2c3e57] dark:text-white">Something went wrong!</h2>`,
            html: `<p class="text-gray-600 dark:text-gray-300">${err}</p>`,
            icon: "error",
            customClass: {
              popup: 'swal2-show bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4',
              confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transform hover:scale-105',
            }
          });
        });
    });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <section className="p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl text-gray-900 dark:text-gray-100 my-2 sm:my-4">Manage Users</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full md:w-1/2 lg:w-1/4 p-2 border rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <th className="p-2 sm:p-4">Photo</th>
              <th className="p-2 sm:p-4">Name</th>
              <th className="p-2 sm:p-4">User Type</th>
              <th className="p-2 sm:p-4">Role</th>
              <th className="p-2 sm:p-4">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers && currentUsers.map((user, index) => (
              <tr key={index} className="border-b dark:border-gray-600">
                <td className="p-2 sm:p-4 relative">
                  <img
                    src={user?.photoUrl}
                    alt={user?.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border dark:border-gray-500 cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  />
                  {showModal === index && (
                    <div
                      className="absolute top-0 left-16 z-10 bg-white border p-4 rounded-lg shadow-lg w-52 sm:w-64 dark:bg-gray-800 dark:border-gray-500"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex gap-x-2 items-center">
                        <img
                          src={user?.photoUrl}
                          alt={user?.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border dark:border-gray-500"
                        />
                        <div>
                          <h3 className="text-md sm:text-lg font-semibold dark:text-white">{user?.name}</h3>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Role: {user?.role}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Type: {user?.userType}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
                <td className="p-2 sm:p-4 font-semibold text-gray-900 dark:text-gray-100">{user?.name}</td>
                <td className="p-2 sm:p-4">
                  <span className={`px-2 py-1 text-sm rounded-full ${user?.userType === 'premium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500 dark:text-white' : 'bg-green-100 text-green-700 dark:bg-green-500 dark:text-white'}`}>
                    {user?.userType}
                  </span>
                </td>
                <td className="p-2 sm:p-4">
                  <span className={`px-2 py-1 text-sm rounded-full ${user?.role === 'admin' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500 dark:text-white' : user.role === 'blocked' ? 'bg-red-100 text-red-700 dark:bg-red-500 dark:text-white' : 'bg-green-100 text-green-700 dark:bg-green-500 dark:text-white'}`}>
                    {user?.role}
                  </span>
                </td>
                <td className="p-2 sm:p-4">
                  <button
                    className={`${user?.role === 'admin' ? 'bg-green-500' : 'bg-blue-500'} hover:bg-opacity-75 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg transform hover:scale-105 transition duration-200`}
                    onClick={() => handleUserAction(user, 'roleChange')}
                  >
                    {user?.role === 'admin' ? 'Make Member' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;
