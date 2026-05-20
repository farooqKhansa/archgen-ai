import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const getAnalysis = async () => {
  try {
    const response = await api.get('/analysis');
    return response.data;
  } catch (error) {
    console.error('Analysis fetch error:', error);
    throw error;
  }
};

export const downloadReport = async () => {
  try {
    const response = await api.get('/download/report', {
      responseType: 'blob',
    });
    
    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'architecture-report.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentElement.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};

export default api;
