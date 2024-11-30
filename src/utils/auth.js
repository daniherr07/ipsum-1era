export function checkUserRole() {
    const cookies = document.cookie.split(';');
    const roleCookie = cookies.find(cookie => cookie.trim().startsWith('role='));
    if (roleCookie) {
      const role = roleCookie.split('=')[1];
      return role === 'Root' || role === 'Admin';
    }
    return false;
  }
  