import { Box } from "@chakra-ui/react";
import ComplexTable from "views/admin/stores/ComplexTable";
import { columnsData } from "views/admin/stores/columnsData";
import React, { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import useDebounce from "hooks";
import { toast } from 'react-toastify';
import { convertTimeStamp } from "utils/helper";
import { useNavigate } from "react-router-dom";
import { filterStore } from "actions/filteringActions";


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
                account: [item.username, "https://th.bing.com/th/id/OIP.aV3_1sg9QEdADlu5byNWbwAAAA?w=271&h=200&c=7&r=0&o=5&dpr=1.4&pid=1.7"],
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

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ComplexTable
        columnsData={columnsData}
        tableData={stores}
        changeSearchValue={handleChangeSearchValue}
        loading={isLoading}
      />
    </Box>
  );
}
