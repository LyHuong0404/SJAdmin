import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { toast } from 'react-toastify';

import { convertTimeStamp } from "utils/helper";
import ComplexTable from "views/admin/transactions/ComplexTable";
import { columnsData } from "views/admin/transactions/columnsData";
import { filterTransaction } from "actions/filteringActions";
import { filterServicePackage } from "actions/servicepackageActions";
import { exportToFileExcel } from "utils/helper";


export default function Settings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]); 
  const [fromDate, setFromDate] = useState(format(new Date().setDate(new Date().getDate() - 7), 'yyyy-MM-dd'));
  const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [paid, setPaid] = useState(null);
  const [servicePackages, setServicePackages] = useState([]);
  const [servicePackageIdSelected, setServicePackageIdSelected] = useState(null);
  const defaultDateRange = [dayjs().subtract(7, 'day'), dayjs(toDate)];

  useEffect(() => {
    try{
        const fetchAPI = async()=> {
            setIsLoading(true);
            const response = await filterTransaction({ pageIndex: 0, pageSize: 1000, fromDate, toDate, orderBy: null, servicePackageId: servicePackageIdSelected, paid, keySearch: null });
            if (response?.code === 0) {
              const formattedResponse = response?.data?.content?.map((item) => ({
                id: item.id,
                time: item.paid ? (convertTimeStamp(item.payDate, 'dd/MM/yyyy') + ' - ' + item.payTime) : "",
                amount: item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                account: [item.username, item.avatar],
                paid: item.paid ? "Paid" : "Unpaid"
              }));
              setTransactions(formattedResponse);
            } else {
              if (response?.response?.status === 401) {
                await localStorage.removeItem('user');
                toast.error('Your account is logged in on another device.');
                navigate('/auth/log-in');
              } else toast.error('Loading list of transactions unsuccessfully.');               
            }
            setIsLoading(false);
        }
        fetchAPI();
      
    } catch(e){
        setIsLoading(false);
        toast.error('Loading list of transactions unsuccessfully.');        
    }
  }, [paid, servicePackageIdSelected, fromDate, toDate]) 

  useEffect(() => {
    try{
        const fetchAPI = async()=> {
            setIsLoading(true);
            const response = await filterServicePackage({ pageIndex: 0, pageSize: 1000, orderBy: null });
            if (response?.code === 0) {
              response.data.content = response?.data?.content?.map((item) => 
                {
                  return {
                    ...item,
                    price: item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  }
                })
              setServicePackages(response.data.content);
            } else {
              if (response?.response?.status === 401) {
                await localStorage.removeItem('user');
                toast.error('Your account is logged in on another device.');
                navigate('/auth/log-in');
              } else toast.error('Loading list of packages unsuccessfully.');               
            }
            setIsLoading(false);
        }
        fetchAPI();
      
    } catch(e){
        setIsLoading(false);
        toast.error('Loading list of packages unsuccessfully.');        
    }
  }, []) 

  const handleChangeStatusTransaction = (status) => {
    if (status === 'all') {
      setPaid(null);
    } else setPaid(status);

  } 

  const handleChangeServicePackage = (servicePackageId) => {
    if (servicePackageId === 'all') {
      setServicePackageIdSelected(null);
    }else setServicePackageIdSelected(servicePackageId);
  }

  const handleChangeDateRange = (dates) => {
    if (dates) {
      setFromDate(format(dates[0].$d, 'yyyy-MM-dd'));
      setToDate(format(dates[1].$d, 'yyyy-MM-dd'));
    }
  };

  const handleExportToExcel = () => {
    const data = transactions.map((item) => {
      return {
        ID: item.id,
        TIME: item.time,
        AMOUNT: item.amount,
        ACCOUNT: item.account[0],
        STATUS: item.paid
      };
    })
    exportToFileExcel(data, "Transactions");
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ComplexTable
        columnsData={columnsData}
        tableData={transactions}
        changeStatusTransaction={handleChangeStatusTransaction}
        changeServicePackage={handleChangeServicePackage}
        servicePackages={servicePackages}
        loading={isLoading}
        defaultDateRange={defaultDateRange}
        onChangeDate={handleChangeDateRange}
        exportToExcel={handleExportToExcel}
      />
    </Box>
  );
}
