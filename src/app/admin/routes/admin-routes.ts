import { routesTypeDefinition } from 'src/app/utils/types';

export const ADMIN_ROUTES = routesTypeDefinition({
  CORE: {
    path: '',
    fullPath: 'admin',
  },
  USERS: {
    path: 'users',
    fullPath: 'admin/users',
  },
});
