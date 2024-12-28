export const setUserData = (token: string, userId: string, role: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('userRole', role);
};

export const getUserId = (): string | null => {
  const userId = localStorage.getItem('userId');
  console.log('Retrieved userId from localStorage:', userId);
  return userId;
};

export const getUserRole = (): string | null => {
  return localStorage.getItem('userRole');
};

export const clearUserData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('userRole');
  return !!(token && userId && role);
};
