export interface IUsersServiceCreate {
  email: string;
  password: string;
  name: string;
}
export interface IUsersServiceFindOneByEmail {
  email: string;
}
