// LOGIN

export const loginUser = async (emailOrUsername: string, password: string) => {
  try {
    const response = await fetch('https://backend-rankeat.vercel.app/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: emailOrUsername, password }), // pode ser email ou username
    });

    const data = await response.json();

    if (response.ok) {
      // Salvar token e userId no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      return { success: true, token: data.token, userId: data.userId };
    } else {
      return { success: false, message: data.message || 'Login failed. Please try again.' };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
};


// REGISTRO

export const registerUser = async (name: string, username: string, email: string, password: string) => {
  try {
    const response = await fetch('https://backend-rankeat.vercel.app/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error registering user');
    }

    return await response.json();  // Retorna a resposta do servidor
  } catch (error: unknown) {  // Aqui especificamos 'unknown' para o tipo de erro
    if (error instanceof Error) {
      throw new Error(error.message || 'An unexpected error occurred');  // Agora podemos acessar error.message
    } else {
      throw new Error('An unexpected error occurred');  // Caso o erro não seja uma instância de Error
    }
  }
};

// FAVORITOS

export const fetchFavoritos = async (userId: string, token: string) => {
  try {
    const response = await fetch(`https://backend-rankeat.vercel.app/favorites/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar favoritos');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao buscar favoritos');
    } else {
      throw new Error('Erro inesperado ao buscar favoritos');
    }
  }
};

export const addFavorito = async (
  favoritoData: {
    userId: string;
    restaurantId: string;
    restaurantName: string;
    restaurantLocation: string;
  },
  token: string
) => {
  try {
    const response = await fetch(`https://backend-rankeat.vercel.app/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(favoritoData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao adicionar favorito');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao adicionar favorito');
    } else {
      throw new Error('Erro inesperado ao adicionar favorito');
    }
  }
};

export const removeFavorito = async (
  userId: string,
  restaurantId: string,
  token: string
) => {
  try {
    const response = await fetch(`https://backend-rankeat.vercel.app/favorites/${userId}/${restaurantId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao remover favorito');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao remover favorito');
    } else {
      throw new Error('Erro inesperado ao remover favorito');
    }
  }
};

// HISTÓRICO

export const fetchHistorico = async (token: string, limit = 10) => {
  try {
    const response = await fetch(`https://backend-rankeat.vercel.app/search-history?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar histórico');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao buscar histórico');
    } else {
      throw new Error('Erro inesperado ao buscar histórico');
    }
  }
};


export const addHistorico = async (
  buscaData: {
    cep: string;
    latitude: number;
    longitude: number;
    userId?: string;
    ipAddress?: string;
  },
  token: string
) => {
  try {
    const response = await fetch(`https://backend-rankeat.vercel.app/search-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(buscaData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao adicionar histórico');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Erro inesperado ao adicionar histórico');
    } else {
      throw new Error('Erro inesperado ao adicionar histórico');
    }
  }
};


