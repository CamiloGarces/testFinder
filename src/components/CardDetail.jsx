import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context";
import { useLocation } from "react-router-dom";
import "./CardDetail.css";

const CardDetail = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [validName, setValidName] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [validPhone, setValidPhone] = useState("");
  const [validComments, setValidComments] = useState("");
  const [displayMessage, setDisplayMessage] = useState("none");
  const [displayMessageError, setDisplayMessageError] = useState("none");
  const [hasInteracted, setHasInteracted] = useState(false);

  const [warningName, setWarningName] = useState("gray");
  const [warningEmail, setWarningEmail] = useState("gray");
  const [warningPhone, setWarningPhone] = useState("gray");
  const [warningComments, setWarningComments] = useState("gray");

  const [visible, setVisible] = useState("none");
  const sampleLocation = useLocation();
  const pathParts = sampleLocation.pathname.split("/");
  const idSplit = pathParts[2];

  const items = useContext(ThemeContext);

  useEffect(() => {
    const dataFilter = items?.filter(
      (item) => isNaN(idSplit) || parseInt(item.Id) === parseInt(idSplit)
    );
    setFilteredItems(dataFilter);
  }, [idSplit, items]);

  const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+com$/;
    return regex.test(email);
  };

  const validateField = (fieldValue, setAlertFunction, fieldType) => {
    if (!hasInteracted) {
      return;
    }
    if (fieldType === "validEmail") {
      if (!validateEmail(fieldValue)) {
        setAlertFunction("red");
      } else {
        setAlertFunction("gray");
      }
    } else {
      if (fieldValue === "") {
        setAlertFunction("red");
      } else {
        setAlertFunction("gray");
      }
    }
  };

  const validation = () => {
    setHasInteracted(true);
    validateField(validName, setWarningName, "validName");
    validateField(validEmail, setWarningEmail, "validEmail");
    validateField(validPhone, setWarningPhone, "validPhone");
    validateField(validComments, setWarningComments, "validComments");

    const allFieldsFilled =
      validName !== "" &&
      validateEmail(validEmail) &&
      validPhone !== "" &&
      validComments !== "";
    setDisplayMessage(allFieldsFilled ? "block" : "none");
    setDisplayMessageError(!allFieldsFilled ? "block" : "none");
  };

  useEffect(() => {
    validateField(validName, setWarningName, "validName");
  }, [validName, hasInteracted]);

  useEffect(() => {
    validateField(validEmail, setWarningEmail, "validEmail");
  }, [validEmail, hasInteracted]);

  useEffect(() => {
    validateField(validPhone, setWarningPhone, "validPhone");
  }, [validPhone, hasInteracted]);

  useEffect(() => {
    validateField(validComments, setWarningComments, "validComments");
  }, [validComments, hasInteracted]);

  const showContentMessage = () => {
    setVisible("block");
  };

  const closeWindow = () => {
    setVisible("none");
  };

  const FormatDate = () => {
    const format = filteredItems?.length > 0 ? filteredItems[0].DateListed : "";
    const dateFormat = new Date(format);

    return (
      <div>{`Date Listed: ${dateFormat.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`}</div>
    );
  };

  return (
    <div className="baseContainer">
      <div className="baseSplit">
        <div className="baseLeftCard">
          <div className="baseLeftHeader">
            <div className="baseDivider">
              <div className="baseCardUp">{filteredItems?.[0]?.Title}</div>
              <div className="baseCardDown">{filteredItems?.[0]?.Location}</div>
            </div>
            <div className="baseDivider">
              <div className="baseSalePrice">
                {"$" + filteredItems?.[0]?.["Sale Price"]}
              </div>
              <div className="baseSaleDate">{FormatDate()}</div>
            </div>
          </div>
          <div className="contentImageDetail">
            <img
              className="imageContent"
              src={filteredItems?.[0]?.PictureURL}
            />
          </div>
          <div className="contentInfo">
            <div className="contentInfoItem">
              {filteredItems?.[0]?.Bedrooms}
              <div className="contentTextGeneral">BED</div>
            </div>
            <div className="contentInfoItem">
              {filteredItems?.[0]?.Bathrooms}
              <div className="contentTextGeneral">BATH</div>
            </div>
            <div className="contentInfoItem">
              {filteredItems?.[0]?.Parking}
              <div className="contentTextGeneral">PARKING</div>
            </div>
            <div className="contentInfoItem">
              {filteredItems?.[0]?.Sqft}
              <div className="contentTextGeneral">SQFT</div>
            </div>
            <div className="contentInfoItem">
              {filteredItems?.[0]?.YearBuilt}
              <div className="contentTextGeneral">YEAR BUILD</div>
            </div>
          </div>
          <div className="contentTextDescription">
            {filteredItems?.[0]?.Description}
          </div>
        </div>

        <div className="baseRightCard">
          <div className="baseContentButton">
            <div className="baseAlignButton">
              <button
                onClick={showContentMessage}
                className="baseGeneralButton"
                type="button"
              >
                Save Property
              </button>
            </div>
          </div>
          <div className="baseContentAgent">
            <div className="baseContentAgentTitle">Contact Agent</div>
            <div className="baseContentInputs">
              <input
                onChange={(e) => {
                  setHasInteracted(true);
                  setValidName(e.target.value);
                }}
                style={{ border: `1px solid ${warningName}` }}
                className="baseLineInput"
                type="text"
                placeholder="Fill Name *"
              />
              <input
                onChange={(e) => {
                  setHasInteracted(true);
                  setValidEmail(e.target.value);
                }}
                style={{ border: `1px solid ${warningEmail}` }}
                className="baseLineInput"
                type="email"
                placeholder="Email *"
              />
              <input
                onChange={(e) => {
                  setHasInteracted(true);
                  setValidPhone(e.target.value);
                }}
                style={{ border: `1px solid ${warningPhone}` }}
                className="baseLineInput"
                type="number"
                placeholder="Phone Number *"
              />
              <textarea
                onChange={(e) => {
                  setHasInteracted(true);
                  setValidComments(e.target.value);
                }}
                placeholder="Comments *"
                style={{ border: `1px solid ${warningComments}` }}
                className="baseLineInput"
                rows="4"
                cols="50"
              />
              <div
                style={{ display: displayMessage }}
                className="messageSuccess"
              >
                {"Message sent successfully"}
              </div>
              <div
                style={{ display: displayMessageError }}
                className="messageError"
              >
                {
                  "An error has occurred in the indicated fields, please fill out the fields"
                }
              </div>
            </div>
            <div>
              <button
                onClick={validation}
                className="buttonContact"
                type="button"
              >
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="baseContentPopMessage"
        style={{
          display: visible,
        }}
      >
        <div className="basePopInputs">
          <label>Name: </label>
          {validName}
        </div>
        <div className="basePopInputs">
          <label>Email: </label>
          {validEmail}
        </div>
        <div className="basePopInputs">
          <label>Phone Number: </label>
          {validPhone}
        </div>
        <div className="basePopComments">
          <label>Comments: </label>
          {validComments}
        </div>
        <div className="baseContentButtonClose">
          <button className="buttonClose" onClick={closeWindow}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
