import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Text,
  IconButton
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  MdLoop,
  MdOutlineStorefront,
  MdGroupAdd 
} from "react-icons/md";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import ChartReportAmount from "views/admin/default/components/ChartReportAmount";
import ColumnChartTransaction from "views/admin/default/components/ColumnChartTransaction";
import { getNewInfoToday } from "actions/filteringActions";
import { BellIcon } from "@chakra-ui/icons";
import { sendNotificationVendorExpire } from "actions/otherActions";
import { sendNotificationProductExpire } from "actions/otherActions";

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

  
  const handleSendNotificationAccountExpire = () => {
    try{
      const fetchAPI = async() => {
        const rs = await sendNotificationVendorExpire();
        if (rs?.code === 0) {
          toast.success('Send notifications successfully.');
        } else toast.error('Send notifications unsuccessfully.');
      }
      fetchAPI();
    } catch(e) {
      toast.error('Send notifications unsuccessfully.');
    }
  }

  const handleSendNotificationProductExpire = () => {
    try{
      const fetchAPI = async() => {
        const rs = await sendNotificationProductExpire();
        if (rs?.code === 0) {
          toast.success('Send notifications successfully.');
        } else toast.error('Send notifications unsuccessfully.');
      }
      fetchAPI();
    } catch(e) {
      toast.error('Send notifications unsuccessfully.');
    }
  }

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
          name='Transactions'
          value={dataToday.totalTransactionToday || 0}
        />
      </SimpleGrid>
      <Text
        textAlign='left'
        fontSize='22px'
        fontWeight='700'
        marginBottom='10px'
        lineHeight='100%'>
        Notifications
      </Text>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              w='56px'
              h='56px'
            >
              <IconButton
                isRound={true}
                variant='solid'
                colorScheme='teal'
                aria-label='Done'
                fontSize='22px'
                size='lg'
                onClick={handleSendNotificationAccountExpire}
                icon={<BellIcon />}
              />
            </Flex>
          }
          name='Send notifications to user accounts about to expire'
        />
        <MiniStatistics
          startContent={
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              w='56px'
              h='56px'
            >
              <IconButton
                isRound={true}
                variant='solid'
                colorScheme='blue'
                aria-label='Done'
                fontSize='22px'
                size='lg'
                onClick={handleSendNotificationProductExpire}
                icon={<BellIcon />}
              />
            </Flex>
          }
          name='Send notifications of expired products to sellers'
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



