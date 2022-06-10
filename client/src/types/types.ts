export type TypesData = {
  setData: React.Dispatch<React.SetStateAction<{}>>;
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
  setLoginData: React.Dispatch<React.SetStateAction<{}>>;
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
