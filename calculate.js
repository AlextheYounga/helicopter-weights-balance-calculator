const geometric = require("geometric");
const _ = require('lodash')
const vessel_parameters = require('./data/vessel-parameters.json') //EC130T2 Vessel Parameters
const weight = require('./data/flight-weight-variables.json') //Flight Weight Variables
const calculateMoment = require('./math/calculateMoment');
const calculateGrossValues = require("./math/calculateGrossValues");
const calculateArm = require('./math/calculateArm')
const calculateLimits = require('./math/calculateLimits')


function calculateWeightsAndBalances() {
    //CG ENVELOPE Checks.
    const ENVELOPE = [[125.2, 5512], [136.6, 5512], [139.7, 3880], [139.7, 3307], [129.9, 3307], [122, 4409]];

    let results = [];

    //Calculating moment from vessel parameters and weight variables.
    let moment = calculateMoment(vessel_parameters, weight)

    let gross_values = calculateGrossValues(vessel_parameters, weight, moment)

    //Calculating arm from answers in gross_values object and adding arm values to object.
    gross_values = calculateArm(gross_values)

    let [forward_limits, aft_limits] = calculateLimits(gross_values, vessel_parameters)

    //Output Messages.
    if (gross_values.weight.engine_start > vessel_parameters.weight.vessel.capacity) {
        results.push("Aircraft is Overweight");
    }
    if (geometric.pointInPolygon([gross_values.arm.long.engine_start, gross_values.weight.engine_start], ENVELOPE) == false) {
        results.push("CG ENVELOPE Breached");
    }
    if (gross_values.arm.long.engine_start < forward_limits.engine_start_fuel || gross_values.arm.long.landing < forward_limits.landing_fuel) {
        results.push("Forward CG Limits Breached");
    }
    if (gross_values.arm.long.engine_start > aft_limits.engine_start_fuel || gross_values.arm.long.landing > aft_limits.landing_fuel) {
        results.push("Aft CG Limits Breached");
    }
    if (results.length == 0) {
        results.push("Success: Aircraft CG Within Limits");
    }

    return results
}

console.log(calculateWeightsAndBalances())
