import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import illustration from "assets/img/intro.jpg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import DefaultAuth from "layouts/auth/Default";
import { login } from "actions/authActions";
import Loading from "components/Loading";


function LogIn() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("red.700", "red.700");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    try {
        const fetchAPI = async() => {
          setLoading(true);
          const response = await dispatch(login({ username, password }));
          if (response?.type.includes('fulfilled')) {          
            if (response?.payload?.roles?.some((item) => item === 'ROLE_ADMIN')) {
                navigate('/admin/dashboard');
            } else toast.error('Access denied.');           
          } else {
              toast.error('Username or password incorrect.');  
          }
          setLoading(false);
        }
        fetchAPI();
    } catch(err) {
        setLoading(false);
        toast.error('Username or password incorrect.');  
    }
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
              Log In
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'>
              Enter your email and password to log in!
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
            <FormControl>
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
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  id='password'
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Password'
                  mb='24px'
                  size='lg'
                  type={show ? "text" : "password"}
                  variant='auth'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={() => setShow(!show)}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex float='right' align='center' mb='24px'>
                <NavLink to='/auth/forgot-password'>
                  <Text
                    _hover={{ textDecoration: 'underline' }}
                    color={textColorBrand}
                    fontSize='sm'
                    w='124px'
                    fontWeight='500'>
                    Forgot Password?
                  </Text>
                </NavLink>
              </Flex>
              <Button
                isDisabled={!username || !password}
                onClick={handleLogin}
                fontSize='md'
                bg='#15803D'
                fontWeight='500'
                color='white'
                w='100%'
                h='50'
                mb='24px'>
                Log In
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </DefaultAuth>
      {loading && <Loading />}
    </>
  );
}

export default LogIn;
