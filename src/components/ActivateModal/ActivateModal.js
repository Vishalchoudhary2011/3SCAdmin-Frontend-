import React, { useEffect } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

const ActivateModal = (props) => {
  const { open, setOpen, active, handleClick } = props;

  useEffect(() => {
    setOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <div>
      {open && (
        <Dialog title={"Please confirm"} onClose={toggleDialog}>
          <p
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            {active.is_active ? (
              <>
                Are you sure you want to deactivate <b>{active.name}?</b>
              </>
            ) : (
              <>
                {" "}
                Are you sure you want to activate <b>{active.name}?</b>{" "}
              </>
            )}
          </p>
          <DialogActionsBar>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={toggleDialog}
            >
              No
            </button>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={handleClick}
            >
              Yes
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default ActivateModal;
