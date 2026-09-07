import React, { useState } from 'react';
import {
    BsPlusLg,
    BsSearch,
    BsThreeDotsVertical,
    BsShieldCheck,
    BsPersonCheck,
    BsPersonX,
    BsPeople,
} from 'react-icons/bs';
import './user.css';

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [users, setUsers] = useState([
        { id: 'USR-001', username: 'hassan_dev', email: 'hassan@gmail.com', role: 'Admin', linkedEmployee: 'EMP-001 (Hassan)', status: 'Active' },
        { id: 'USR-002', username: 'sarah_fin', email: 'sarah@gmail.com', role: 'Manager', linkedEmployee: 'EMP-002 (Sarah)', status: 'Active' },
        { id: 'USR-003', username: 'ahmed_hr', email: 'ahmed@gmail.com', role: 'Standard User', linkedEmployee: 'EMP-003 (Ahmed)', status: 'Active' },
        { id: 'USR-004', username: 'mary_mkt', email: 'mary@gmail.com', role: 'Standard User', linkedEmployee: 'EMP-004 (Mary)', status: 'Active' },
        { id: 'USR-005', username: 'john_admin', email: 'john@gmail.com', role: 'Manager', linkedEmployee: 'EMP-005 (John)', status: 'Inactive' },
    ]);

    const filteredUsers = users.filter((user) =>
        `${user.username} ${user.email} ${user.linkedEmployee}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="usersPage">

            {/* 1. SEHEMU YA JUU (HEADER & BUTTON) */}
            <div className="usersHeader">
                <div>
                    <h2>Users</h2>
                    <p>Manage system users, roles, and login access permissions</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="addUser"
                >
                    <BsPlusLg /> Add User
                </button>
            </div>

            {/* 2. KADI ZA TAKWIMU (STAT CARDS) */}
            <div className="userCards">
                <div className="userCard">
                    <div className="userCardIcon total">
                        <BsPeople size={24} />
                    </div>
                    <div>
                        <p>Total Users</p>
                        <h3>{users.length}</h3>
                    </div>
                </div>

                <div className="userCard">
                    <div className="userCardIcon active">
                        <BsPersonCheck size={24} />
                    </div>
                    <div>
                        <p>Active Users</p>
                        <h3>
                            {users.filter(u => u.status === 'Active').length}
                        </h3>
                    </div>
                </div>

                <div className="userCard">
                    <div className="userCardIcon inactive">
                        <BsPersonX size={24} />
                    </div>
                    <div>
                        <p>Inactive Users</p>
                        <h3>
                            {users.filter(u => u.status === 'Inactive').length}
                        </h3>
                    </div>
                </div>
            </div>

            {/* 3. JEDWALI NA SEHEMU YA SEARCH */}
            <div className="userTable">

                {/* Search Bar */}
                <div className="userSearchBar">
                    <div className="userSearch">
                        <BsSearch />
                        <input
                            type="text"
                            placeholder="Search user or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="userSearchInput"
                        />
                    </div>
                </div>

                {/* User Table */}
                <div className="userTableScroll">
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th><th>Username</th><th>Email</th><th>Role</th><th>Linked Employee</th><th>Status</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td><td>{user.username}</td><td>{user.email}</td>
                                    <td><span className={`userRole ${user.role.toLowerCase().replace(' ', '-')}`}>
                                        <BsShieldCheck /> {user.role}
                                    </span>
                                    </td>
                                    <td>{user.linkedEmployee}</td>
                                    <td><span className={`userStatus ${user.status.toLowerCase()}`}>
                                        {user.status}
                                    </span>
                                    </td>
                                    <td className="userAction">
                                        <button>
                                            <BsThreeDotsVertical />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4. MODAL YA ADD USER */}
            {isModalOpen && (
                <div className="userModalOverlay">
                    <div className="userModal">
                        <h2>Add New System User</h2>

                        <div className="userModalFields">
                            <div>
                                <label>Select Employee</label>
                                <select>
                                    <option value="">-- Choose Employee --</option>
                                    <option value="EMP-001">EMP-001 - Hassan (IT)</option>
                                    <option value="EMP-002">EMP-002 - Sarah (Finance)</option>
                                    <option value="EMP-003">EMP-003 - Ahmed (HR)</option>
                                </select>
                            </div>

                            <div>
                                <label>Username</label>
                                <input type="text" placeholder="e.g. hassan_dev" />
                            </div>

                            <div>
                                <label>System Role</label>
                                <select>
                                    <option value="Standard User">Standard User / Operator</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label>Temporary Password</label>
                                <input type="password" placeholder="********" />
                            </div>
                        </div>

                        <div className="userModalActions">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="cancelButton"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="saveButton"
                            >
                                Save User
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}