import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Input, Button, IconButton, Box, Switch } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

// Custom components
import Card from "components/card/Card";

// Assets
import Loading from "components/Loading";
import { AddIcon, ArrowLeftIcon, ArrowRightIcon, EditIcon } from "@chakra-ui/icons";
import ModalEditServicePackage from "components/modal/ModalEditServicePackage";
import ModalAddServicePackage from "components/modal/ModalAddServicePackage";
import ModalConfirmation from "components/modal/ModalConfirmation";


export default function ColumnsTable(props) {
  const { 
    columnsData, 
    tableData, 
    loading,
    CRUDSuccess
  } = props;
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalConfirmLock, setOpenModalConfirmLock] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
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
    headerGroups,
    page,
    prepareRow,
    initialState,
    state, 
    nextPage, 
    previousPage, 
    canNextPage, 
    canPreviousPage, 
    pageOptions, 
    gotoPage, 
    pageCount
  } = tableInstance;
  const { pageIndex } = state;

  initialState.pageSize = 8;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const handleOpenModalEdit = (row) => {
    row = {...row, price: row.price.replace(".","")}
    setDataEdit(row);
    setOpenModalEdit(true);
  }

  return (
    <>
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='25px' justify='space-between' mb='20px' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'>
            Service Package Management
          </Text>
          <Button leftIcon={<AddIcon />} fontSize={16} variant='action' colorScheme='teal' onClick={() => setOpenModalAdd(true)}>
            Add
          </Button>
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}>
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
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "PRICE") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "DAYS") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    }  else if (cell.column.Header === "CREATED AT") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      )
                    } else if (cell.column.Header === "UPDATED AT") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      )
                    } else if (cell.column.Header === "ACTIVE") {
                      data = (
                        <Box>
                          <Switch colorScheme='green' isChecked={cell.value} onChange={() => setOpenModalConfirmLock(true)}/>
                        </Box>
                      );
                    }  
                    else if (cell.column.Header === "") {
                      data = (
                        <Box 
                          display="flex"
                          justifyContent="center"
                          _hover={{
                            cursor: "pointer",
                        }}>
                          <EditIcon w={6} h={4} color="#422AFB" onClick={() => handleOpenModalEdit(cell.row.values)}/>
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
          {data?.length > 0 && 
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
              </Flex>}
          </Flex>}
      </Card>
        {openModalAdd && <ModalAddServicePackage onClose={() => setOpenModalAdd(false)} onSuccess={() => CRUDSuccess()}/>}
        {openModalEdit && <ModalEditServicePackage data={dataEdit} onClose={() => setOpenModalEdit(false)} onSuccess={() => CRUDSuccess()}/>}
        {openModalConfirmLock && <ModalConfirmation action="servicepackage" data={dataEdit} onClose={() => setOpenModalConfirmLock(false)} onSuccess={() => CRUDSuccess()}/>}
    </>
  );
}
