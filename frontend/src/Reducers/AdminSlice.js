import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice(
    {
        name: "Admin",
        initialState: {
            data: null,
            token: null
        },
        reducers: {
            login(state, action) {
                state.data = action.payload.data;
                state.token = action.payload.token;
                localStorage.setItem("admin", JSON.stringify(action.payload.data));
                localStorage.setItem("admin-token", action.payload.token);
                localStorage.setItem("admin-login-stamp", new Date().getTime());
            },
            logout(state) {
                state.data = null;
                localStorage.removeItem("admin");
                localStorage.removeItem("admin-login-stamp");
            },
            lsToAdmin(state, action) {
                state.data = action.payload.data;
                state.token = action.payload.token;
            }
        }
    }
);

export const { login, logout, lsToAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;