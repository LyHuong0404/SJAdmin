import * as httprequest from 'utils/httprequest';


export const getNewInfoToday = async() => {
    try {
        const response = await httprequest.get('admin/info-today');
        return response;
    } catch (err) {
        console.log("Error when admin is getting info today: ", err);
        return err;
    }
}

export const filterAccount = async({ pageIndex, pageSize, keySearch, isVendor, activate }) => {
    try {
        const filters = { pageIndex, pageSize, keySearch, isVendor, activate };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
        const response = await httprequest.get('admin/filter-user', { params: filteredParams });
        return response;
    } catch (err) {
        console.log("Error when filtering account: ", err);
        return err;
    }
}

export const filterTransaction = async({ pageIndex, pageSize, fromDate, toDate, orderBy, servicePackageId, paid, keySearch }) => {
    try {
        const filters = { pageIndex, pageSize, fromDate, toDate, orderBy, servicePackageId, paid, keySearch };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
        const response = await httprequest.get('admin/filter-transaction', { params: filteredParams });
        return response;
    } catch (err) {
        console.log("Error when filtering transaction: ", err);
        return err;
    }
}

export const filterStore = async({ pageIndex, pageSize, keySearch }) => {
    try {
        const filters = { pageIndex, pageSize, keySearch };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
        const response = await httprequest.get('admin/filter-store', { params: filteredParams });
        return response;
    } catch (err) {
        console.log("Error when filtering stores: ", err);
        return err;
    }
}

export const reportAmount = async({ fromDate, toDate }) => {
    try {
        const response = await httprequest.get('admin/amount-user-store-transaction', { params: { fromDate, toDate } });
        return response;
    } catch (err) {
        console.log("Error when getting report amount: ", err);
        return err;
    }
}
