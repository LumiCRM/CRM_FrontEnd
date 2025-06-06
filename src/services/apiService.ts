import axios from 'axios';
import { Agendamento, Cliente } from '../types';
import { User } from './auth/types';
import { Transacao } from '../types/financeiro';

const API_BASE_URL = import.meta.env.VITE_KODA_DESENVOLVIMENTO;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Autenticação
export const signIn = async (email: string, password: string): Promise<any> => {
  try {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
};

export const signUp = async (name: string, email: string, password: string): Promise<any> => {
  try {
    const response = await apiClient.post('/register', { email, password, name });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer registro');
  }
};

export const signOut = async (user: User|null) => {
  try {
    const response = await apiClient.post('/logout', null, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer logout');
  }
}

// Clientes
export const obterClientes = async (user: User|null) => {
  try {
    const response = await apiClient.get('/clients', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao obter clientes');
  }
}

export const salvarCliente = async (dadosCliente: Partial<Cliente>, user: User|null): Promise<Cliente> => {
  try {
    const response = await apiClient.post('/clients', dadosCliente, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao salvar cliente');
  }
};

export const atualizarCliente = async (dadosCliente: Partial<Cliente>, clientId: any,user: User|null): Promise<Cliente> => {
  try {
    const response = await apiClient.put(`/clients/${clientId}`, dadosCliente, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao obter clientes');
  }
}

export const excluirCliente = async (clientId: any, user: User|null) => {
  try {
    const response = await apiClient.delete(`/clients/${clientId}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao deletar cliente');
  }
}

// Agendamentos
export const salvarAgendamento = async (dadosAgendamento: any, user: User|null): Promise<Agendamento> => {
  try {
    const response = await apiClient.post('/appointments', dadosAgendamento, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao criar agendamento');
  }
};

export const atualizarAgendamento = async (agendamentoId: any, dadosAgendamento: any, user: User|null): Promise<Agendamento> => {
  try {
    const response = await apiClient.put(`/appointments/${agendamentoId}`, dadosAgendamento, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar agendamento');
  }
};

export const obterAgendamentos = async (user: User|null) => {
  try {
    const response = await apiClient.get('/appointments', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao obter agendamentos');
  }
}

export const excluirAgendamento = async (agendamentoId: string | number, user: User|null) => {
  try {
    const response = await apiClient.delete(`/appointments/${agendamentoId}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao excluir agendamento');
  }
}

// Financeiro

export const salvarTransacao = async (dadosTransacao: any, user: User|null): Promise<Transacao> => {
  try {
    const response = await apiClient.post('/finances', dadosTransacao, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao criar transação');
  }
}

export const obterTransacoes = async (user: User|null) => {
  try {
    const response = await apiClient.get('/finances', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.finances;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao obter transações');
  }
}

export const alterarTransacao = async (dadosTransacao: Partial<Transacao>, transacaoId: any,user: User|null) => {
  try {
    const response = await apiClient.put(`/finances/${transacaoId}`, dadosTransacao, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar transação!');
  }
}

export const excluirTransacao = async (transacaoId: any, user: User|null) => {
  try {
    const response = await apiClient.delete(`/finances/${transacaoId}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao deletar transacao');
  }
}

// Usuario

export const obterUsuarios = async (user: User|null) => {
  try {
    const response = await apiClient.get('/users', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao obter agendamentos');
  }
}

export const adicionarUsuario = async (dadosUsuario: any, user: User|null) => {
  try {
    const response = await apiClient.post('/users', dadosUsuario, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao adicionar usuário');
  }
}

export const atualizarUsuario = async (userId: any, dadosUsuario: Partial<User>, user: User|null) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, dadosUsuario, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
  }
}

export const atualizarConfigUsuario = async (dadosUsuario: any, user: User|null) => {
  try {
    const response = await apiClient.put(`/settings-user/${user?.id}`, dadosUsuario, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar dados');
  }
}

export const atualizarUsuarioTokenGoogle = async (token: string, user: User|null) => {
  try {
    const response = await apiClient.post(`/users/${user?.id}/add-calendar-token`, { token }, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar token usuário');
  }
}

// Dashboard

export const buscarDadosDashboard = async (user: User|null) => {
  try {
    const response = await apiClient.get('dashboard', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar dados');
  }
}