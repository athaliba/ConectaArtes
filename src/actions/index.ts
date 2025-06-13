// LOGIN

export const loginUser = async (emailOrUsername: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3000/users/login', {
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
    const response = await fetch('http://localhost:3000/users/register', {
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

// BUSCAR TODOS OS PRODUTOS
export const fetchProducts = async () => {
  const response = await fetch('http://localhost:3000/products/list');
  return response.json();
};

// CADASTRAR NOVO PRODUTO
export const createProduct = async (product: {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}, token: string) => {
  const response = await fetch('http://localhost:3000/products/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Erro ao criar produto');
  }

  return response.json();
};

// ADICIONAR UM ITEM AO CARRINHO

export const addToCart = async (productId: string, token: string) => {
  const res = await fetch('http://localhost:3000/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erro ao adicionar ao carrinho');
  }

  return await res.json();
};


// BUSCAR O CARRINHO DE UM USUARIO
export const fetchCart = async (userId: string, token: string) => {
  const response = await fetch(`http://localhost:3000/cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Erro ao buscar carrinho');
  }

  return response.json();
};

// CHECKOUT SIMULADO
export const checkout = async (token: string) => {
  const response = await fetch('http://localhost:3000/checkout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Erro no checkout');
  }

  return response.json();
};

export const getAuth = () => {
  return {
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
  };
};
