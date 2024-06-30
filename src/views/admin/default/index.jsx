import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";


import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdLoop,
  MdOutlineStorefront,
  MdGroupAdd 
} from "react-icons/md";

import ChartReportAmount from "views/admin/default/components/ChartReportAmount";
import ColumnChartTransaction from "views/admin/default/components/ColumnChartTransaction";
import { toast } from 'react-toastify';

import { getNewInfoToday } from "actions/filteringActions";
import { useNavigate } from "react-router-dom";

export default function UserReports() {
  const navigate = useNavigate();
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [dataToday, setDataToday] = useState([]);

  useEffect(() => {
    try{
        const fetchAPI = async()=> {
          const response = await getNewInfoToday();
          if (response?.code === 0) {
              setDataToday(response.data);
          } else {
            if (response?.response?.status === 401) {
              await localStorage.removeItem('user');
              toast.error('Your account is logged in on another device.');
              navigate('/auth/log-in');
            } else toast.error('Loading unsuccessfully.');        
          }
        }
        fetchAPI();
    } catch(e){
      toast.error('Loading unsuccessfully.');        
    }
  }, [])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdGroupAdd} color={brandColor} />
              }
            />
          }
          name='Accounts'
          value={dataToday.newUserToday || 0}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdOutlineStorefront} color={brandColor} />
              }
            />
          }
          name='Stores'
          value={dataToday.newVendorToday || 0}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdLoop} color='white' />}
            />
          }
          name='Transaction'
          value={dataToday.totalTransactionToday || 0}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
        <ChartReportAmount />
        <ColumnChartTransaction />
      </SimpleGrid>
    </Box>
  );
}
/* eslint-disable jsx-a11y/anchor-is-valid */



