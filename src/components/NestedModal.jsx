import * as React from "react";
import { Paper, Box, Modal } from "@mui/material";

const style = {
  width: 1024,
  bgcolor: "background.paper",
  pt: 2,
  px: 4,
  pb: 3,
};

const NestedModal = ({ openNestedModal, setOpenNestedModal }) => {
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
          <Box sx={{ ...style, width: 1100, height: "90%" }}>
            <Paper>
              <h1>dsdsdsd</h1>
            </Paper>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default NestedModal;
