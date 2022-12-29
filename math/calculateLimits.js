function calculateLimits(gross_values, vessel_parameters) {
    let forward_limits = {
        engine_start_fuel: gross_values.weight.engine_start < vessel_parameters.weight.vessel.capacity ? 125.2 : false,
        landing_fuel: gross_values.weight.engine_start > 3307 ? 122 : 129.9,
    }

    let aft_limits = {
        engine_start_fuel: gross_values.weight.engine_start > 3880 ? 139.7 - (0.00236 * gross_values.weight.engine_start) : 139.7 - (0.00033 * gross_values.weight.engine_start),
        landing_fuel: gross_values.weight.landing > 3880 ? 139.7 - (0.00236 * gross_values.weight.landing) : 139.7 - (0.00033 * gross_values.weight.landing),
    }

    return [forward_limits, aft_limits]
}

module.exports = calculateLimits