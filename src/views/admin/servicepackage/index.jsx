import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { convertTimeStamp } from "utils/helper";

import ComplexTable from "views/admin/servicepackage/ComplexTable";
import { columnsData } from "views/admin/servicepackage/columnsData";
import { filterServicePackage } from "actions/servicepackageActions";


export default function ServicePackages() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [servicePackages, setServicePackages] = useState([]);

  const getAllServicePackage = async()=> {
    setIsLoading(true);
    const response = await filterServicePackage({ pageIndex: 0, pageSize: 1000 });
    
    if (response?.code === 0) {
      const formattedResponse = response?.data?.content?.map((item) => ({
        id: item.id,
        price: item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        day: item.day.toString(),
        createdat: convertTimeStamp(item.createdAt, 'dd/MM/yyyy'),
        updatedat: convertTimeStamp(item.updatedAt, 'dd/MM/yyyy'),
        active: item.activated
      }));
      setServicePackages(formattedResponse);
    } else {
      if (response?.response?.status === 401) {
        await localStorage.removeItem('user');
        toast.error('Your account is logged in on another device.');
        navigate('/auth/log-in');
      } else toast.error('Loading list of service packages unsuccessfully.');               
    }
    setIsLoading(false);
  }

  useEffect(() => {
    try{       
      getAllServicePackage();     
    } catch(e){
        setIsLoading(false);
        toast.error('Loading list of service packages unsuccessfully.');        
    }
  }, []) 

  const handleLoadingAgain = () => {
    getAllServicePackage();  
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ComplexTable
        columnsData={columnsData}
        tableData={servicePackages}
        loading={isLoading}
        CRUDSuccess={handleLoadingAgain}
      />
    </Box>
  );
}
