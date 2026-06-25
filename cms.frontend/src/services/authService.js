import axiosClient from "../api/axiosClient";

const CUSTOMER_KEY = "tricms_customer";

const authService = {
  register: async (data) => {
    const response = await axiosClient.post("/Auth/CustomerRegister", data);
    return response.data || response;
  },

  login: async (data) => {
    const response = await axiosClient.post("/Auth/CustomerLogin", data);
    const result = response.data || response;

    if (result?.customerId) {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(result));
      window.dispatchEvent(new Event("authChanged"));
    }

    return result;
  },

  logout: () => {
    localStorage.removeItem(CUSTOMER_KEY);
    window.dispatchEvent(new Event("authChanged"));
  },

  getCurrentCustomer: () => {
    try {
      const raw = localStorage.getItem(CUSTOMER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      localStorage.removeItem(CUSTOMER_KEY);
      return null;
    }
  },
};

export default authService;
