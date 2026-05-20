import { RegisterData, LoginData } from '../lib/types';

const API_URL = 'http://localhost:3000';

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export async function cadastrarUser(data: RegisterData) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function loginUser(data: LoginData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function listarProfissionais(
  filters: Record<string, string> = {}
) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(
    `${API_URL}/professionals${params ? `?${params}` : ''}`,
    {
      method: 'GET',
      headers: getAuthHeader(),
    }
  );
  return res.json();
}

export async function obterProfissionalPorId(id: number | string) {
  const res = await fetch(`${API_URL}/professionals/${id}`, {
    method: 'GET',
    headers: getAuthHeader(),
  });
  return res.json();
}

export async function criarPerfilProfissional(data: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/professionals/profile`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function atualizarPerfilProfissional(
  data: Record<string, unknown>
) {
  const res = await fetch(`${API_URL}/professionals/profile`, {
    method: 'PUT',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adicionarServico(data: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/professionals/services`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function removerServico(id: number | string) {
  const res = await fetch(`${API_URL}/professionals/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  return res.json();
}

export async function criarProposta(data: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/proposals`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function listarMinhasPropostas() {
  const res = await fetch(`${API_URL}/proposals`, {
    method: 'GET',
    headers: getAuthHeader(),
  });
  return res.json();
}

export async function obterPropostaPorId(id: number | string) {
  const res = await fetch(`${API_URL}/proposals/${id}`, {
    method: 'GET',
    headers: getAuthHeader(),
  });
  return res.json();
}

export async function enviarPropostaParaProfissionais(
  id: number | string,
  professionals: unknown[]
) {
  const res = await fetch(`${API_URL}/proposals/${id}/send`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify({ professionals }),
  });
  return res.json();
}

export async function iniciarServico(
  propostaId: number | string,
  professionalId: number | string
) {
  const res = await fetch(
    `${API_URL}/proposals/${propostaId}/start/${professionalId}`,
    {
      method: 'PATCH',
      headers: getAuthHeader(),
    }
  );
  return res.json();
}

export async function finalizarServico(propostaId: number | string) {
  const res = await fetch(`${API_URL}/proposals/${propostaId}/finish`, {
    method: 'PATCH',
    headers: getAuthHeader(),
  });
  return res.json();
}

export async function aceitarProposta(id: number | string) {
  const res = await fetch(`${API_URL}/proposal-professionals/${id}/accept`, {
    method: 'POST',
    headers: getAuthHeader(),
  });
  return res.json();
}

export async function recusarProposta(id: number | string) {
  const res = await fetch(`${API_URL}/proposal-professionals/${id}/reject`, {
    method: 'POST',
    headers: getAuthHeader(),
  });
  return res.json();
}

export async function criarAvaliacao(data: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/ratings`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function listarAvaliacoesPorProfissional(id: number | string) {
  const res = await fetch(`${API_URL}/ratings/professionals/${id}`, {
    method: 'GET',
    headers: getAuthHeader(),
  });
  return res.json();
}
