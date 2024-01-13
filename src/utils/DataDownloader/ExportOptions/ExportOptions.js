import React, { useEffect, useState } from "react"

import { MenuItem, MenuList, Popover, Box, Button } from "@mui/material"
import DataDownloaderFactory from "../DataDownloaderFactory"
import DataDownloader from "../";
 const getPropByString = (obj, propString) => {
  if (!propString) return obj;

  var prop,
    props = propString.split(".");

  for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
    prop = props[i];

    var candidate = obj[prop];
    if (candidate !== undefined) {
      obj = candidate;
    } else {
      break;
    }
  }
  return obj && obj[props[i]];
};
export default function ExportOptions({
  exportingData = [],
  fetchExportData = () => {},
  config = [],
  fileName = "",
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [fileFormat, setFileFormat] = useState("")

  useEffect(() => {
    if (exportingData.length && fileFormat) {
      handleClose()
      const data = exportingData.map(item => {
        const updatedItem = {}
        for (let {
          valueKey,
          valueHeader,
          valueFormatter = value => value || "NA",
        } of config) {
          const value = getPropByString(item, valueKey)
          updatedItem[valueHeader] = valueFormatter(value)
        }
        return updatedItem
      })
      const downloader = new DataDownloader(fileName, data, [headers])
      const downloadStrategy =
        DataDownloaderFactory.getDataDownloaderStrategy(fileFormat)
      downloader.setStrategy(downloadStrategy)
      downloader.download()
    }
  }, [exportingData.length, fileFormat])

  const open = Boolean(anchorEl)
  const id = open ? "simple-popper" : undefined

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setFileFormat("")
  }

  const headers = config.map(({ valueHeader }) => valueHeader)

  const handleDownloadData = fileFormat => {
    setFileFormat(fileFormat)
   fetchExportData()
  }

  return (
    <div>
      <Button variant="contained" sx={{ background: "black", color: "white" }} onClick={handleClick}>
        Export
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ border: 1, bgcolor: "background.paper", borderRadius: 2 }}>
          <MenuList>
            <MenuItem onClick={() => handleDownloadData("EXCEL")}>
              Excel
            </MenuItem>
            {/* <MenuItem onClick={() => handleDownloadData("PDF")}>Pdf</MenuItem> */}
            {/* <MenuItem onClick={() => handleDownloadData("JSON")}>JSON</MenuItem> */}
          </MenuList>
        </Box>
      </Popover>
    </div>
  )
}
