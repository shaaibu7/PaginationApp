import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// const tokenAddress = "0x233A66dB39b5BA93993383b2B4E08E6FA81be8AB";

const PaginationModule = buildModule("PaginationModule", (m) => {

    const pagination = m.contract("PaginationApp");

    return { pagination };
});

export default PaginationModule;
