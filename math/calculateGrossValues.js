const _ = require('lodash')

function calculateGrossValues(vessel_parameters, weight, moment) {
    const seatsWeightTotal = _.sum(weight.seats)
    const momentLatSeatsTotalWeight = _.sum(moment.seats.lat)
    const momentLongSeatsTotalWeight = _.sum(moment.seats.long)

    const baggageTotalWeight = _.sum(
        weight.baggage.left,
        weight.baggage.right,
        weight.baggage.aft
    )

    const momentTotalLatBaggageWeight = _.sum(
        moment.baggage.lat.right,
        moment.baggage.lat.left,
        moment.baggage.lat.aft
    )

    const momentTotalLongBaggageWeight = _.sum(
        moment.baggage.long.right,
        moment.baggage.long.left,
        moment.baggage.long.aft
    )

    return {
        weight: {
            zero_fuel: _.sum(_.flatten([
                seatsWeightTotal,
                baggageTotalWeight,
                vessel_parameters.weight.vessel.basic_empty,
            ])),
            engine_start: _.sum(_.flatten([
                seatsWeightTotal,
                baggageTotalWeight,
                weight.fuel.total,
                vessel_parameters.weight.vessel.basic_empty
            ])),
            landing: _.sum(_.flatten([
                seatsWeightTotal,
                baggageTotalWeight,
                weight.fuel.landing,
                vessel_parameters.weight.vessel.basic_empty
            ])),
        },
        moment: {
            lat: {
                zero_fuel: _.sum(_.flatten([
                    momentLatSeatsTotalWeight,
                    momentTotalLatBaggageWeight,
                ])),
                engine_start: _.sum(_.flatten([
                    momentLatSeatsTotalWeight,
                    momentTotalLatBaggageWeight,
                    moment.fuel.lat.engine_start
                ])),
                landing: _.sum(_.flatten([
                    momentLatSeatsTotalWeight,
                    momentTotalLatBaggageWeight,
                    moment.fuel.lat.landing
                ])),
            },
            long: {
                zero_fuel: (
                    vessel_parameters.moment.long.basic,
                    momentLongSeatsTotalWeight,
                    momentTotalLongBaggageWeight
                ),
                engine_start: (
                    vessel_parameters.moment.long.basic,
                    momentLongSeatsTotalWeight,
                    momentTotalLongBaggageWeight,
                    moment.fuel.long.engine_start
                ),
                landing: (
                    vessel_parameters.moment.long.basic,
                    momentLongSeatsTotalWeight,
                    momentTotalLongBaggageWeight,
                    moment.fuel.long.landing
                ),
            },
        },
        arm: {
            lat: {
                zero_fuel: 0,
                engine_start: 0,
                landing: 0,
            },
            long: {
                zero_fuel: 0,
                engine_start: 0,
                landing: 0,
            }
        },
    };
}

module.exports = calculateGrossValues