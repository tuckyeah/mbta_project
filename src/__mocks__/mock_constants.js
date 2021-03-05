export const MOCK_ROUTES_RESPONSE = {
  "data": [
    {
      "attributes": {
        "color": "DA291C",
        "description": "Rapid Transit",
        "direction_destinations": [
          "Ashmont/Braintree",
          "Alewife"
        ],
        "direction_names": [
          "South",
          "North"
        ],
        "fare_class": "Rapid Transit",
        "long_name": "Red Line",
        "short_name": "",
        "sort_order": 10010,
        "text_color": "FFFFFF",
        "type": 1
      },
      "id": "Red",
      "links": {
        "self": "/routes/Red"
      },
      "relationships": {
        "line": {
          "data": {
            "id": "line-Red",
            "type": "line"
          }
        },
        "route_patterns": {}
      },
      "type": "route"
    },
    {
      "attributes": {
        "color": "DA291C",
        "description": "Rapid Transit",
        "direction_destinations": [
          "Mattapan",
          "Ashmont"
        ],
        "direction_names": [
          "Outbound",
          "Inbound"
        ],
        "fare_class": "Rapid Transit",
        "long_name": "Mattapan Trolley",
        "short_name": "",
        "sort_order": 10011,
        "text_color": "FFFFFF",
        "type": 0
      },
      "id": "Mattapan",
      "links": {
        "self": "/routes/Mattapan"
      },
      "relationships": {
        "line": {
          "data": {
            "id": "line-Mattapan",
            "type": "line"
          }
        },
        "route_patterns": {}
      },
      "type": "route"
    },
    {
      "attributes": {
        "color": "ED8B00",
        "description": "Rapid Transit",
        "direction_destinations": [
          "Forest Hills",
          "Oak Grove"
        ],
        "direction_names": [
          "South",
          "North"
        ],
        "fare_class": "Rapid Transit",
        "long_name": "Orange Line",
        "short_name": "",
        "sort_order": 10020,
        "text_color": "FFFFFF",
        "type": 1
      },
      "id": "Orange",
      "links": {
        "self": "/routes/Orange"
      },
      "relationships": {
        "line": {
          "data": {
            "id": "line-Orange",
            "type": "line"
          }
        },
        "route_patterns": {}
      },
      "type": "route"
    },
    {
      "attributes": {
        "color": "00843D",
        "description": "Rapid Transit",
        "direction_destinations": [
          "Boston College",
          "Park Street"
        ],
        "direction_names": [
          "West",
          "East"
        ],
        "fare_class": "Rapid Transit",
        "long_name": "Green Line B",
        "short_name": "B",
        "sort_order": 10032,
        "text_color": "FFFFFF",
        "type": 0
      },
      "id": "Green-B",
      "links": {
        "self": "/routes/Green-B"
      },
      "relationships": {
        "line": {
          "data": {
            "id": "line-Green",
            "type": "line"
          }
        },
        "route_patterns": {}
      },
      "type": "route"
    },
    {
      "attributes": {
        "color": "00843D",
        "description": "Rapid Transit",
        "direction_destinations": [
          "Cleveland Circle",
          "North Station"
        ],
        "direction_names": [
          "West",
          "East"
        ],
        "fare_class": "Rapid Transit",
        "long_name": "Green Line C",
        "short_name": "C",
        "sort_order": 10033,
        "text_color": "FFFFFF",
        "type": 0
      },
      "id": "Green-C",
      "links": {
        "self": "/routes/Green-C"
      },
      "relationships": {
        "line": {
          "data": {
            "id": "line-Green",
            "type": "line"
          }
        },
        "route_patterns": {}
      },
      "type": "route"
    },
    {
      "attributes": {
        "color": "00843D",
        "description": "Rapid Transit",
        "direction_destinations": [
          "Riverside",
          "Government Center"
        ],
        "direction_names": [
          "West",
          "East"
        ],
        "fare_class": "Rapid Transit",
        "long_name": "Green Line D",
        "short_name": "D",
        "sort_order": 10034,
        "text_color": "FFFFFF",
        "type": 0
      },
      "id": "Green-D",
      "links": {
        "self": "/routes/Green-D"
      },
      "relationships": {
        "line": {
          "data": {
            "id": "line-Green",
            "type": "line"
          }
        },
        "route_patterns": {}
      },
      "type": "route"
    },
    {
      "attributes": {
        "color": "00843D",
        "description": "Rapid Transit",
        "direction_destinations": [
          "Heath Street",
          "North Station"
        ],
        "direction_names": [
          "West",
          "East"
        ],
        "fare_class": "Rapid Transit",
        "long_name": "Green Line E",
        "short_name": "E",
        "sort_order": 10035,
        "text_color": "FFFFFF",
        "type": 0
      },
      "id": "Green-E",
      "links": {
        "self": "/routes/Green-E"
      },
      "relationships": {
        "line": {
          "data": {
            "id": "line-Green",
            "type": "line"
          }
        },
        "route_patterns": {}
      },
      "type": "route"
    },
    {
      "attributes": {
        "color": "003DA5",
        "description": "Rapid Transit",
        "direction_destinations": [
          "Bowdoin",
          "Wonderland"
        ],
        "direction_names": [
          "West",
          "East"
        ],
        "fare_class": "Rapid Transit",
        "long_name": "Blue Line",
        "short_name": "",
        "sort_order": 10040,
        "text_color": "FFFFFF",
        "type": 1
      },
      "id": "Blue",
      "links": {
        "self": "/routes/Blue"
      },
      "relationships": {
        "line": {
          "data": {
            "id": "line-Blue",
            "type": "line"
          }
        },
        "route_patterns": {}
      },
      "type": "route"
    }
  ],
  "jsonapi": {
    "version": "1.0"
  }
}

