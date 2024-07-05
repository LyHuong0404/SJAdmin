import React from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Flex align='center' direction='column'>
      <Text
        color={textColor}
        fontSize='30px'
        fontWeight='700'
        lineHeight='100%'
        mt='10px'
        mb='35px'>
        SoBanHang
      </Text>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
