import * as httprequest from 'utils/httprequest';
import { createAsyncThunk } from '@reduxjs/toolkit';


//login
export const login = createAsyncThunk('auth', async ({ username, password, provider = "LOCAL" }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const { data, code } = await httprequest.post('auth', { username, password, provider }, config);

        if (code === 0) {
            await localStorage.setItem('user', JSON.stringify(data));
            return data;
        } else {
            return rejectWithValue('Invalid Email Or Password');
        }
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const logout = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const { data, code } = await httprequest.post('logout', {}, config);

        if (code === 0) {
            await localStorage.removeItem('user');
            return data;
        } else {
            return rejectWithValue('Logout unsuccessfully');
        }
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const updateProfile = createAsyncThunk('update-user-info', async ({ phone, fullname }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await httprequest.post('update-user-info', { phone, fullname } , config);

        if (response?.code === 0) {
            const updateInfoFromAsyncStorage = async() => {
                const userJson = await localStorage.getItem('user');
                const userData = JSON.parse(userJson);
                
                userData.user = response?.data;
                await localStorage.setItem('user', JSON.stringify(userData));
            }
            updateInfoFromAsyncStorage();
            
            return response?.data;
        } else {
            return rejectWithValue('Error when updating user info');
        }
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const updateAvatar = createAsyncThunk('update-avatar', async (formData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await httprequest.post('update-avatar', formData , config);
        if (response?.code === 0) {
            const updateInfoFromAsyncStorage = async() => {
                const userJson = localStorage.getItem('user');
                const userData = JSON.parse(userJson);
                
                userData.user = response?.data;
                await localStorage.setItem('user', JSON.stringify(userData));
            }
            updateInfoFromAsyncStorage();
            
            return response?.data;
        } else {
            return rejectWithValue('Error when updating avatar');
        }
    } catch (error) {
        console.log("Error when updating avatar: ", error);
    }
});

export const changePw = async ({ currentPassword, newPassword }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('change-password', { currentPassword, newPassword }, config);
        return response;
    } catch (err) {
        console.log("Error when changing password: ", err);
        return err;
    }
}

export const getCodeForgotPassword = async ({ username }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('get-code-forgot-password', { username }, config);
        return response;
    } catch (err) {
        console.log("Error when getting code to recovery password: ", err);
        return err;
    }
} 

export const checkCodeForgotPassword = async ({ username, code }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('check-code-forgot-password', { username, code }, config);
        return response;
    } catch (err) {
        console.log("Error when checking code to recovery password: ", err);
        return err;
    }
}

export const recoverPassword = async ({ username, newPassword }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('forgot-password', { username, newPassword }, config);
        return response;
    } catch (err) {
        console.log("Error when recovering password: ", err);
        return err;
    }
} 


export const lockAccount = async(userId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try{
        const response = await httprequest.get(`admin/ban-account/${userId}`, config);
        return response;
    }catch(err) {
        console.log("Error when locking account: ", err);
        return err;
    }
}

export const unlockAccount = async(userId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try{
        const response = await httprequest.get(`admin/unban-account/${userId}`, config);
        return response;
    }catch(err) {
        console.log("Error when unlocking account: ", err);
        return err;
    }
}