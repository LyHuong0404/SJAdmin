import * as httprequest from 'utils/httprequest';


export const handleMaintenence = async({ update }) => {
    try {
        const response = await httprequest.get('admin/maintenance', { params: { update } });
        return response;
    } catch (err) {
        console.log("Error when handling maintenence: ", err);
    }
}