import * as httprequest from 'utils/httprequest';


export const handleMaintenence = async({ update }) => {
    try {
        const response = await httprequest.get('admin/maintenance', { params: { update } });
        return response;
    } catch (err) {
        console.log("Error when handling maintenence: ", err);
    }
}

export const sendNotificationVendorExpire = async() => {
    try {
        const response = await httprequest.get('admin/send-notification-vendor-expire');
        return response;
    } catch (err) {
        console.log("Error when admin is sending notifications: ", err);
    }
}

export const sendNotificationProductExpire = async() => {
    try {
        const response = await httprequest.get('admin/send-notification-product-expire');
        return response;
    } catch (err) {
        console.log("Error when admin is sending notifications: ", err);
    }
}