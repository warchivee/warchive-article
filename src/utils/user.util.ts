import type { User } from "./auth.type";
import localStorageUtil, { LS_USER_KEY } from "./securedLocalStorage.util";

const userUtil = {
  save: (user: User) => {
    localStorageUtil.save(LS_USER_KEY, user);
  },

  get: (): User | undefined => {
    try {
      const user = localStorageUtil.get<User>(LS_USER_KEY);

      return user;
    } catch (error) {
      return undefined;
    }
  },

  exist: (): boolean => {
    try {
      const user = userUtil.get();

      return user !== undefined;
    } catch (error) {
      return false;
    }
  },

  remove: () => {
    localStorageUtil.remove(LS_USER_KEY);
  },
};

export default userUtil;
