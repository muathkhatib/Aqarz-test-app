import * as React from "react";
import Box from "@mui/material/Box";
import {
  Modal,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const columns = [
  { id: "id", label: "مسؤول المعاينة", width: 20, align: "center" },
  { id: "date", label: "حالة الحضور", width: 50, align: "center" },
  { id: "time", label: "حالة المعاينة", width: 50, align: "center" },
  {
    id: "status",
    label: "عدد العقارات التي تتم معاينتها",
    width: 150,
    align: "center",
  },
  { id: "status", label: "ملاحظات", width: 50, align: "center" },
];

const statusConverter = (status) => {
  switch (status) {
    case "1" || 1:
      return "نعم";
    case "0" || 0:
      return "لا";
    default:
      return "";
  }
};
const ChildModal = ({ fieldPreview }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>ميداني</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 750 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fieldPreview.map((row) => (
                <TableRow key={row.emp_id}>
                  <TableCell align="center">
                    {console.log(row)}
                    {row.field_emp_name}
                  </TableCell>
                  <TableCell align="center">
                    {statusConverter(row.attendance_status)}
                  </TableCell>
                  <TableCell align="center">
                    {statusConverter(row.preview_status)}
                  </TableCell>
                  <TableCell align="center">
                    {row.estate_visited_count || 0}
                  </TableCell>
                  <TableCell align="center">{row.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleClose}>إغلاق</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ChildModal;
