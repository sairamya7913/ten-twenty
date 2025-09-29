export const login = async (
  email: string,
  password: string,
  remember: boolean
) => {
  return new Promise<{ success: boolean; token?: string; message?: string }>(
    (resolve) => {
      setTimeout(() => {
        if (email === "test@tentwenty.com" && password === "123456") {
          const token = "dummy-token";
          sessionStorage.setItem("token", token);

          // ✅ Save credentials if Remember me is checked
          if (remember) {
            localStorage.setItem(
              "credentials",
              JSON.stringify({ email, password })
            );
          } else {
            localStorage.removeItem("credentials");
          }

          resolve({ success: true, token });
        } else {
          resolve({ success: false, message: "Invalid email or password" });
        }
      }, 500);
    }
  );
};

export const getSavedCredentials = () => {
  const creds = localStorage.getItem("credentials");
  return creds ? JSON.parse(creds) : null;
};


export const isAuthenticated = () => {
  return !!sessionStorage.getItem("token");
};

export const logout = () => {
  sessionStorage.removeItem("token");
};
