export async function handleRefreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await fetch('http://example.com/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        }
      });
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    } catch (error) {
      console.error('An error occurred', error);    // TODO: What if the refresh token is invalid? How to redirect to login?
    }
  }