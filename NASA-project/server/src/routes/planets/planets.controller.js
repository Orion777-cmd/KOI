const express = require('express');

const {getHabitablePlanets} = require('../../models/planets.model');

const httpGetAllPlanets = (req, res) => {
    return res.status(200).json(getHabitablePlanets())
}

module.exports = {
    httpGetAllPlanets
}