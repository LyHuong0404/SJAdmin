import {
	Avatar,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
} from '@chakra-ui/react';

import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';


import routes from 'routes.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'actions/authActions';
import { toast } from 'react-toastify';

export default function HeaderLinks(props) {
	const dispatch = useDispatch();
	const { secondary } = props;
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	// Chakra Color Mode
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);

	const handleLogout = () => {
		try {
			const fetchAPI = async() => {
			  	await dispatch(logout()); 
				navigate("/auth/log-in")
			}
			fetchAPI();
		} catch(err) {
			toast.error('Logout unsuccessfully.');  
		}
	}

	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			{/* <SearchBar mb={secondary ? { base: '10px', md: 'unset' } : 'unset'} me="10px" borderRadius="30px" /> */}
			
			<SidebarResponsive routes={routes} />

			<Menu>
				<MenuButton p="0px">
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color="white"
						name="admin"
						bg="#11047A"
						size="sm"
						w="40px"
						h="40px"
						src={user.avatar || "https://th.bing.com/th/id/OIP.aV3_1sg9QEdADlu5byNWbwAAAA?w=271&h=200&c=7&r=0&o=5&dpr=1.4&pid=1.7"}
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={textColor}>
							👋&nbsp; Hey, {user.username}
						</Text>
					</Flex>
					<Flex flexDirection="column" p="10px">
						<MenuItem _hover={{ bg: 'none', cursor: 'pointer' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px" onClick={() => navigate('/admin/profile')}>
							<Text fontSize="sm">Profile Settings</Text>
						</MenuItem>
						<MenuItem
							_hover={{ bg: 'none', cursor: 'pointer' }}
							_focus={{ bg: 'none' }}
							color="red.400"
							borderRadius="8px"
							px="14px">
							<Text fontSize="sm" onClick={handleLogout}>Log out</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
