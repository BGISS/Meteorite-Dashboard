function FilterControls({ filters, setFilters, data, chartType ,t}) {
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const timelineYearOptions = [
    { label: '1900-1920', value: [1900, 1920] },
    { label: '1920-1940', value: [1920, 1940] },
    { label: '1940-1960', value: [1940, 1960] },
    { label: '1960-1980', value: [1960, 1980] }, 
    { label: '1980-2000', value: [1980, 2000] },
    { label: '2000-2012', value: [2000, 2012] },
  ];

  // Get unique meteorite types for dropdown (only for type chart)
  const meteoriteTypes = chartType === 'type' ? [...new Set(data.map(item => item.type))] : [];

  return (
    <div className="filter-panel p-4 bg-gray-100 rounded-lg" style={{ fontFamily:"Inconsolata" }}>
      <h3 className="text-lg font-semibold mb-4">
        {chartType === 'timeline' ? t.timelineFilter : t.barChartFilter}
      </h3>

      {/* Timeline Chart Filters */}
      {chartType === 'timeline' && (
        <>
          {/* Year Period Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t.yearFilterLabel}</label>
            <select
              value={JSON.stringify(filters.yearRange)}
              onChange={(e) => updateFilter('yearRange', JSON.parse(e.target.value))}
              className="w-full p-2 border rounded text-black mx-3"
            >
              {timelineYearOptions.map(option => (
                <option key={option.label} value={JSON.stringify(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Mass Range for Timeline */}
         <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t.massFilterLabel}</label>
            <select
              value={filters.massSort}
              onChange={(e) => updateFilter('massSort', e.target.value)}
              className="w-full p-2 border rounded text-black mx-3"
            >
              <option value="none">{t.noSorting}</option>
              <option value="asc">{t.lightHeavy}</option>
              <option value="desc">{t.heavyLight}</option>
            </select>
          </div>
        </>
      )}

      {/* Type Chart Filters */}
      {chartType === 'type' && (
        <>
       
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t.yearFilterLabel}</label>
            <select
              value={JSON.stringify(filters.yearRange)}
              onChange={(e) => updateFilter('yearRange', JSON.parse(e.target.value))}
              className="w-full p-2 border rounded text-black mx-3"
            >
              {timelineYearOptions.map(option => (
                <option key={option.label} value={JSON.stringify(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t.meteoriteFilterLabel}</label>
            <select
              value={filters.meteoriteType || 'all'}
              onChange={(e) => updateFilter('meteoriteType', e.target.value)}
              className="w-full p-2 border rounded text-black mx-2"
            >
              <option value="all">{t.allTypes}</option>
              {meteoriteTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>    
         
        </>
      )}
    </div>
  );
}

export default FilterControls;