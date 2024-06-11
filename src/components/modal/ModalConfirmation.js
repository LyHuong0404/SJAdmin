import { Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { unlockAccount } from "actions/authActions";
import { lockAccount } from "actions/authActions";
import { unlockServicePackage } from "actions/servicepackageActions";
import { lockServicePackage } from "actions/servicepackageActions";
import Loading from "components/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ModalConfirmation({ data, onClose, onSuccess, action }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(action || "");

    const handleChangeStatus = () => {
      try{
        const fetchAPI = async() => {
          setLoading(true);
          let response;
          if (action === 'account') {
            if(data?.activate) {
              response = await lockAccount(data.id);
            } else response = await unlockAccount(data.id);
            if (response?.code === 0) {
              toast.success('Save account successfully.');    
              onClose();
            } else {
              if (response?.response?.status === 401) {
                await localStorage.removeItem('user');
                toast.error('Your account is logged in on another device.');
                navigate('/auth/log-in');
              }else toast.error('Save account unsuccessfully.');
            }
          } else {
            if(data?.active) {
              response = await lockServicePackage(data.id);
            } else response = await unlockServicePackage(data.id);
            if (response?.code === 0) {
              toast.success('Save service package successfully.');    
              onClose();
            } else {
              if (response?.response?.status === 401) {
                await localStorage.removeItem('user');
                toast.error('Your account is logged in on another device.');
                navigate('/auth/log-in');
              }else toast.error('Save service package unsuccessfully.');
            }
          } 
          onSuccess(); 
          setLoading(false);
        }
        fetchAPI();
      } catch(e) {
        setLoading(false);
        toast.error('Save unsuccessfully.');     
      }
    }


    return (
      <Modal blockScrollOnMount={false} isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {target === 'servicepackage' ? 
                data.activated ? "Service package will be locked. Sure?" : "Service package will be unlocked. Sure?"
                : data.activate ? "Account will be unlocked. Sure?" : "Account will be locked. Sure?"}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleChangeStatus}>
              Yes
            </Button>
            <Button variant='ghost'>No</Button>
          </ModalFooter>
          {loading && <Loading />}
        </ModalContent>
      </Modal>
    )
}

export default ModalConfirmation;