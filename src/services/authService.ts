// authService.ts
export const login = async (
  email: string,
  password: string,
  remember: boolean
) => {
  return new Promise<{ success: boolean; token?: string; message?: string }>(
    (resolve) => {
      setTimeout(() => {
        if (email === "test@tentwenty.com" && password === "123456") {
          const token = Math.random().toString(36).substring(2); // 🔐 Random dummy token
          localStorage.setItem("token", token); // 👉 Use localStorage instead of sessionStorage

          // Save credentials if Remember Me is checked
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
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
