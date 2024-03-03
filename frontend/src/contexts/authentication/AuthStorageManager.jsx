import {
  AUTH_STORAGE_DATA_KEY,
  AUTH_STORAGE_ACCESS_TOKEN_KEY,
} from "./constants";

class AuthStorageManager {
  storageManager;

  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  setAuthentication(auth) {
    return new Promise((resolve, reject) => {
      try {
        this.storageManager.setItem(
          AUTH_STORAGE_DATA_KEY,
          auth.authData ? JSON.stringify(auth.authData) : ""
        );

        this.storageManager.setItem(
          AUTH_STORAGE_ACCESS_TOKEN_KEY,
          auth.accessToken || ""
        );

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getAuthentication() {
    return new Promise((resolve, reject) => {
      try {
        const authData = this.storageManager.getItem(AUTH_STORAGE_DATA_KEY);
        const accessToken = this.storageManager.getItem(
          AUTH_STORAGE_ACCESS_TOKEN_KEY
        );

        resolve({
          authData: authData ? JSON.parse(authData) : undefined,
          accessToken: accessToken ? accessToken : undefined,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  clearAuthentication() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.setAuthentication({
          accessToken: undefined,
          authData: undefined,
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default AuthStorageManager;
