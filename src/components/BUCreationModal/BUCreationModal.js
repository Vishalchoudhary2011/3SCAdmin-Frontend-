import React, { useEffect } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./bucreation-modal.scss";

const BUCreationModal = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { open, setOpen } = props;
  useEffect(() => {
    setOpen(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggleDialog = () => {
    setOpen(!open);
  };

  const units = useSelector((state) => state.BusinessUnitReducer.createdBUs);

  const dispatch = useDispatch();

  const handleClick = () => {
    toggleDialog();
    navigate("/setup");
    dispatch({ type: "businessUnit/resetCreatedBUs" });
  };

  return (
    <div className="bucreation-modal">
      {open && (
        <Dialog id="window" onClose={toggleDialog} className="bucreation-modal">
          <span
            className="k-icon k-i-close-outline k-btn1 bucreation-modal-close"
            onClick={toggleDialog}
          ></span>
          <div className="bucreation-modal-body">
            <div>
              <i className="fa fa-check-circle-o p-1 bucreation-modal-icon"></i>
              <p className="p-1 mt-3">Created {units} BU Successfully.</p>
            </div>
          </div>

          <DialogActionsBar>
            <div>
              <button className="btn primary-button" onClick={handleClick}>
                Yes
              </button>
            </div>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default BUCreationModal;
