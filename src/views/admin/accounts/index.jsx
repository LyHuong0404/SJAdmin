import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


import Card from "components/card/Card.js";
import ComplexTable from "views/admin/accounts/ComplexTable";
import { tableColumns } from "views/admin/accounts/tableColumns";
import useDebounce from "hooks";
import { filterAccount } from "actions/filteringActions";
import { exportToFileExcel } from "utils/helper";


export default function Accounts(props) {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const debounceValue = useDebounce(searchValue, 500); 
  const [isVendor, setIsVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusAccountFilter, setStatusAccountFilter] = useState(null);

  const getListAccounts = async(debounceValue, isVendor)=> {
    setIsLoading(true);
    const response = await filterAccount({ pageIndex: 0, pageSize: 1000, keySearch: debounceValue, isVendor, activate: statusAccountFilter });
    if (response) {
      let formattedResponse = response?.content?.map((item) => ({
        id: item.id,
        username: [item.username, item.avatar],
        phone: item.phone,
        email: item.email,
        active: item.activate
      }));
      setAccounts(formattedResponse); 
    } else {
        if (response?.response?.status === 401) {
          await localStorage.removeItem('user');
          toast.error('Your account is logged in on another device.');
          navigate('/auth/log-in');
        } else toast.error('Loading list of accounts unsuccessfully.');      
    }  
    
    setIsLoading(false);
  }

  useEffect(() => {
    try{
      getListAccounts(debounceValue, isVendor);     
    } catch(e){
        setIsLoading(false);
        toast.error('Loading list of accounts unsuccessfully.');        
    }
  }, [debounceValue, isVendor, statusAccountFilter])  

  const handleChangeTypeAccount = (data) => {
    if (data === 'all') {
      setIsVendor(null);
    } else setIsVendor(data);
  } 

  const changeStatusSuccess = (data) => {
    getListAccounts(debounceValue, isVendor);     
  }

  const handleChangeSearchValue = (data) => {
    if (data) {
      setSearchValue(data);
    } else setSearchValue(null);
  }

  const handleExportToExcel = () => {
    const data = accounts.map((item) => {
      return {
        ID: item.id,
        USERNAME: item.username[0],
        PHONE: item.phone,
        EMAIL: item.email,
        ACTIVE: item.activate
      };
    })
    exportToFileExcel(data, "Accounts");
  }

  const handleChangeStatusAccount = (value) => {
    if (value === 'all') {
      value = null;
    }
    setStatusAccountFilter(value);
  }

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Card px='0px' mb='20px'>
          <ComplexTable
            tableData={accounts}
            columnsData={tableColumns}
            changeTypeAccount={handleChangeTypeAccount}
            changeStatusSuccess={changeStatusSuccess}
            loading={isLoading}
            changeSearchValue={handleChangeSearchValue}
            exportToExcel={handleExportToExcel}
            changeStatusAccount={handleChangeStatusAccount}
          />
      </Card>
    </Box>
  );
}
