import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

export async function fetchTerms() {
  return axios.get(`${API_BASE}/api/terms`).then(r => r.data);
}

export async function fetchTerm(id) {
  return axios.get(`${API_BASE}/api/terms/${id}`).then(r => r.data);
}

export async function fetchGraph() {
  return axios.get(`${API_BASE}/api/graph`).then(r => r.data);
}