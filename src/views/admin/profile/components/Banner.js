import { Avatar, Flex, FormControl, FormLabel, Input, Text, useColorModeValue } from "@chakra-ui/react";
import { updateAvatar } from "actions/authActions";
import Loading from "components/Loading";
import Card from "components/card/Card.js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Banner(props) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const[loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  const handleAvatarUpload = (e) => {
        const formData = new FormData();
        formData.append('avatarFile', e.target.files[0]);

        try {
            const fetchAPI = async () => {
                setLoading(true);
                const response = await dispatch(updateAvatar(formData));
                if (response?.payload) {
                    toast.success('Save avatar successfully.');
                } else {
                  if (response?.response?.status === 401) {
                    await localStorage.removeItem('user');
                    toast.error('Your account is logged in on another device.');
                    navigate('/auth/log-in');
                  } else toast.error('Save avatar unsuccessfully.');
                }
                setLoading(false);
            };
            fetchAPI();
        } catch (error) {
          toast.error('Save avatar unsuccessfully.');
        }
  }

  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleAvatarUpload}
      />
      <Avatar
				_hover={{ cursor: 'pointer' }}
        mx='auto'
        src={user.avatar || "https://th.bing.com/th/id/OIP.aV3_1sg9QEdADlu5byNWbwAAAA?w=271&h=200&c=7&r=0&o=5&dpr=1.4&pid=1.7"}
        size='2xl'
        border='4px solid'
        borderColor={borderColor}
        onClick={() => document.querySelector('input[type="file"]').click()}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {user.username}
      </Text>
      <Text color={textColorSecondary} >
        Super Admin
      </Text>
      <Flex w='100%' mx='auto' mt='26px'>
        <FormControl mt={4}>
          <FormLabel>Username</FormLabel>
          <Input isDisabled placeholder='Username' defaultValue={user.username} />
        </FormControl>
      </Flex>
      <Flex w='100%' mx='auto'>
        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input isDisabled placeholder='Email' defaultValue={user.email} />
        </FormControl>
      </Flex>
      {loading && <Loading />}
    </Card>
  );
}
