export const isAuthenticated = () => Boolean(localStorage.getItem('projectpilot_token'));

export const signOut = () => {
  localStorage.removeItem('projectpilot_token');
  localStorage.removeItem('projectpilot_email');
};
