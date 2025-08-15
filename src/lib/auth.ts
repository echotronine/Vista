import { account } from './appwrite';
import { ID } from 'appwrite';

export interface User {
  $id: string;
  name: string;
  email: string;
}

export class AuthService {
  async createAccount(email: string, password: string, name: string) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await account.get();
      return user as User;
    } catch (error) {
      return null;
    }
  }

  async updatePassword(password: string, oldPassword: string) {
    try {
      await account.updatePassword(password, oldPassword);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email: string) {
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();