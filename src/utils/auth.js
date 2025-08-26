export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const setToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const removeToken = () => {
  sessionStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
  return true;
};

export const getCurrentUser = () => {
  const userStr = sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const removeCurrentUser = () => {
  sessionStorage.removeItem('user');
};

export const logout = () => {
  removeToken();
  removeCurrentUser();
  window.location.href = '/login';
};