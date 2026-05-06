import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import Close from "@material-ui/icons/CloseRounded";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    maxWidth: 350,
  },
  inputBox: {
    width: "auto",
    maxWidth: 350,
    minWidth: 250,
    border: "1px solid #D9D9D9",
    padding: 3,
    textAlign: "right",
  },
  imageStyle: {
    height: 80,
    width: 80,
    margin: 3,
    display: "block",
  },
  delete: {
    zIndex: 1000,
    position: "absolute",
    color: "#3E3E3E",
    borderRadius: 26,
    height: 18,
    width: 18,
    cursor: "pointer",
    top: -3,
    right: -10,
    border: "1px solid #D9D9D9",
    backgroundColor: "#ffff",
  },
  imageDiv: {
    position: "relative",
    width: 80,
    height: 80,
  },
  fileInput: {
    display: "none",
  },
}));

const readUploadedFileAsURL = (inputFile) => {
    const temporaryFileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };
  
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

const AvatarImage = (props) => {
  const { upload } = props;
  const classes = useStyles();
  const fileInput = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");

  const openFileWindow = () => {
    fileInput.current.click();
  };

  const uploadFile = async (file) => {
    const selectedImageUrl = URL.createObjectURL(file);
    upload(file);
    setSelectedImage(selectedImageUrl);
    return selectedImageUrl;
  };

  return (
    <div className={classes.rootStyle}>
      <input
        type="file"
        accept=".jpeg, .jpg, .png"
        className={`file-input ${classes.fileInput}`}
        ref={fileInput}
        onChange={(evt) => uploadFile(evt.target.files[0])}
        // eslint-disable-next-line no-param-reassign
        onClick={(evt) => {
          evt.currentTarget.value = null;
        }}
      />
      <div role="presentation" className={classes.inputBox}>
        <button type="button" onClick={() => openFileWindow()}>
          browse
        </button>
      </div>
      {selectedImage && selectedImage !== "" && (
        <div className={classes.imageDiv}>
          <img src={selectedImage} alt="" className={classes.imageStyle} />
        </div>
      )}
    </div>
  );
};

export default AvatarImage;
