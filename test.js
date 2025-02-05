const obj =
{
    "type": "flight-offer",
    "id": "1",
    "source": "GDS",
    "instantTicketingRequired": false,
    "nonHomogeneous": false,
    "oneWay": false,
    "isUpsellOffer": false,
    "lastTicketingDate": "2025-01-16",
    "lastTicketingDateTime": "2025-01-16",
    "numberOfBookableSeats": 9,
    "itineraries": [
        {
            "duration": "PT10H55M",
            "segments": [
                {
                    "departure": {
                        "iataCode": "EWR",
                        "terminal": "B",
                        "at": "2025-01-16T23:55:00"
                    },
                    "arrival": {
                        "iataCode": "LIS",
                        "terminal": "1",
                        "at": "2025-01-17T11:40:00"
                    },
                    "carrierCode": "TP",
                    "number": "204",
                    "aircraft": {
                        "code": "32Q"
                    },
                    "operating": {
                        "carrierCode": "TP"
                    },
                    "duration": "PT6H45M",
                    "id": "224",
                    "numberOfStops": 0,
                    "blacklistedInEU": false
                },
                {
                    "departure": {
                        "iataCode": "LIS",
                        "terminal": "1",
                        "at": "2025-01-17T13:15:00"
                    },
                    "arrival": {
                        "iataCode": "LGW",
                        "terminal": "S",
                        "at": "2025-01-17T15:50:00"
                    },
                    "carrierCode": "TP",
                    "number": "1336",
                    "aircraft": {
                        "code": "E90"
                    },
                    "operating": {
                        "carrierCode": "NI"
                    },
                    "duration": "PT2H35M",
                    "id": "225",
                    "numberOfStops": 0,
                    "blacklistedInEU": false
                }
            ]
        }
    ],
    "price": {
        "currency": "EUR",
        "total": "697.68",
        "base": "354.00",
        "fees": [
            {
                "amount": "0.00",
                "type": "SUPPLIER"
            },
            {
                "amount": "0.00",
                "type": "TICKETING"
            }
        ],
        "grandTotal": "697.68"
    },
    "pricingOptions": {
        "fareType": [
            "PUBLISHED"
        ],
        "includedCheckedBagsOnly": false
    },
    "validatingAirlineCodes": [
        "TP"
    ],
    "travelerPricings": [
        {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
                "currency": "EUR",
                "total": "348.84",
                "base": "177.00"
            },
            "fareDetailsBySegment": [
                {
                    "segmentId": "224",
                    "cabin": "ECONOMY",
                    "fareBasis": "KL0DSI05",
                    "brandedFare": "DISCOUNT",
                    "brandedFareLabel": "DISCOUNT",
                    "class": "K",
                    "includedCheckedBags": {
                        "quantity": 0
                    },
                    "includedCabinBags": {
                        "quantity": 1
                    },
                    "amenities": [
                        {
                            "description": "FIRST BAG UP TO 23KG AND 158CM",
                            "isChargeable": true,
                            "amenityType": "BAGGAGE",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "SECOND BAG UP TO 23KG AND158CM",
                            "isChargeable": true,
                            "amenityType": "BAGGAGE",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "EXTRA LEG ROOM OR FRONT SEAT",
                            "isChargeable": true,
                            "amenityType": "PRE_RESERVED_SEAT",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "SEAT RESERVATION",
                            "isChargeable": true,
                            "amenityType": "PRE_RESERVED_SEAT",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "MEAL 1",
                            "isChargeable": false,
                            "amenityType": "MEAL",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        }
                    ]
                },
                {
                    "segmentId": "225",
                    "cabin": "ECONOMY",
                    "fareBasis": "KL0DSI05",
                    "brandedFare": "DISCOUNT",
                    "brandedFareLabel": "DISCOUNT",
                    "class": "K",
                    "includedCheckedBags": {
                        "quantity": 0
                    },
                    "includedCabinBags": {
                        "quantity": 1
                    },
                    "amenities": [
                        {
                            "description": "FIRST BAG UP TO 23KG AND 158CM",
                            "isChargeable": true,
                            "amenityType": "BAGGAGE",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "SECOND BAG UP TO 23KG AND158CM",
                            "isChargeable": true,
                            "amenityType": "BAGGAGE",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "EXTRA LEG ROOM OR FRONT SEAT",
                            "isChargeable": true,
                            "amenityType": "PRE_RESERVED_SEAT",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "SEAT RESERVATION",
                            "isChargeable": true,
                            "amenityType": "PRE_RESERVED_SEAT",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "MEAL 1",
                            "isChargeable": false,
                            "amenityType": "MEAL",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "travelerId": "2",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
                "currency": "EUR",
                "total": "348.84",
                "base": "177.00"
            },
            "fareDetailsBySegment": [
                {
                    "segmentId": "224",
                    "cabin": "ECONOMY",
                    "fareBasis": "KL0DSI05",
                    "brandedFare": "DISCOUNT",
                    "brandedFareLabel": "DISCOUNT",
                    "class": "K",
                    "includedCheckedBags": {
                        "quantity": 0
                    },
                    "includedCabinBags": {
                        "quantity": 1
                    },
                    "amenities": [
                        {
                            "description": "FIRST BAG UP TO 23KG AND 158CM",
                            "isChargeable": true,
                            "amenityType": "BAGGAGE",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "SECOND BAG UP TO 23KG AND158CM",
                            "isChargeable": true,
                            "amenityType": "BAGGAGE",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "EXTRA LEG ROOM OR FRONT SEAT",
                            "isChargeable": true,
                            "amenityType": "PRE_RESERVED_SEAT",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "SEAT RESERVATION",
                            "isChargeable": true,
                            "amenityType": "PRE_RESERVED_SEAT",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "MEAL 1",
                            "isChargeable": false,
                            "amenityType": "MEAL",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        }
                    ]
                },
                {
                    "segmentId": "225",
                    "cabin": "ECONOMY",
                    "fareBasis": "KL0DSI05",
                    "brandedFare": "DISCOUNT",
                    "brandedFareLabel": "DISCOUNT",
                    "class": "K",
                    "includedCheckedBags": {
                        "quantity": 0
                    },
                    "includedCabinBags": {
                        "quantity": 1
                    },
                    "amenities": [
                        {
                            "description": "FIRST BAG UP TO 23KG AND 158CM",
                            "isChargeable": true,
                            "amenityType": "BAGGAGE",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "SECOND BAG UP TO 23KG AND158CM",
                            "isChargeable": true,
                            "amenityType": "BAGGAGE",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "EXTRA LEG ROOM OR FRONT SEAT",
                            "isChargeable": true,
                            "amenityType": "PRE_RESERVED_SEAT",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "SEAT RESERVATION",
                            "isChargeable": true,
                            "amenityType": "PRE_RESERVED_SEAT",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        },
                        {
                            "description": "MEAL 1",
                            "isChargeable": false,
                            "amenityType": "MEAL",
                            "amenityProvider": {
                                "name": "BrandedFare"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}