import React, { useEffect, useContext, useState } from "react";
import { ThemeContext } from "../context";
import { useNavigate } from "react-router-dom";
import "./ListLocationByFilter.css";

const ListLocationByFilter = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterBedrooms, setFilterBedrooms] = useState("");
  const [filterBathrooms, setFilterBathrooms] = useState("");
  const [filterParking, setFilterParking] = useState("");
  const [filterRange, setFilterRange] = useState("");

  const items = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredData = items?.filter(
      (item) =>
        (filterBedrooms === "" ||
          item.Bathrooms.toString() === filterBedrooms) &&
        (filterBathrooms === "" ||
          item.Bedrooms.toString() === filterBathrooms) &&
        (filterParking === "" || item.Parking.toString() === filterParking) &&
        (filterRange === "" || item["Sale Price"] == parseInt(filterRange))
    );
    setFilteredItems(filteredData);
  }, [filterBedrooms, filterBathrooms, filterParking, filterRange, items]);

  const redirectDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="generalContainer">
      <div className="headerContainer">
        <div className="splitContent">
          <label className="labelGeneral" htmlFor="bedroom-filter">
            Bedrooms:{" "}
          </label>
          <select
            id="bedroom-filter"
            value={filterBedrooms}
            onChange={(event) => setFilterBedrooms(event.target.value)}
          >
            <option value="">Select an option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="splitContent">
          <label className="labelGeneral" htmlFor="bathroom-filter">
            Bathrooms:{" "}
          </label>
          <select
            id="bathroom-filter"
            value={filterBathrooms}
            onChange={(event) => setFilterBathrooms(event.target.value)}
          >
            <option value="">Select an option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="splitContent">
          <label className="labelGeneral" htmlFor="parking-filter">
            Parking:{" "}
          </label>
          <select
            id="parking-filter"
            value={filterParking}
            onChange={(event) => setFilterParking(event.target.value)}
          >
            <option value="">Select an option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
        <div className="splitContentRange">
          <label className="labelGeneral" htmlFor="range">
            Price Range:
          </label>
          <input
            onChange={(event) => setFilterRange(event.target.value)}
            value={filterRange}
            type="range"
            min="100000"
            max="1000000"
            step="10000"
          />
        </div>
        <div className="splitContentSearch">
          <button className="buttonSearch" type="button">
            Search
          </button>
        </div>
      </div>
      <div className="containerList">
        {filteredItems?.map((item, index) => (
          <div className="containerListItem" key={index}>
            <div className="containerListImage">
              <img className="containerImageDash" src={item.ThumbnailURL} />
            </div>
            <div className="containerInfoDetail">
              <div className="containerInfoTitle">{item.Title}</div>
              <div className="containerInfoLocation">{item.Location}</div>
              <div className="containerRooms">
                <div>
                  <label>Bedrooms: </label>
                  {item.Bedrooms} |
                </div>
                <div>
                  <label> Bathrooms: </label>
                  {item.Bathrooms}
                </div>
              </div>
              <div className="containerPrice">${item["Sale Price"]}</div>
              <div style={{ marginTop: "auto" }}>
                {
                  <button
                    className="buttonRedirect"
                    onClick={() => redirectDetail(item.Id)}
                  >
                    View Details
                  </button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListLocationByFilter;
