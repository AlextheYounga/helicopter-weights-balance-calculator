function calculateZeroFuel(gross_values, angle) {
    return gross_values.weight.zero_fuel != 0 ? gross_values.moment[angle].zero_fuel / gross_values.weight.zero_fuel : 0;
}

function calculateEngineStart(gross_values, angle) {
    return gross_values.weight.engine_start != 0 ? gross_values.moment[angle].engine_start / gross_values.weight.engine_start : 0;
}

function calculateLandingWeight(gross_values, angle) {
    return gross_values.weight.landing != 0 ? gross_values.moment[angle].landing / gross_values.weight.landing : 0;
}

function calculateArm(gross_values) {
    gross_values.arm.lat.zero_fuel = calculateZeroFuel(gross_values, 'lat')
    gross_values.arm.lat.engine_start = calculateEngineStart(gross_values, 'lat')
    gross_values.arm.lat.landing = calculateLandingWeight(gross_values, 'lat')

    gross_values.arm.long.zero_fuel = calculateZeroFuel(gross_values, 'long')
    gross_values.arm.long.engine_start = calculateEngineStart(gross_values, 'long')
    gross_values.arm.long.landing = calculateLandingWeight(gross_values, 'long')

    return gross_values
}

module.exports = calculateArm