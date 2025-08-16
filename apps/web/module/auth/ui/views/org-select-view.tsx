import { OrganizationList } from "@clerk/nextjs";
import React from "react";
const OrgSelectView = () => {
  return (
    <OrganizationList
      afterCreateOrganizationUrl={"/"}
      afterSelectOrganizationUrl={"/"}
      hidePersonal
      skipInvitationScreen
    />
  );
};

export default OrgSelectView;
