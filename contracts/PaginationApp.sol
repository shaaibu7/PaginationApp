// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract PaginationApp {
    struct Appointment {
        uint clientId;
        address client;
        uint appointmentTime;
        bool confirm;
    }

    uint public clientIdCount = 1;

    Appointment[] appointments;

    // error

    error InvalidPageSize();

    function bookAppointment(uint appointmentTime) external {
        appointments.push(Appointment({
            clientId: clientIdCount,
            client: msg.sender,
            appointmentTime: appointmentTime,
            confirm: false
        }));
        clientIdCount += 1;
    }

    function fetchAppointment(uint pageOffset, uint pageSize) external returns(Appointment[] memory) {
        uint amountOfAppointment = appointments.length;
        uint limit = pageOffset + pageSize;
        

        if (limit > amountOfAppointment) {
            revert InvalidPageSize();
            
        }

        // construct an array to return
        uint appointmentsToFetch = pageSize + 1;

        Appointment[] memory appointmentData = new Appointment[](appointmentsToFetch);

        uint index = 0;
        for (uint j = pageOffset; j < appointmentsToFetch; j++) {
            appointmentData[index] = appointments[j];
            index += 1;
        }

        return appointmentData;

    }

    //getter functions

    function getAppointment() external view returns(Appointment[] memory) {
        return appointments;
    }


}
