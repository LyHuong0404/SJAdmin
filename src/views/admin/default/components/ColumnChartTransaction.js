import { format } from "date-fns";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DatePicker } from 'antd';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Card from "components/card/Card.js";
import BarChart from "components/charts/BarChart";
import { barChartOptionsTransactions } from "variables/charts";
import { filterTransaction } from "actions/filteringActions";
import { convertTimeStamp } from "utils/helper";
import Loading from "components/Loading";
const { RangePicker } = DatePicker;


export default function ColumnChartTransaction(props) {
  const { ...rest } = props;
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(format(new Date().setDate(new Date().getDate() - 7), 'yyyy-MM-dd'));
  const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [chartOptions, setChartOptions] = useState(barChartOptionsTransactions);
  const [chartData, setChartData] = useState([]);
  const defaultDateRange = [dayjs().subtract(7, 'day'), dayjs(toDate)];
  const [isLoading, setIsLoading] = useState(true);

  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    try{
        const fetchAPI = async()=> {
            setIsLoading(true);
            const response = await filterTransaction({ pageIndex: 0, pageSize: 1000, fromDate, toDate, orderBy: null, servicePackageId: null, paid: null, keySearch: null });
            if (response?.code === 0) {
              if (response.data.content.every((item) => item.paid === true)) {
                const formattedResponse = response?.data?.content?.map((item) => ({
                  day: item.paid ? (convertTimeStamp(item.payDate, 'dd/MM/yyyy')) : "",
                  amountMoney: item.amount ? item?.amount : 0,
                }));
                const groupedResponse = formattedResponse?.reduce((acc, item) => {
                  const existingItem = acc.find(i => i.day === item.day);
                  if (existingItem) {
                    existingItem.amountMoney += item.amountMoney;
                  } else {
                    acc.push({
                      day: item.day,
                      amountMoney: item.amountMoney,
                    });
                  }
                  return acc;
                }, []).reverse();
                
                setChartOptions((prev) => ({
                  ...prev,
                  xaxis: {
                    categories: groupedResponse?.map(item => item.day),
                    show: false,
                    labels: {
                      show: true,
                      style: {
                        colors: "#A3AED0",
                        fontSize: "14px",
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
                }));
                setChartData([
                  {
                    name: "Total Moneys",
                    data: groupedResponse?.map(item => item.amountMoney)
                  },
                ]);
              } else {
                setChartOptions((prev) => ({
                  ...prev,
                  xaxis: {
                    categories: [],
                    show: false,
                    labels: {
                      show: true,
                      style: {
                        colors: "#A3AED0",
                        fontSize: "14px",
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
                setChartData([]);
              }
            } else {
              if (response?.response?.status === 401) {
                await localStorage.removeItem('user');
                toast.error('Your account is logged in on another device.');
                navigate('/auth/log-in');
              }else toast.error('Loading list of transactions unsuccessfully.');               
            }
            setIsLoading(false);
        }
        fetchAPI();
      
    } catch(e){
        setIsLoading(false);
        toast.error('Loading list of transactions unsuccessfully.');        
    }
  }, [fromDate, toDate]) 

  const handleChangeDateRange = (dates) => {
    if (dates) {
      setFromDate(format(dates[0].$d, 'yyyy-MM-dd'));
      setToDate(format(dates[1].$d, 'yyyy-MM-dd'));
    }
  };

  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px' justify="space-between">
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Transaction statistics
        </Text>
        <RangePicker
          format="DD-MM-YYYY"
          defaultValue={defaultDateRange}
          onChange={handleChangeDateRange}
          style={{ width: '250px', height: '38px' }}
        />
      </Flex>

      <Box h='240px' mt='auto'>
        <BarChart
          chartData={chartData}
          chartOptions={chartOptions}
        />
      </Box>
      {isLoading && <Loading />}
    </Card>
  );
}
