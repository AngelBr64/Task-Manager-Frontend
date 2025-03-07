import api from './axiosConfig';

const AuthService = {
  login: (email, password) =>
    api.post('/login', { email, password }).then((res) => res.data),

  register: (email, username, password) =>
    api.post('/register', { email, username, password }).then((res) => res.data),

  getTasksByUser: (userId) =>
    api.get(`/task/${userId}`).then((res) => res.data),

  getTasksByGroup: (selectedGroup) =>
    api.get(`/tasks/${selectedGroup}`).then((res) => res.data),

  createTask: (taskData) =>
    api.post('/tasks', taskData).then((res) => res.data),

  updateTask: (taskId, taskData) =>
    api.put(`/tasks/${taskId}`, taskData).then((res) => res.data),

  deleteTask: (taskId) =>
    api.delete(`/tasks/${taskId}`).then((res) => res.data),

  getGroupsByUser: (userId) =>
    api.get(`/groups/${userId}`).then((res) => res.data),

  createGroup: (groupData) =>
    api.post('/groups', groupData).then((res) => res.data),

  addMemberToGroup: (groupId, userId) =>
    api.post(`/groups/${groupId}/members/${userId}`).then((res) => res.data),

  removeMemberFromGroup: (groupId, userId) =>
    api.delete(`/groups/${groupId}/members/${userId}`).then((res) => res.data),

  getGroupTasks: (groupId) =>
    api.get(`/groups/tasks/${groupId}`).then((res) => res.data),

  getUsers: (userId) =>
    api.get(`/users/${userId}`).then((res) => res.data),

  updateUser: (userId, userData) =>
    api.put(`/users/${userId}`, userData).then((res) => res.data),
};

export default AuthService;