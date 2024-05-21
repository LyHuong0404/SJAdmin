import * as httprequest from 'utils/httprequest';
import { createAsyncThunk } from '@reduxjs/toolkit';

//login
export const login = createAsyncThunk('auth', async ({ username, password, notifyToken }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const { data, code } = await httprequest.post('auth', { username, password, notifyToken }, config);

        if (code === 0) {
            await localStorage.setItem('user', JSON.stringify(data));
            return data;
        } else {
            return rejectWithValue('Invalid Email Or Password');
        }
    } catch (error) {
        console.log("Error when login: ", error);
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
            return rejectWithValue('Thất bại');
        }
    } catch (error) {
        console.log("Error when updating user's profile: ", error);
    }
});