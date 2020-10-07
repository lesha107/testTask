export interface UserBase {
  name: string;
  number: string;
  email: string;
  password: string;
  role: string;
  id?: string;
}

export interface UserOptions extends UserBase {
  birthday: string;
}

export interface FirebaseUserOptions extends UserBase {
  birthday: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  password: string;
  saller: boolean;
  client: boolean;
}
