import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdLock } from "react-icons/md";
import React, { useState } from "react";
import { toast } from "react-toastify";

import Card from "components/card/Card.js";
import IconBox from "components/icons/IconBox";
import { changePw } from "actions/authActions";
import Loading from "components/Loading";


export default function ChangePassword(props) {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [error, setError] = useState('');
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandStars = useColorModeValue("red.700", "red.700");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const [loading, setLoading] = useState(false);


  const box = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const handleChangePassword = () => {
    try{
        const fetchAPI = async() => {
            setLoading(true);
            const response = await changePw({ currentPassword, newPassword});
            if (response?.code === 0) {
              toast.success('Change password successfully.');    
            } else {
              if (response?.response?.status === 401) {
                await localStorage.removeItem('user');
                toast.error('Your account is logged in on another device.');
                navigate('/auth/log-in');
              } else toast.error('Change password unsuccessfully.');    
            }
            setLoading(false);
        }
        fetchAPI();
    } catch(err) {
        setLoading(false);
        toast.error('Change password unsuccessfully.'); 
    }
  }

  const handleCheckValidNewPw = (e) => {
    const newPassword = e.target.value;

    // check special
    const specialCharacterRegex = /[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/?]+/;
    const hasSpecialCharacter = specialCharacterRegex.test(newPassword);

    // check number
    const digitRegex = /\d/;
    const hasDigit = digitRegex.test(newPassword);

    // check upper character
    const uppercaseRegex = /[A-Z]/;
    const hasUppercase = uppercaseRegex.test(newPassword);

    // check lower character
    const lowercaseRegex = /[a-z]/;
    const hasLowercase = lowercaseRegex.test(newPassword);

    // check length
    const isLengthValid = newPassword.length >= 8;

    if (newPassword === '') {
        setError('Password is required.');
    } else {
        setError('');
    }

    if (newPassword.trim() !== '') {
        if (!hasSpecialCharacter) {
            setError('At least 1 special character.');
        } else if (!hasDigit) {
          setError('At least 1 digit character.');
        } else if (!hasUppercase) {
          setError('At least 1 uppercase character.');
        } else if (!hasLowercase) {
          setError('At least 1 lowercase character.');
        } else if (!isLengthValid) {
          setError('At least 8 characters');
        } else {
          setError('');
        }
    }
    setNewPassword(newPassword);
  };

  
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <IconBox
        mx='auto'
        h='120px'
        w='120px'
        icon={
          <Icon as={MdLock} color={brandColor} h='46px' w='46px' />
        }
        bg={box}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        Change Password
      </Text>
      <Box w='100%' mt='auto'>
        <FormControl mt={4}>
        <Flex alignItems="center">
          <FormLabel>Current Password</FormLabel>
          <Text color={brandStars}>*</Text>
        </Flex>
          <InputGroup size='md'>
            <Input
              id='password'
              fontSize={15}
              isRequired={true}
              placeholder='Current password'
              size='md'
              type={showCurrentPassword ? "text" : "password"}
              variant='auth'
              value={currentPassword}
              borderRadius='7px'
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <InputRightElement display='flex' alignItems='center' mt='4px'>
              <Icon
                color={textColorSecondary}
                _hover={{ cursor: "pointer" }}
                as={showCurrentPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mt={4}>
          <Flex alignItems="center">
            <FormLabel>New Password</FormLabel>
            <Text color={brandStars}>*</Text>
          </Flex>
          <InputGroup size='md'>
            <Input
              id='newpassword'
              fontSize={15}
              isRequired={true}
              placeholder='New password'
              size='md'
              type={showNewPassword ? "text" : "password"}
              variant='auth'
              value={newPassword}
              borderRadius='7px'
              onChange={handleCheckValidNewPw}
            />
            <InputRightElement display='flex' alignItems='center' mt='4px'>
              <Icon
                color={textColorSecondary}
                _hover={{ cursor: "pointer" }}
                as={showNewPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>   
        {error && <Text textAlign='start' color="red.400" fontSize="sm">{error}</Text>}
        <Flex float='right'>
          <Button
            isDisabled={!currentPassword || !newPassword || error}
            w='100px'
            mt={{ base: "20px", "2xl": "auto" }}
            variant='brand'
            fontWeight='500' 
            onClick={handleChangePassword}>
            Change
          </Button>
        </Flex>
      </Box>
      {loading && <Loading />}
    </Card>
  );
}
