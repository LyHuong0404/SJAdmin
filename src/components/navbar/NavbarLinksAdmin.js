import {
	Avatar,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Switch,
	Text,
	Tooltip,
	useColorModeValue
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


import { SidebarResponsive } from 'components/sidebar/Sidebar';
import routes from 'routes.js';
import { logout } from 'actions/authActions';
import ModalConfirmation from 'components/modal/ModalConfirmation';
import { handleMaintenence } from 'actions/otherActions';

export default function HeaderLinks(props) {
	const dispatch = useDispatch();
	const { secondary } = props;
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const [statusSystem, setStatusSystem] = useState(false);
	const [openModalConfirm, setOpenModalConfirm] = useState(false);

	// Chakra Color Mode
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	
	useEffect(() => {
		handleUpdateMaintenence(false);
	}, [])

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

	const handleUpdateMaintenence = async(status) => {
		try {
			const response = await handleMaintenence({ update: status });
			if (response?.code === 0) {      
			  setStatusSystem(response.data.maintenance);
			  setOpenModalConfirm(false);
			} else {
				if (response?.response?.status === 401) {
					setOpenModalConfirm(false);
					await localStorage.removeItem('user');
					navigate('/auth/log-in');
				} 
				else toast.error('System status update failed.');  
			}
		} catch(err) {
			toast.error('System status update failed.');  
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
						<Tooltip label="The system will stop working during maintenance">
							<MenuItem _hover={{ bg: 'none', cursor: 'pointer' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px" onClick={() => navigate('/admin/profile')} style={{ display: 'flex', alignItems: 'space-between'}}>
								<Text fontSize="sm" style={{ marginRight: '20px'}}>System is maintenance</Text>
								<Switch colorScheme='green' isChecked={statusSystem} onChange={() => handleUpdateMaintenence(true)}/>
							</MenuItem>
						</Tooltip>
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
			{openModalConfirm && <ModalConfirmation action='maintenence' onCloseModal={() => setOpenModalConfirm(false)} onSuccess={() => handleUpdateMaintenence(true)}/>}
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
