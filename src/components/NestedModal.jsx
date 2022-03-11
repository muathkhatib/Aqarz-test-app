import * as React from "react";
import {
  FormControl,
  Box,
  Modal,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";

const style = {
  width: 1024,
  bgcolor: "background.paper",
  pt: 2,
  px: 4,
  pb: 3,
};

const NestedModal = ({
  openNestedModal,
  setOpenNestedModal,
  tableHeaderName,
  setTableNestedBodyData,
  setTableBodyData,
}) => {
  const [requestId, setRequestId] = React.useState("");
  const [previewDate, setPreviewDate] = React.useState("");
  const [previewTime, setPreviewTime] = React.useState("");
  const [ascertainmentStatus, setAscertainmentStatus] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [assignedId, setAssignedId] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
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
          <Box sx={{ ...style, width: 400, height: "90%" }}>
            <form onSubmit={handleSubmit}>
              {tableHeaderName === "preview_stages" && (
                <>
                  <FormControl>
                    <InputLabel htmlFor="request_id">رقم المعاينة</InputLabel>
                    <Input id="request_id" aria-describedby="my-helper-text" />
                    {/* <FormHelperText id="my-helper-text">
                      We'll never share your email.
                    </FormHelperText> */}
                  </FormControl>
                </>
              )}
              <Button variant="contained" color="primary" type="submit">
                jsj
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default NestedModal;
