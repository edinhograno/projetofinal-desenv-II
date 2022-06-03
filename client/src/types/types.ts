export type Types = {
  loginData: {
    email: string;
    password: string;
  };
  setLoginData: React.Dispatch<React.SetStateAction<{}>>;
  setData: React.Dispatch<React.SetStateAction<{}>>;
  data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
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
