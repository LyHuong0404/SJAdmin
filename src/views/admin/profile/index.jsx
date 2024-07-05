import React from "react";
import { Box, Grid } from "@chakra-ui/react";

import Banner from "views/admin/profile/components/Banner";
import ChangePassword from "views/admin/profile/components/ChangePassword";
import PersonalInfo from "views/admin/profile/components/PersonalInfo";

export default function Overview() {
  
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Banner
          gridArea='1 / 1 / 2 / 2'
        />
        <ChangePassword
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
        />
        <PersonalInfo
          gridArea={{
            base: "3 / 1 / 2 / 2",
            lg: "1 / 3 / 2 / 4",
          }}
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe='20px'
          pb={{ base: "100px", lg: "20px" }}
        />
      </Grid>
    </Box>
  );
}
