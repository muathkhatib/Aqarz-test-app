import React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";

import data from "../constants/data";
import styles from "./styles";
import NestedModal from "../components/NestedModal";

const columns = [
  { id: "id", label: "رقم الطلب", minWidth: 20, align: "center" },
  { id: "name", label: "اسم المستفيد", minWidth: 120, align: "center" },
  { id: "code", label: "رقم المستفيد", minWidth: 100, align: "center" },
  { id: "population", label: "اسم المدينة", minWidth: 70, align: "center" },
  { id: "size", label: "اسم الحي", minWidth: 100, align: "center" },
  { id: "density", label: "السعر المطلوب", minWidth: 120, align: "center" },
  { id: "density", label: "نوع العقار", minWidth: 50, align: "center" },
  { id: "density", label: "اسم حالة الطلب", minWidth: 70, align: "center" },
  { id: "density", label: "حالة الطلب", minWidth: 170, align: "center" },
  { id: "density", label: "العمليات", minWidth: 150, align: "center" },
];
const DataView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openNestedModal, setOpenNestedModal] = React.useState(false);
  const [tableDataType, setTableDataType] = React.useState("");
  const [childTableData, setChildTableData] = React.useState([]);
  // tableDataType,childTableData
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <NestedModal
        openNestedModal={openNestedModal}
        setOpenNestedModal={setOpenNestedModal}
        tableDataType={tableDataType}
        childTableData={childTableData}
      />
      <section style={styles.container}>
        <Paper sx={styles.tableBody}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
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
                {data.result
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
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
                              setTableDataType("preview_stages");
                              setChildTableData(row.preview_stages);
                              setTimeout(() => {
                                setOpenNestedModal(true);
                              }, 100);
                            }}
                          >
                            الزيارات
                          </Button>
                          <Button
                            onClick={() => {
                              setTableDataType("contact_stages");
                              setChildTableData(row.contact_stages);
                              setTimeout(() => {
                                setOpenNestedModal(true);
                              }, 100);
                            }}
                          >
                            التواصل
                          </Button>
                          <Button
                            onClick={() => {
                              setTableDataType("finance_stages");
                              setChildTableData(row.finance_stages);
                              setTimeout(() => {
                                setOpenNestedModal(true);
                              }, 100);
                            }}
                          >
                            التمويل
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.result.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>{" "}
      </section>
    </>
  );
};

export default DataView;
