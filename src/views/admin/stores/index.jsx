import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

import useDebounce from "hooks";
import { convertTimeStamp } from "utils/helper";
import ComplexTable from "views/admin/stores/ComplexTable";
import { columnsData } from "views/admin/stores/columnsData";
import { filterStore } from "actions/filteringActions";
import { exportToFileExcel } from "utils/helper";


export default function Settings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const debounceValue = useDebounce(searchValue, 500); 


  useEffect(() => {
    try{
        const fetchAPI = async()=> {
            setIsLoading(true);
            const response = await filterStore({ pageIndex: 0, pageSize: 1000, keySearch: debounceValue });
            if (response?.code === 0) {
              const formattedResponse = response?.data?.content?.map((item) => ({
                id: item.id,
                storename: item.nameStore,
                expirationdate: convertTimeStamp(item.expireAt, 'dd/MM/yyyy'),
                account: [item.username, item.avatar],
              }));
              setStores(formattedResponse);
            } else {
              if (response?.response?.status === 401) {
                await localStorage.removeItem('user');
                toast.error('Your account is logged in on another device.');
                navigate('/auth/log-in');
              } else toast.error('Loading list of stores unsuccessfully.');               
            }
            setIsLoading(false);
        }
        fetchAPI();     
    } catch(e){
        setIsLoading(false);
        toast.error('Loading list of stores unsuccessfully.');        
    }
  }, [debounceValue]) 


  const handleChangeSearchValue = (value) => {
    if (value) {
      setSearchValue(value);
    }else setSearchValue(null);
  }

  const handleExportToExcel = () => {
    const data = stores.map((item) => {
      return {
        ID: item.id,
        "STORE NAME": item.storename,
        "EXPIRATION DATE": item.expirationdate,
        ACCOUNT: item.account[0],
      };
    })
    exportToFileExcel(data, "Stores");
  }
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ComplexTable
        columnsData={columnsData}
        tableData={stores}
        changeSearchValue={handleChangeSearchValue}
        loading={isLoading}
        exportToExcel={handleExportToExcel}
      />
    </Box>
  );
}
