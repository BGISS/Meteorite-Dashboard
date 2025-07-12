import { useState, useMemo } from "react";
import FilterControls from "./FilterControls";
import "./Dashboard.css"
import MeteoriteLineChart from "./MeteoriteLineChart";
import { useMeteoriteData } from "./useMeteoriteData";
import { processTimelineData,processTypeData,cleanMeteoriteData } from "./dataProcessing";
import MeteoriteBarChart from "./MeteoriteBarChart";

function Dashboard({t}){
    const {data }= useMeteoriteData();
     const [filtersTimeline, setFiltersTimeline] = useState({
    yearRange: [2000, 2012],
    massRange: [0, 2000]
  });

  const [filtersType, setFiltersType] = useState({
    yearRange: [2000, 2012],
    meteoriteType: "all"
  });
  const processedData=cleanMeteoriteData(data);

    const applyTimelineFilters = (data, filters) => {
        if (!data || !Array.isArray(data)) return [];
        let filteredData = [...data]; 
        
        if (filters.massSort === 'asc') {
            filteredData.sort((a, b) => {
                const massA = parseFloat(a.totalMass) 
                const massB = parseFloat(b.totalMass);
                return massA - massB;
            });
        } else if (filters.massSort === 'desc') {
            filteredData.sort((a, b) => {
                const massA = parseFloat(a.totalMass) 
                const massB = parseFloat(b.totalMass);
                return massB - massA;
            });
        }
        filteredData = filteredData.filter(item => {
            const yearValid = item.year >= filters.yearRange[0] && item.year <= filters.yearRange[1];
            return yearValid;
        });
       
        return filteredData;
    };
   const applyTypeFilters = (data,filters)=>{
    let filteredData = data.filter(item => {
            const yearValid = item.year >= filters.yearRange[0] && item.year <= filters.yearRange[1];
            return yearValid;
        });
        if(filters.meteoriteType!=="all")
           {filteredData = filteredData.filter(item=>{
          return item.type === filters.meteoriteType
        })}
        return filteredData;
   }
   const timelineData = useMemo(() => {
      return processedData.length
        ? applyTimelineFilters(processTimelineData(processedData),filtersTimeline)
        : [];
  }, [processedData, filtersTimeline]);

  const typeData = useMemo(() => {
    return processedData.length
      ? applyTypeFilters(processTypeData(processedData, filtersType),filtersType)
      : [];
  }, [processedData, filtersType]);
  
    return(
        <>
        <div id="dashboard-container">
          <div className="chart-box">
            <MeteoriteLineChart data={timelineData} t={t} />
            <FilterControls filters={filtersTimeline} setFilters={setFiltersTimeline} data={timelineData} chartType="timeline" t={t} />
          </div>
          <div className="chart-box">
            <MeteoriteBarChart data={typeData} t={t} />
           {/* <details><summary>Learn more about each type of meteorite!</summary></details> */}
            <FilterControls filters={filtersType} setFilters={setFiltersType} data={typeData} chartType="type" t={t}/>
          </div>
        </div>
        </>
        
    )
}

export default Dashboard