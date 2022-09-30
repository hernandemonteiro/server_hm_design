export interface iUsersService {
  get(id: string);

  deleteUser(_id: string);

  updateUser(id: string, name: string, email: string, password: string);
  
  login(email: string, password: string);
}
