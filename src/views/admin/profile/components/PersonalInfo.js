// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { updateProfile } from "actions/authActions";
import Loading from "components/Loading";
// Custom components
import Card from "components/card/Card.js";
import IconBox from "components/icons/IconBox";
import React, { useState } from "react";
// Assets
import { MdPerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PersonalInfo(props) {
  const { used, total, ...rest } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [phone, setPhone] = useState('');
  const [fullname, setFullname] = useState('');
  const [loading, setLoading] = useState(false);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const box = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const handleUpdateInfo = () => {
    try {
        const fetchAPI = async() => {
            setLoading(true);
            const response = await dispatch(updateProfile({ phone, fullname }));
            if (response?.payload) {
              toast.success('Save profile successfully.');    
            } else {
              if (response?.response?.status === 401) {
                await localStorage.removeItem('user');
                toast.error('Your account is logged in on another device.');
                navigate('/auth/log-in');
              }
              else toast.error('Save profile unsuccessfully.');    
            }
            setLoading(false);
        }
        fetchAPI();
    } catch(err) {
        setLoading(false);
        toast.error('Save profile unsuccessfully.'); 
    }
  }

  return (
    <Card {...rest} mb='20px' align='center' p='20px'>
      <IconBox
        mx='auto'
        h='120px'
        w='120px'
        icon={
          <Icon as={MdPerson} color={brandColor} h='46px' w='46px' />
        }
        bg={box}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        Personal Info
      </Text>
      <Box w='100%' mt='auto'>
        <FormControl mt={4}>
          <FormLabel>Phone</FormLabel>
          <Input placeholder='Phone' defaultValue={user.phone} onChange={(e) => setPhone(e.target.value)}/>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Fullname</FormLabel>
          <Input placeholder='Fullname' defaultValue={user.fullname} onChange={(e) => setFullname(e.target.value)}/>
        </FormControl>   
        <Flex float='right'>
          <Button
            w='100px'
            mt={{ base: "20px", "2xl": "auto" }}
            variant='brand'
            fontWeight='500'
            onClick={handleUpdateInfo}>
            Update
          </Button>
        </Flex>
      </Box>
      {loading && <Loading />}
    </Card>
  );
}
