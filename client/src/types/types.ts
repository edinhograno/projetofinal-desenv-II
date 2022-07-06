export const baseURL = "http://localhost:5000";

export type TypesData = {
  setData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >;
  data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
};

export type TypesLoginData = {
  loginData: {
    email: string;
    password: string;
  };
  setLoginData: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
};

export type TypesLocation = {
  location: {
    loaded: boolean;
    coordinates: {
      lat: string;
      lng: string;
    };
  };
};

export type TypesLogged = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};
