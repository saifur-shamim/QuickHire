import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Jobs endpoints
export const jobsAPI = {
  // Get all jobs
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get("/jobs", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single job by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new job (Admin)
  create: async (jobData) => {
    try {
      const response = await apiClient.post("/jobs", jobData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update job (Admin)
  update: async (id, jobData) => {
    try {
      const response = await apiClient.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete job (Admin)
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search/Filter jobs
  search: async (searchParams) => {
    try {
      const response = await apiClient.get("/jobs/search", {
        params: searchParams,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Applications endpoints
export const applicationsAPI = {
  // Submit application
  create: async (applicationData) => {
    try {
      const response = await apiClient.post("/applications", applicationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get applications for a job
  getByJob: async (jobId) => {
    try {
      const response = await apiClient.get(`/jobs/${jobId}/applications`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all applications (Admin)
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get("/applications", { params }); 
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Categories endpoints
export const categoriesAPI = {
  // Get all categories
  getAll: async () => {
    try {
      const response = await apiClient.get("/categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default apiClient;
