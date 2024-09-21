import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  status: boolean;
  message: string;
  token?: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

export interface TokenData {
  name: string;
  email: string;
  _id: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | undefined {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return undefined;
  }

  login(loginValues: LoginForm) {
    return this.http.post<AuthenticationResponse>('/api/login', loginValues);
  }

  signUp(signUpValues: SignUpForm) {
    return this.http.post<AuthenticationResponse>('/api/signup', signUpValues);
  }
  passReset(ResetValues: LoginForm) {
    return this.http.post<AuthenticationResponse>('/api/resetpass', ResetValues);
  }

  storeTokenData(token?: string) {
    let tokenData;
    if (token) {
      tokenData = this.jwtHelper.decodeToken(token);
    } else {
      tokenData = this.jwtHelper.decodeToken(this.getToken());
    }
    if (tokenData) {
      localStorage.setItem('tokenData', JSON.stringify(tokenData));
      localStorage.setItem('role', tokenData.role);
      localStorage.setItem('id', tokenData._id);
    }
  }

  getTokenData(): TokenData {
    const tokenData: string | null = localStorage.getItem('tokenData');
    if (!tokenData) {
      return { name: 'Broke', email: 'Broke', _id: 'Broke', role: 'Broke' };
    }
    return JSON.parse(tokenData) as TokenData;
  }

  getRoute(): string {
    const role = localStorage.getItem('role');
    if (role === '2') {
      const id = localStorage.getItem('id');
      return `professors/${id}`;
    } else if (role === '1') {
      return 'home';
    }

    return 'login';
  }

  getRole(): string {
    return localStorage.getItem('role') || '0';
  }
}
