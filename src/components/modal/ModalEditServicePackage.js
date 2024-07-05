import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { updateServicePackage } from "actions/servicepackageActions";
import Loading from "components/Loading";

function ModalEditServicePackage({ data, onClose, onSuccess }) {
    const navigate = useNavigate(); 
    const [dataEdit, setDataEdit] = useState(data);
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [loading, setLoading] = useState(false);
  
    const handleChangePrice = (value) => {
        setDataEdit((prevState) => ({ ...prevState, price: value }));
    }

    const handleChangeDays = (value) => {
        setDataEdit({...dataEdit, day: value });
    }

    const handleUpdateSP = (data) => {
      try{
        const fetchAPI = async() => {
          setLoading(true);
          const response = await updateServicePackage({ servicePackageId: dataEdit.id, price: dataEdit.price, day: dataEdit.day });
          if (response?.code === 0) {
            toast.success('Save service package successfully.');  
            onClose();  
            onSuccess(); 
          } else {
            if (response?.response?.status === 401) {
              await localStorage.removeItem('user');
              toast.error('Your account is logged in on another device.');
              navigate('/auth/log-in');
            }else toast.error('Save service package unsuccessfully.');  
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
          <ModalHeader>Update Service Package</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <CurrencyInput
                ref={initialRef}
                id="input-price"
                name="input-price"
                placeholder="Price"
                value={dataEdit.price}
                decimalsLimit={2}
                groupSeparator="."
                decimalSeparator=","
                onValueChange={(value) => handleChangePrice(value)}
                style={{ width: '100%', height: '2.5rem', fontSize: '1rem', borderRadius: 8, border: '1px solid #E2E8F0', paddingInlineStart: '15px', paddingInlineEnd: '15px' }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Days</FormLabel>
              <Input type='number' placeholder='Days' defaultValue={dataEdit.day} onChange={(e) => handleChangeDays(e.target.value)}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button isDisabled={!dataEdit.day || !dataEdit.price || String(dataEdit.day).startsWith('0')} colorScheme='blue' mr={3} onClick={handleUpdateSP}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          {loading && <Loading />}
        </ModalContent>
      </Modal>
    )
}

export default ModalEditServicePackage;