import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useState } from "react";
import { toast } from 'react-toastify';

import illustration from "assets/img/intro.jpg";
import Loading from "components/Loading";
import { getCodeForgotPassword } from "actions/authActions";
import { checkCodeForgotPassword } from "actions/authActions";
import { recoverPassword } from "actions/authActions";



function ForgotPassword() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("red.700", "red.700");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [errorNewPw, setErrorNewPw] = useState('');
  const [errorConfirmNewPw, setErrorConfirmNewPw] = useState('');

  const handleRecoveryPassword = () => {
    try {
        const fetchAPI = async() => {
          setLoading(true);
          const fetchApi = await recoverPassword({ username, newPassword });
            if (fetchApi?.code === 0) {
                toast.success('Recover password successfully.');  
                navigate("auth/log-in");
            } else {
                toast.error('Recover password unsuccessfully.');
            }
          setLoading(false);
        }
        fetchAPI();
    } catch(err) {
        setLoading(false);
        toast.error('Recover password unsuccessfully.');
    }
  }
  
  const gotoNextStep = () => {
    if (step === 1) {
      const handleGetCodeForgotPassword = async() => {
        try {
            if (username === 'admin') {
                const response = await getCodeForgotPassword({username});
                if (response?.code === 0) {
                  setStep(2)
                } else toast.error('Username does not exist.')
            } else toast.error('Username access denied.')
        } catch(err) {
          toast.error('Get code unsuccessfully.')
        }
      }
      handleGetCodeForgotPassword();
    }
    else if (step === 2) {
      const handleCheckCodeForgotPassword = async() => {
        try {
            const response = await checkCodeForgotPassword({ username, code})
            if (response?.code === 0) {
              setStep(3)
            } else {
              toast.error('Invalid Code.')
            }
        } catch(err) {
          toast.error('Get code unsuccessfully.')
        }
      }
      handleCheckCodeForgotPassword();
    }
  }

  const handleCheckInvalidPw = (e) => {
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
        setErrorNewPw('Password is required.');
      } else setErrorNewPw('');

      if (newPassword.trim() !== '') {
        if (!hasSpecialCharacter) {
          setErrorNewPw('At least 1 special character.');
        } else if (!hasDigit) {
          setErrorNewPw('At least 1 digit character.');
        } else if (!hasUppercase) {
          setErrorNewPw('At least 1 uppercase character.');
        } else if (!hasLowercase) {
          setErrorNewPw('At least 1 lowercase character.');
        } else if (!isLengthValid) {
          setErrorNewPw('At least 8 characters');
        } else {
          setErrorNewPw('');
        }
      }
      setNewPassword(newPassword);
  } 

  const checkMatchPassword = (e) => {
    const value = e.target.value;
    if (value !== newPassword) {
      setErrorConfirmNewPw('Password is not match.');
    } else setErrorConfirmNewPw('');
    setConfirmNewPassword(value);
  }

  const handleBackStep = () => {
    setStep(step - 1);
  }

  return (
    <>
      <DefaultAuth illustrationBackground={illustration} image={illustration}>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w='100%'
          mx={{ base: "auto", lg: "0px" }}
          me='auto'
          h='100%'
          alignItems='start'
          justifyContent='center'
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection='column'>
          <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px' textAlign='left'>
              Recovery Password
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'>
              Enter your username, verify code and recovery password!
            </Text>
          </Box>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: "auto", lg: "unset" }}
            me='auto'
            mb={{ base: "20px", md: "auto" }}>
            <Flex mb='30px'>
              <Progress
                variant='table'
                colorScheme='blue'
                h='6px'
                w='35%'
                value={100}
              />
              <Progress
                variant='table'
                colorScheme='blue'
                h='6px'
                w='35%'
                value={step === 2 || step === 3 ? 100 : 0}
              />
              <Progress
                variant='table'
                colorScheme='blue'
                h='6px'
                w='35%'
                value={step === 3 ? 100 : 0}
              />
            </Flex>
            {step === 1 && <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Username<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                _focus={{ borderColor: '#15803D' }}
                id='username'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='text'
                placeholder='Username'
                mb='24px'
                fontWeight='500'
                size='lg'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Button
                isDisabled={!username}
                onClick={gotoNextStep}
                fontSize='md'
                bg='#15803D'
                fontWeight='500'
                color='white'
                float='right'
                w='35%'
                h='45'
                mb='24px'>
                Continue
              </Button>
            </FormControl>}
            {step === 2 && <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Code<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                _focus={{ borderColor: '#15803D' }}
                id='code'
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='number'
                placeholder='Code'
                mb='24px'
                fontWeight='500'
                size='lg'
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
              <Flex align='center' justify='space-between'>
                <Text
                  textDecoration='underline'
                  color={textColorBrand}
                  fontSize='md'
                  fontWeight='500'
                  onClick={handleBackStep}>
                  Back
                </Text>
                <Button
                  isDisabled={!code}
                  onClick={gotoNextStep}
                  fontSize='md'
                  bg='#15803D'
                  fontWeight='500'
                  color='white'
                  w='35%'
                  h='45'
                  mb='24px'>
                  Continue
                </Button>
              </Flex>
            </FormControl>}
            {step === 3 && <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                New Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  id='password'
                  isRequired={true}
                  fontSize='sm'
                  placeholder='New Password'
                  size='lg'
                  type={showNewPassword ? "text" : "password"}
                  variant='auth'
                  value={newPassword}
                  onChange={handleCheckInvalidPw}
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
            {errorNewPw && <Text textAlign='start' color="red.400" fontSize="sm">{errorNewPw}</Text>}

              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mt='24px'
                mb='8px'>
                Confirm New Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  id='confirmpassword'
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Confirm New Password'
                  size='lg'
                  type={showConfirmNewPassword ? "text" : "password"}
                  variant='auth'
                  value={confirmNewPassword}
                  onChange={checkMatchPassword}
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={showConfirmNewPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  />
                </InputRightElement>
              </InputGroup>
            {errorConfirmNewPw && <Text textAlign='start' color="red.400" fontSize="sm">{errorConfirmNewPw}</Text>}

            <Flex align='center' justify='space-between'>
                <Text
                  textDecoration='underline'
                  color={textColorBrand}
                  fontSize='md'
                  fontWeight='500'
                  mt='20px'
                  onClick={handleBackStep}>
                  Back
                </Text>
                <Button
                  isDisabled={!newPassword || !confirmNewPassword || errorNewPw || errorConfirmNewPw}
                  onClick={handleRecoveryPassword}
                  fontSize='md'
                  bg='#15803D'
                  fontWeight='500'
                  color='white'
                  w='40%'
                  h='45'
                  mb='24px'
                  mt='24px'>
                  Recovery password
                </Button>
              </Flex>
            </FormControl>}
          </Flex>
        </Flex>
      </DefaultAuth>
      {loading && <Loading />}
    </>
  );
}

export default ForgotPassword;
