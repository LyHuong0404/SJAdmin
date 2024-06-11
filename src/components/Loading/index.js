import React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';


function Loading() {
    return (
        <Flex zIndex='999999' justify="center" align="center" pos="absolute" top="0" left="0" w="full" h="full" bg="rgba(255, 255, 255, 0.5)">
          <Spinner 
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl' 
          />
        </Flex>
    );
}

export default Loading;
