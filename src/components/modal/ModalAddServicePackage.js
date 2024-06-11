import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { addServicePackage } from "actions/servicepackageActions";
import Loading from "components/Loading";
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ModalAddServicePackage({ onClose, onSuccess }) {
    const navigate = useNavigate();
    const [price, setPrice] = useState('');
    const [day, setDay] = useState('');
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [loading, setLoading] = useState(false);
  
    const handleAddServicePackage = () => {
      try{
        const fetchAPI = async() => {
          setLoading(true);
          const response = await addServicePackage({ price, day });
          if (response?.code === 0) {
            toast.success('Save service package successfully.');    
            onClose();
            onSuccess(); 
          } else {
            if (response?.response?.status === 401) {
              await localStorage.removeItem('user');
              navigate('/auth/log-in');
            } else toast.error('Save service package unsuccessfully.');
          }  
          setLoading(false);
        }
        fetchAPI();
      } catch(e) {
        setLoading(false);
        toast.error('Save service package unsuccessfully.');     
      }
    }


    return (
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Service Package</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <CurrencyInput
                ref={initialRef}
                id="input-price"
                name="input-price"
                placeholder="Price"
                value={price}
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                onValueChange={(value) => setPrice(value)}
                style={{ width: '100%', height: '2.5rem', fontSize: '1rem', borderRadius: 8, border: '1px solid #E2E8F0', paddingInlineStart: '15px', paddingInlineEnd: '15px' }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Days</FormLabel>
              <Input type='number' placeholder='Days' value={day} onChange={(e) => setDay(e.target.value)}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button isDisabled={!day || !price || String(day).startsWith('0')} colorScheme='blue' mr={3} onClick={handleAddServicePackage}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          {loading && <Loading />}
        </ModalContent>
      </Modal>
    )
}

export default ModalAddServicePackage;