export const MOCK_STOPS_RESPONSE = {
  "data": [
    {
      "attributes": {
        "address": "Cambridge St and New Chardon St/Bowdoin St, Boston, MA 02114",
        "at_street": null,
        "description": null,
        "latitude": 42.361365,
        "location_type": 1,
        "longitude": -71.062037,
        "municipality": "Boston",
        "name": "Bowdoin",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 2
      },
      "id": "place-bomnl",
      "links": {
        "self": "/stops/place-bomnl"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-bomnl"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "Cambridge St and Court St, Boston, MA",
        "at_street": null,
        "description": null,
        "latitude": 42.359705,
        "location_type": 1,
        "longitude": -71.059215,
        "municipality": "Boston",
        "name": "Government Center",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-gover",
      "links": {
        "self": "/stops/place-gover"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-gover"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "200 Washington St, Boston, MA",
        "at_street": null,
        "description": null,
        "latitude": 42.358978,
        "location_type": 1,
        "longitude": -71.057598,
        "municipality": "Boston",
        "name": "State",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-state",
      "links": {
        "self": "/stops/place-state"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-state"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "Atlantic Ave and State St, Boston, MA 02120",
        "at_street": null,
        "description": null,
        "latitude": 42.359784,
        "location_type": 1,
        "longitude": -71.051652,
        "municipality": "Boston",
        "name": "Aquarium",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-aqucl",
      "links": {
        "self": "/stops/place-aqucl"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-aqucl"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "Sumner St and Maverick Sq, East Boston, MA",
        "at_street": null,
        "description": null,
        "latitude": 42.369119,
        "location_type": 1,
        "longitude": -71.03953,
        "municipality": "Boston",
        "name": "Maverick",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-mvbcl",
      "links": {
        "self": "/stops/place-mvbcl"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-mvbcl"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "Transportation Way and Service Rd, Boston, MA 02128",
        "at_street": null,
        "description": null,
        "latitude": 42.374262,
        "location_type": 1,
        "longitude": -71.030395,
        "municipality": "Boston",
        "name": "Airport",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-aport",
      "links": {
        "self": "/stops/place-aport"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-aport"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "450 Bennington St, East Boston, MA",
        "at_street": null,
        "description": null,
        "latitude": 42.37964,
        "location_type": 1,
        "longitude": -71.022865,
        "municipality": "Boston",
        "name": "Wood Island",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-wimnl",
      "links": {
        "self": "/stops/place-wimnl"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-wimnl"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "1000 Bennington St, East Boston, MA 02128",
        "at_street": null,
        "description": null,
        "latitude": 42.386867,
        "location_type": 1,
        "longitude": -71.004736,
        "municipality": "Boston",
        "name": "Orient Heights",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-orhte",
      "links": {
        "self": "/stops/place-orhte"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-orhte"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "1230 Bennington St, East Boston, MA 02128",
        "at_street": null,
        "description": null,
        "latitude": 42.390501,
        "location_type": 1,
        "longitude": -70.997123,
        "municipality": "Boston",
        "name": "Suffolk Downs",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-sdmnl",
      "links": {
        "self": "/stops/place-sdmnl"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-sdmnl"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "630 Winthrop Ave, Revere, MA 02151",
        "at_street": null,
        "description": null,
        "latitude": 42.397542,
        "location_type": 1,
        "longitude": -70.992319,
        "municipality": "Revere",
        "name": "Beachmont",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-bmmnl",
      "links": {
        "self": "/stops/place-bmmnl"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-bmmnl"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "220 Shirley Ave, Revere, MA",
        "at_street": null,
        "description": null,
        "latitude": 42.407843,
        "location_type": 1,
        "longitude": -70.992533,
        "municipality": "Revere",
        "name": "Revere Beach",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-rbmnl",
      "links": {
        "self": "/stops/place-rbmnl"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-rbmnl"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    },
    {
      "attributes": {
        "address": "1300 North Shore Rd, Revere, MA 02151",
        "at_street": null,
        "description": null,
        "latitude": 42.41342,
        "location_type": 1,
        "longitude": -70.991648,
        "municipality": "Revere",
        "name": "Wonderland",
        "on_street": null,
        "platform_code": null,
        "platform_name": null,
        "vehicle_type": null,
        "wheelchair_boarding": 1
      },
      "id": "place-wondl",
      "links": {
        "self": "/stops/place-wondl"
      },
      "relationships": {
        "child_stops": {},
        "facilities": {
          "links": {
            "related": "/facilities/?filter[stop]=place-wondl"
          }
        },
        "parent_station": {
          "data": null
        },
        "recommended_transfers": {},
        "zone": {
          "data": null
        }
      },
      "type": "stop"
    }
  ],
  "jsonapi": {
    "version": "1.0"
  }
}

export const FORMATTED_ROUTE_DATA = {
  "Blue": [
    "West",
    "East"
  ],
  "Green-E": [
    "West",
    "East"
  ],
  "Green-D": [
    "West",
    "East"
  ],
  "Green-C": [
    "West",
    "East"
  ],
  "Green-B": [
    "West",
    "East"
  ],
  "Orange": [
    "South",
    "North"
  ],
  "Mattapan": [
    "Outbound",
    "Inbound"
  ],
  "Red": [
    "South",
    "North"
  ]
}

export const FORMATTED_STOPS_DATA = {
  "Wonderland": "place-wondl",
  "Revere Beach": "place-rbmnl",
  "Beachmont": "place-bmmnl",
  "Suffolk Downs": "place-sdmnl",
  "Orient Heights": "place-orhte",
  "Wood Island": "place-wimnl",
  "Airport": "place-aport",
  "Maverick": "place-mvbcl",
  "Aquarium": "place-aqucl",
  "State": "place-state",
  "Government Center": "place-gover",
  "Bowdoin": "place-bomnl"
}