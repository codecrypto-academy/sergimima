const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("OrganizationRegistryModule", (m) => {
  const organizationRegistry = m.contract("OrganizationRegistry");

  return { organizationRegistry };
});