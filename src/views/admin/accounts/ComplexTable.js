import {
  Avatar,
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Switch,
  Select,
  IconButton,
  Input
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import { SearchBar } from "components/navbar/searchBar/SearchBar";
import Loading from "components/Loading";
import ModalConfirmation from "components/modal/ModalConfirmation";

function TopCreatorTable(props) {
  const { columnsData, tableData, changeTypeAccount, changeStatusAccount, changeSearchValue, loading, changeStatusSuccess, exportToExcel } = props;
  const [openModalConfirmLock, setOpenModalConfirmLock] = useState(false);
  const [dataLock, setDataLock] = useState({});

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );


  const { 
    getTableProps, 
    getTableBodyProps, 
    state, 
    headerGroups, 
    page, 
    prepareRow, 
    nextPage, 
    previousPage, 
    canNextPage, 
    canPreviousPage, 
    pageOptions, 
    gotoPage, 
    pageCount,
    initialState
  } = tableInstance;
  initialState.pageSize = 6;

  const { pageIndex } = state;
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  const handleOpenModal = (cell) => {
    setOpenModalConfirmLock(true);
    setDataLock(cell.row.original);
  }

  const handleExport = () => {
    exportToExcel();
  }

  return (
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify='space-between'
          w='100%'
          px='22px'
          pb='20px'
          mb='10px'
          boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
          <Text color={textColor} fontSize='xl' fontWeight='600'>
            Accounts Management
          </Text>
          <Flex
            align='center'
          >
            <SearchBar 
              mb={{ base: '10px', md: 'unset' }} 
              me="10px" 
              borderRadius="20px" 
              onChange={(e) => changeSearchValue(e.target.value)}
            />
            <Select
                bg='#F4F7FE'
                borderColor='#E2E8F0'
                color='#422AFB'
                w='140px'
                h='35px'
                me='10px'
                onChange={(e) => changeTypeAccount(e.target.value)}
            >
              <option value='all'>All accounts</option>
              <option value={false}>User</option>
              <option value={true}>Seller</option>
            </Select>
            <Select
                bg='#F4F7FE'
                borderColor='#E2E8F0'
                color='#422AFB'
                w='130px'
                h='35px'
                me='10px'
                onChange={(e) => changeStatusAccount(e.target.value)}
            >
              <option value='all'>All status</option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </Select>
            <Button isDisabled={data.length === 0} leftIcon={<ArrowUpIcon />} colorScheme='blue' mr={3} onClick={handleExport} borderRadius="8px" height="38px">
              Export
            </Button>
          </Flex>
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor='transparent'>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "ID") {
                      data = (
                        <Text
                          color={textColorSecondary}
                          fontSize='sm'
                          fontWeight='500'>
                          {cell.value}
                        </Text>
                      );
                    }
                    else if (cell.column.Header === "Username") {
                      data = (
                        <Flex align='center'>
                          <Avatar
                            src={cell.value[1] || "https://th.bing.com/th/id/OIP.aV3_1sg9QEdADlu5byNWbwAAAA?w=271&h=200&c=7&r=0&o=5&dpr=1.4&pid=1.7"}
                            w='40px'
                            h='40px'
                            me='20px'
                          />
                          <Text
                            color={textColor}
                            fontSize='sm'
                            fontWeight='600'>
                            {cell.value[0]}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "Phone") {
                      data = (
                        <Text
                          color={textColorSecondary}
                          fontSize='sm'
                          fontWeight='500'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Email") {
                      data = (
                        <Text
                          color={textColorSecondary}
                          fontSize='sm'
                          fontWeight='500'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Active") {
                      data = (
                        <Box>
                          <Switch colorScheme='green' isChecked={cell.value} onChange={() => handleOpenModal(cell)}/>
                        </Box>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {data?.length === 0 && <span style={{ textAlign: 'left', marginLeft: '22px' }}>No data to display.</span>}
        {loading && <Loading />}
        {data.length > 0 && 
        <Flex
          justify='space-between'
          px='22px'
        >
          <Text color='#422AFB'>
            Total: {data.length}
          </Text>
          {pageCount > 1 && 
            <Flex align='center'>
              <span>Go to page: {' '} 
                <Input 
                  variant='outline' 
                  w='50px'
                  me='5px'
                  h='30px'
                  textAlign='center'
                  borderColor='teal'
                  borderRadius='5'
                  value={pageIndex + 1 }
                  onChange={(e) => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(pageNumber)
                  }}/>
              </span>
              <IconButton
                  variant='outline'
                  colorScheme='teal'
                  borderRadius='5'
                  aria-label='Go to first page'
                  fontSize={14}
                  icon={<ArrowLeftIcon />}
                  onClick={() => gotoPage(0)}
                  isDisabled={!canPreviousPage}
                  me='5px'
                  h='30px'
                />
                <Button w='50px' me='10px' h='30px' borderRadius='5' colorScheme='teal' variant='outline' onClick={() => previousPage()} isDisabled={!canPreviousPage}>
                  Prev
                </Button>
              <strong style={{ marginRight: '10px' }}>Page {pageIndex + 1} of {pageOptions.length}</strong>
              <Button w='50px' me='5px' h='30px' borderRadius='5' colorScheme='teal' variant='outline' onClick={() => nextPage()} isDisabled={!canNextPage}>
                  Next
              </Button>
              <IconButton
                  variant='outline'
                  colorScheme='teal'
                  borderRadius='5'
                  aria-label='Go to last page'
                  fontSize={14}
                  icon={<ArrowRightIcon />}
                  onClick={() => gotoPage(pageCount - 1)} 
                  isDisabled={!canNextPage}
                  h='30px'
                />
            </Flex>
          }
        </Flex>
        }
        {openModalConfirmLock && <ModalConfirmation data={dataLock} action='account' onCloseModal={() => setOpenModalConfirmLock(false)} onSuccess={() => changeStatusSuccess()}/>}
      </Flex>
    );
}

export default TopCreatorTable;
