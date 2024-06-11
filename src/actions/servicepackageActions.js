import * as httprequest from 'utils/httprequest';


export const addServicePackage = async({ price, day }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await httprequest.post('admin/add-service-package', { price, day }, config);
        return response;
    }catch(err) {
        console.log("Error when adding service package: ", err);
        return err;
    }
}

export const updateServicePackage = async({ servicePackageId, price, day }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await httprequest.post('admin/update-service-package', { servicePackageId, price, day }, config);
        return response;
    }catch(err) {
        console.log("Error when adding service package: ", err);
        return err;
    }
}

export const lockServicePackage = async(servicePackageId) => {
    try {
        const response = await httprequest.get(`admin/locked-service-package/${servicePackageId}`);
        return response;

    } catch(err) {
        console.log("Error when lock Service Package: ", err);
        return err;
    }
}

export const unlockServicePackage = async(servicePackageId) => {
    try {
        const response = await httprequest.get(`admin/unlocked-service-package/${servicePackageId}`);
        return response;

    } catch(err) {
        console.log("Error when unlock Service Package: ", err);
        return err;
    }
}

export const filterServicePackage = async({ pageIndex, pageSize }) => {
    try {
        const response = await httprequest.get('filter-service-package', { params: { pageIndex, pageSize } });
        return response;
    } catch (err) {
        console.log("Error when filtering service package: ", err);
        return err;
    }
}
