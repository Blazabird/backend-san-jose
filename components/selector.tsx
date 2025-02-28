"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DateCalendarServerRequest from "./calendar";
import NewsSection from "./news";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f0f0f0", 
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs className="bg-gray-300 rounded-xl"
          value={value}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          aria-label="Eventos"
          sx={{
            display: "flex",
            justifyContent: "center", 
          }}
        >
          <Tab label="Calendario de Eventos" {...a11yProps(0)} />
          <Tab label="Noticias" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DateCalendarServerRequest />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <NewsSection/>
      </CustomTabPanel>
    </Box>
  );
}
