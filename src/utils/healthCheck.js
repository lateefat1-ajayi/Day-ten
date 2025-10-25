// Simple backend health check
export const healthCheck = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    if (response.ok) {
      return { status: 'healthy', message: 'Backend is running' };
    } else {
      return { status: 'unhealthy', message: 'Backend responded with error' };
    }
  } catch (error) {
    return { status: 'offline', message: 'Backend is not running or not accessible' };
  }
};
