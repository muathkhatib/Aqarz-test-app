import React, { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";

import styles from "./styles";
import NestedModal from "../components/NestedModal";
import axios from "axios";
import tableHeader from "../constants/tableHeaders";

const DataView = () => {
  const [openNestedModal, setOpenNestedModal] = React.useState(false);
  const [tableHeaders] = React.useState(tableHeader);

  const [tableHeaderName, setTableHeaderName] = React.useState("main");
  const [tableBodyData, setTableBodyData] = React.useState(null);
  const [tableNestedBodyData, setTableNestedBodyData] = React.useState(null);

  const getData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "/api/dashboard/fund/clickup/preview/requests",
        headers: {
          "Content-Type": "application/json",
          auth: `token ${process.env.REACT_APP_API_TOKEN}`,
          role: process.env.REACT_APP_API_ROLE,
          type: process.env.REACT_APP_API_TYPE,
        },
      });

      return setTableBodyData(data.result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => getData(), []);

  return tableBodyData ? (
    <>
      <NestedModal
        openNestedModal={openNestedModal}
        setOpenNestedModal={setOpenNestedModal}
        tableHeaderName={tableHeaderName}
        setTableNestedBodyData={setTableNestedBodyData}
        setTableBodyData={setTableBodyData}
      />
      <section
        style={{
          height: "10vh",
          border: "1px solid #e0e0e0",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          marginButtom: "2rem",
          boxShadow: " 0px 20px 10px 1px #c7c7c7",
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            tableHeaderName !== "main" ? setTableHeaderName("main") : null
          }
        >
          الرجوع للخلف
        </Button>
        <Button variant="contained" onClick={() => setOpenNestedModal(true)}>
          إضافة عنصر جديد
        </Button>
      </section>
      <section style={styles.container}>
        <TableContainer sx={{ height: "90vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableHeaders[tableHeaderName].map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ width: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableHeaderName === "main" &&
                !!tableBodyData &&
                tableBodyData.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">
                        {row.beneficiary_name || "لا يوجد اسم"}
                      </TableCell>
                      <TableCell align="center">
                        {row.beneficiary_mobile || "لا يوجد رقم"}
                      </TableCell>
                      <TableCell align="center">{row.city_name}</TableCell>
                      <TableCell align="center">
                        {row.neighborhood_name}
                      </TableCell>
                      <TableCell align="center">{row.EstatePrice}</TableCell>
                      <TableCell align="center">
                        {row.estate_type_name}
                      </TableCell>
                      <TableCell align="center">{row.status_name}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => {
                            setTableHeaderName("preview_stages");
                            setTableNestedBodyData(row.preview_stages);
                          }}
                        >
                          الزيارات
                        </Button>
                        <Button
                          onClick={() => {
                            setTableHeaderName("contact_stages");
                            setTableNestedBodyData(row.contact_stages);
                          }}
                        >
                          التواصل
                        </Button>
                        <Button
                          onClick={() => {
                            setTableHeaderName("finance_stages");
                            setTableNestedBodyData(row.finance_stages);
                          }}
                        >
                          التمويل
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {tableHeaderName === "preview_stages" &&
                tableNestedBodyData.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell align="center">{row.request_id}</TableCell>
                      <TableCell align="center">{row.preview_date}</TableCell>
                      <TableCell align="center">{row.preview_time}</TableCell>
                      <TableCell align="center">
                        {row.ascertainment_status}
                      </TableCell>
                      <TableCell align="center">{row.emp.name}</TableCell>
                      <TableCell align="center">{row.notes}</TableCell>
                      <TableCell align="center">fff</TableCell>
                    </TableRow>
                  );
                })}
              {tableHeaderName === "contact_stages" &&
                tableNestedBodyData.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell align="center">
                        {row.contact_status === "recall"
                          ? "لم يتم الرد"
                          : row.contact_status}
                      </TableCell>
                      <TableCell align="center">
                        {row.implementation_cases === "looking_for_financing"
                          ? "يبحث عن عقار"
                          : "غير جاد"}
                      </TableCell>
                      <TableCell align="center">{row.notes}</TableCell>
                    </TableRow>
                  );
                })}
              {tableHeaderName === "finance_stages" &&
                tableNestedBodyData.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell align="center">
                        {row.cancel_cause || "------"}
                      </TableCell>
                      <TableCell align="center">
                        {row.attachments ? (
                          <a
                            href={row.attachments}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            عرض صورة
                          </a>
                        ) : (
                          "لا يوجد صورة"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.contract_status}
                      </TableCell>
                      <TableCell align="center">{row.funding_status}</TableCell>
                      <TableCell align="center">{row.notes}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  ) : (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default DataView;
