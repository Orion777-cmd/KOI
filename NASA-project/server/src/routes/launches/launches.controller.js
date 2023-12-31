const express = require('express');

const {getAllLaunches,
        addNewLaunch,
        abortLaunch,
        existsLaunchWithId,
} = require('../../models/launches.model');

const httpGetAllLaunches = (req, res) => {
    return res.status(200).json(getAllLaunches())

}

const httpAddNewLaunch = (req, res) => {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property"
        });
        
    }
    launch.launchDate = new Date(launch.launchDate);

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date"
        });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}


const httpDeleteLaunch = (req, res) => {
    const launchId = Number(req.params.id);
    if (!existsLaunchWithId(launchId)) {
        return res.status(400).json({
            error: "Launch not found"
        });
    }
    const aborted = abortLaunch(launchId);
    return res.status(200).json(aborted);

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpDeleteLaunch,
}