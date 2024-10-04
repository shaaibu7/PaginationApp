import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Appointment", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployPginationApp() {
    
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const paginationApp = await hre.ethers.getContractFactory("PaginationApp");
    const pagination = await paginationApp.deploy();

    return { pagination, owner, otherAccount };
  }


  describe("Test book appointment function", function() {
     it("should test for book appointment function", async function() {
      const { pagination, owner, otherAccount } = await loadFixture(deployPginationApp);

      expect(await pagination.clientIdCount()).to.eq(1);

      const addAppointment = await pagination.bookAppointment(1);
      const addAppointment2 = await pagination.bookAppointment(2);

      const result = await pagination.getAppointment();
      expect(await result.length).to.eq(2);
     })

     it("should test for fetch appointment function", async function() {
      const { pagination, owner, otherAccount } = await loadFixture(deployPginationApp);

      expect(await pagination.clientIdCount()).to.eq(1);

      const addAppointment = await pagination.bookAppointment(1);
      const addAppointment2 = await pagination.bookAppointment(2);
      const addAppointment3 = await pagination.bookAppointment(2);
      const addAppointment4 = await pagination.bookAppointment(2);
      const addAppointment5 = await pagination.bookAppointment(2);
      const addAppointment6 = await pagination.bookAppointment(2);
      const addAppointment7 = await pagination.bookAppointment(2);

      const result = await pagination.getAppointment();
      expect(await result.length).to.eq(7);

      const dataLength = await pagination.fetchAppointment(3, 2);
      console.log(dataLength);

      expect(await dataLength.length).to.eq(3);
     })
  })

  });
