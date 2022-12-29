function calculateMoment(vessel_parameters, weight) {
    return {
        seats: {
            lat: [
                vessel_parameters.arm.seats.lat[0] * weight.seats[0],
                vessel_parameters.arm.seats.lat[1] * weight.seats[1],
                vessel_parameters.arm.seats.lat[2] * weight.seats[2],
                vessel_parameters.arm.seats.lat[3] * weight.seats[3],
                vessel_parameters.arm.seats.lat[4] * weight.seats[4],
                vessel_parameters.arm.seats.lat[5] * weight.seats[5],
                vessel_parameters.arm.seats.lat[6] * weight.seats[6],
            ],
            long: [
                vessel_parameters.arm.seats.long[0] * weight.seats[0],
                vessel_parameters.arm.seats.long[1] * weight.seats[1],
                vessel_parameters.arm.seats.long[2] * weight.seats[2],
                vessel_parameters.arm.seats.long[3] * weight.seats[3],
                vessel_parameters.arm.seats.long[4] * weight.seats[4],
                vessel_parameters.arm.seats.long[5] * weight.seats[5],
                vessel_parameters.arm.seats.long[6] * weight.seats[6],
            ],
        },
        baggage: {
            lat: {
                left: weight.baggage.left * vessel_parameters.arm.baggage.lat.left,
                right: weight.baggage.right * vessel_parameters.arm.baggage.lat.right,
                aft: weight.baggage.aft * vessel_parameters.arm.baggage.lat.aft,
            },
            long: {
                left: weight.baggage.left * vessel_parameters.arm.baggage.long.left,
                right: weight.baggage.right * vessel_parameters.arm.baggage.long.right,
                aft: weight.baggage.aft * vessel_parameters.arm.baggage.long.aft,
            }
        },
        fuel: {
            lat: {
                engine_start: weight.fuel.total * vessel_parameters.arm.fuel.lat,
                landing: weight.fuel.landing * vessel_parameters.arm.fuel.lat,
            },
            long: {
                engine_start: weight.fuel.total * vessel_parameters.arm.fuel.long,
                landing: weight.fuel.landing * vessel_parameters.arm.fuel.long,
            }
        },
    };
}

module.exports = calculateMoment