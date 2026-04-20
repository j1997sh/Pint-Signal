export const districts = [
  {
    id: "westminster-victoria",
    name: "Westminster & Victoria",
    centerLat: 51.4978,
    centerLng: -0.1362,
    color: "#d4a24c"
  },
  {
    id: "whitehall-st-jamess",
    name: "Whitehall & St James’s",
    centerLat: 51.5031,
    centerLng: -0.1295,
    color: "#c47d4e"
  },
  {
    id: "soho-piccadilly",
    name: "Soho & Piccadilly",
    centerLat: 51.5123,
    centerLng: -0.1342,
    color: "#b06f57"
  },
  {
    id: "covent-garden-strand",
    name: "Covent Garden & Strand",
    centerLat: 51.5104,
    centerLng: -0.1231,
    color: "#c9b26a"
  },
  {
    id: "mayfair-belgravia",
    name: "Mayfair & Belgravia",
    centerLat: 51.5041,
    centerLng: -0.1475,
    color: "#8f6f54"
  }
];

export function getDistrictById(id) {
  return districts.find(d => d.id === id) || null;
}

export function inferDistrictFromPostcode(postcode = "") {
  const pc = String(postcode).toUpperCase().trim();

  if (
    pc.startsWith("SW1H") ||
    pc.startsWith("SW1P") ||
    pc.startsWith("SW1V") ||
    pc.startsWith("SW1W") ||
    pc.startsWith("SW1E")
  ) {
    return "westminster-victoria";
  }

  if (pc.startsWith("SW1A") || pc.startsWith("SW1Y")) {
    return "whitehall-st-jamess";
  }

  if (
    pc.startsWith("W1D") ||
    pc.startsWith("W1F") ||
    pc.startsWith("W1B")
  ) {
    return "soho-piccadilly";
  }

  if (
    pc.startsWith("WC2") ||
    pc.startsWith("WC2N") ||
    pc.startsWith("WC2E") ||
    pc.startsWith("WC2H") ||
    pc.startsWith("WC2R") ||
    pc.startsWith("WC2B")
  ) {
    return "covent-garden-strand";
  }

  if (
    pc.startsWith("W1J") ||
    pc.startsWith("W1K") ||
    pc.startsWith("W1S") ||
    pc.startsWith("SW1X")
  ) {
    return "mayfair-belgravia";
  }

  return "westminster-victoria";
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function distanceInMeters(lat1, lng1, lat2, lng2) {
  const earthRadius = 6371000;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

export function getDistrictForPub(pub) {
  if (
    typeof pub.lat === "number" &&
    typeof pub.lng === "number" &&
    !Number.isNaN(pub.lat) &&
    !Number.isNaN(pub.lng)
  ) {
    let bestDistrict = districts[0];
    let bestDistance = Infinity;

    districts.forEach(district => {
      const distance = distanceInMeters(
        pub.lat,
        pub.lng,
        district.centerLat,
        district.centerLng
      );

      if (distance < bestDistance) {
        bestDistance = distance;
        bestDistrict = district;
      }
    });

    return bestDistrict.id;
  }

  return inferDistrictFromPostcode(pub.postcode || "");
}
