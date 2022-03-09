import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Modal,
} from "@mui/material";

import ChildModal from "./ChildModal";

const style = {
  width: 1024,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const columns = {
  preview_stages: [
    { id: "id", label: "رقم المعاينة", width: 20, align: "right" },
    { id: "date", label: "تاريخ المعاينة", width: 50, align: "center" },
    { id: "time", label: "وقت المعاينة", width: 50, align: "center" },
    { id: "status", label: "حالة التأكد", width: 50, align: "center" },
    { id: "employee", label: "اسم الموظف", width: 50, align: "center" },
    { id: "notes", label: "ملاحظات", width: 50, align: "center" },
    { id: "process", label: "العمليات", width: 50, align: "center" },
  ],
  contact_stages: [
    {
      id: "communication_status",
      label: "حالة التواصل",
      width: 60,
      align: "center",
    },
    {
      id: "beneficiary_status",
      label: "حالة المستفيد",
      width: 60,
      align: "center",
    },
    { id: "notes", label: "الملاحظات", width: 60, align: "center" },
  ],
  finance_stages: [
    {
      id: "cancellation_reason",
      label: "سبب الالغاء",
      width: 20,
      align: "right",
    },
    { id: "attachments", label: "المرفقات", width: 20, align: "center" },
    { id: "contract_status", label: "حالة العقد", width: 20, align: "center" },
    { id: "finance_status", label: "سبب التمويل", width: 20, align: "center" },
    { id: "notes", label: "ملاحظات", width: 20, align: "center" },
  ],
};

const buttonType = (type) => {
  switch (type) {
    case "preview_stages":
      return "الميداني";
    case "contact_stages":
      return "contact";
    case "finance_stages":
      return "finance";
    default:
      return "";
  }
};

const NestedModal = ({
  openNestedModal,
  setOpenNestedModal,
  tableDataType,
  childTableData,
}) => {
  console.log({ tableDataType, childTableData });
  return tableDataType ? (
    <>
      <div>
        <Modal
          open={openNestedModal}
          onClose={() => setOpenNestedModal(false)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ ...style, width: 1100, height: "90%" }}>
            <Paper>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns[tableDataType].map((column) => (
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={111}
                    ></TableRow>
                    {childTableData.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {tableDataType === "preview_stages" && (
                            <>
                              <TableCell align="center">
                                {row.request_id}
                              </TableCell>
                              <TableCell align="center">
                                {row.preview_date}
                              </TableCell>
                              <TableCell align="center">
                                {row.preview_time}
                              </TableCell>
                              <TableCell align="center">
                                {row.ascertainment_status}
                              </TableCell>
                              <TableCell align="center">
                                {row.emp.name}
                              </TableCell>
                              <TableCell align="center">{row.notes}</TableCell>
                              <TableCell align="center">
                                <ChildModal
                                  buttonName={buttonType(tableDataType)}
                                  fieldPreview={row.field_preview_stages}
                                />
                              </TableCell>
                            </>
                          )}
                          {tableDataType === "contact_stages" && (
                            <>
                              <TableCell align="center">
                                {row.contact_status}
                              </TableCell>
                              <TableCell align="center">
                                {row.implementation_cases}
                              </TableCell>
                              <TableCell align="center">{row.notes}</TableCell>
                            </>
                          )}
                          {tableDataType === "finance_stages" && (
                            <>
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
                              <TableCell align="center">
                                {row.funding_status}
                              </TableCell>
                              <TableCell align="center">{row.notes}</TableCell>
                            </>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Modal>
      </div>
    </>
  ) : null;
};

export default NestedModal;
