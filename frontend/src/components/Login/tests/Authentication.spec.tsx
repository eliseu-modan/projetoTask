import { render, fireEvent, screen , waitFor  } from '@testing-library/react';
import { test , expect ,describe} from 'vitest';
import { AuthenticationProvider  } from '../../../contexts/index'; 
import Login from '../LoginForm/index'; 
import React from 'react';

test('verifica a persistência da sessão após o login', async () => {
  render(
    <AuthenticationProvider>
      <Login />
    </AuthenticationProvider>
  );
})

