import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return this.client(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/auth/login';
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth
  async login(email: string, password: string) {
    const { data } = await this.client.post('/auth/login', { email, password });
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  }

  async register(email: string, password: string, name: string) {
    const { data } = await this.client.post('/auth/register', { email, password, name });
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Users
  async getCurrentUser() {
    const { data } = await this.client.get('/users/me');
    return data;
  }

  // Projects
  async getProjects() {
    const { data } = await this.client.get('/projects');
    return data;
  }

  async getProject(id: string) {
    const { data } = await this.client.get(`/projects/${id}`);
    return data;
  }

  async createProject(name: string, description?: string) {
    const { data } = await this.client.post('/projects', { name, description });
    return data;
  }

  async updateProject(id: string, updates: { name?: string; description?: string; thumbnail?: string }) {
    const { data } = await this.client.put(`/projects/${id}`, updates);
    return data;
  }

  async deleteProject(id: string) {
    const { data } = await this.client.delete(`/projects/${id}`);
    return data;
  }

  // Jobs
  async getJobs(page = 1, pageSize = 20) {
    const { data } = await this.client.get('/jobs', { params: { page, pageSize } });
    return data;
  }

  async getJob(id: string) {
    const { data } = await this.client.get(`/jobs/${id}`);
    return data;
  }

  async createJob(type: string, input: any, projectId?: string) {
    const { data } = await this.client.post('/jobs', { type, input, projectId });
    return data;
  }

  // Assets
  async getProjectAssets(projectId: string) {
    const { data } = await this.client.get(`/assets/project/${projectId}`);
    return data;
  }

  async uploadAsset(file: File, projectId: string, type: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);
    formData.append('type', type);
    
    const { data } = await this.client.post('/assets/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }

  // Subscriptions
  async getSubscription() {
    const { data } = await this.client.get('/subscriptions/current');
    return data;
  }

  async upgradeSubscription(tier: string) {
    const { data } = await this.client.post('/subscriptions/upgrade', { tier });
    return data;
  }
}

export const apiClient = new ApiClient();
