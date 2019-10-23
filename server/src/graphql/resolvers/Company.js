import { getUser } from './../../helpers';

export default {
  employees: async (root, args, ctx, info) => {
    let employees = [];
    // root.employees will be an array of just user ids.

    if (root.employees) {
      // lets turn that into actual user data.
      employees = root.employees.map(id => getUser(id));
    }

    return employees;
  }
};
