// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React, { useEffect, useState } from "react";
// Assets
import { lineChartOptionsReportAmount } from "variables/charts";

import { DatePicker } from 'antd';
import { format } from "date-fns";
import dayjs from "dayjs";
import { reportAmount } from "actions/filteringActions";
import { convertTimeStamp } from "utils/helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";
const { RangePicker } = DatePicker;

export default function TotalSpent(props) {
  const { ...rest } = props;
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(format(new Date().setDate(new Date().getDate() - 7), 'yyyy-MM-dd'));
  const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const defaultDateRange = [dayjs().subtract(7, 'day'), dayjs(toDate)];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chartOptions, setChartOptions] = useState(lineChartOptionsReportAmount);


  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
     try {
         const fetchAPI = async()=> {
           setLoading(true);
           const response = await reportAmount({ fromDate, toDate });
           if (response?.code === 0) {
            response.data = response?.data?.map((item) => {
              return {
                ...item,
                createdAt: convertTimeStamp(item.createdAt, 'dd/MM/yyyy')
              };
            });
              const formatData = [
                {
                  name: "New user",
                  data: response?.data?.map(item => item.amountUser)
                },
                {
                  name: "New seller",
                  data: response?.data?.map(item => item.amountVendor)
                },
                {
                  name: "New transaction",
                  data: response?.data?.map(item => item.amountPayment)
                }
              ]
              setData(formatData);
              setChartOptions((prev) => ({
                ...prev,
                xaxis: {
                  type: "numeric",
                  categories: response?.data?.map(item => item.createdAt),
                  labels: {
                    style: {
                      colors: "#A3AED0",
                      fontSize: "12px",
                      fontWeight: "500",
                    },
                  },
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
              }))
           } else {
            if (response?.response?.status === 401) {
              await localStorage.removeItem('user');
              navigate('/auth/log-in');
            } else toast.error('Loading report amount unsuccessfully.');
           }
           setLoading(false);
         }
         fetchAPI()
     } catch (e) {
         setLoading(false);
         toast.error('Loading report amount unsuccessfully.');    
     }
  }, [fromDate, toDate])

  const handleChangeDateRange = (dates) => {
    setFromDate(format(dates[0].$d, 'yyyy-MM-dd'));
    setToDate(format(dates[1].$d, 'yyyy-MM-dd'));
  };

  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%' justify="space-between">
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Statistics on the number of new accounts, stores, and transactions
        </Text>
        <RangePicker
          format="DD-MM-YYYY"
          defaultValue={defaultDateRange}
          onChange={handleChangeDateRange}
          style={{ width: '250px', height: '38px' }}
        />
      </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        <Box minH='260px' w='100%' mt='auto'>
          <LineChart
            chartData={data}
            chartOptions={chartOptions}
          />
        </Box>
      </Flex>
      {loading && <Loading />}
    </Card>
  );
}
