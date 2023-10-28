const launches = new Map(); 

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,  
    mission: "kepler exploration x",
    rocket: "Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ["NASA", "INSA", "SSA"],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

const addNewLaunch = (launch) => {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customer: ["NASA", "INSA", "SSA"],
        upcoming: true,
        success: true,
    }));
}

const getAllLaunches = () => {
    return Array.from(launches.values());
}

const abortLaunch = (launchId) => {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

const existsLaunchWithId = (launchId) => {
    return launches.has(launchId);
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    existsLaunchWithId,
}