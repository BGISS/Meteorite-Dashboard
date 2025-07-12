export const cleanMeteoriteData = (rawData) => {
  return rawData
    .filter(item => item.year && item.mass) // Remove incomplete records
    .map(item => ({
      id: item.id,
      name: item.name,
      mass_g: parseFloat(item.mass) || 0,
      year: new Date(item.year).getFullYear(),
      type: item.recclass || 'Unknown',
      fell_found: item.fall || 'Unknown',
      latitude: parseFloat(item.reclat) || null,
      longitude: parseFloat(item.reclong) || null,
      // Use geolocation if reclat/reclong are missing
      lat: item.geolocation?.latitude ? parseFloat(item.geolocation.latitude) : parseFloat(item.reclat) || null,
      lng: item.geolocation?.longitude ? parseFloat(item.geolocation.longitude) : parseFloat(item.reclong) || null,
      nametype: item.nametype || 'Unknown'
    }))
    .filter(item => item.mass_g>0 && item.year >=1900); 
    
};

export const processTimelineData = (data) => {
  // Group by year
  const grouped = data.reduce((acc, item) => {
    const year = item.year;
    if (!acc[year]) {
      acc[year] = { 
        year, 
        count: 0, 
        totalMass: 0,
        fellCount: 0,
        foundCount: 0
      };
    }
    acc[year].count += 1;
    acc[year].totalMass += Math.floor((item.mass_g)/1000);
   
    return acc;
  }, {});
  return Object.values(grouped).sort((a, b) => a.year - b.year);
};

export const processTypeData = (data) => {
  // First, group by year and count types within each year
  const yearGroups = data.reduce((acc, item) => {
    const year = item.year;
    const type = item.type;
    
    if (!acc[year]) {
      acc[year] = {};
    }
    
    if (!acc[year][type]) {
      acc[year][type] = {
        count: 0,
        totalMass: 0
      };
    }
    
    acc[year][type].count += 1;
    acc[year][type].totalMass += item.mass_g || 0;
    
    return acc;
  }, {});
  
  // Then, find the most common type for each year
  const result = Object.keys(yearGroups).map(year => {
    const typeData = yearGroups[year];
    
    // Find the type with the highest count
    const mostCommonType = Object.keys(typeData).reduce((maxType, currentType) => {
      return typeData[currentType].count > typeData[maxType].count ? currentType : maxType;
    });
    
    return {
      year: parseInt(year),
      type: mostCommonType,
      count: typeData[mostCommonType].count,
      totalMass: typeData[mostCommonType].totalMass
    };
  });
  
  return result.sort((a, b) => a.year - b.year);
};