import * as React from "react";
import {
  FormControl,
  Box,
  Modal,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

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
          <Box sx={{ ...style, width: 400, height: "90%" }}>
            <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default NestedModal;
