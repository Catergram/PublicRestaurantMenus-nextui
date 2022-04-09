import React from "react";
import { Modal, Row } from "@nextui-org/react";

export default function ShareModal({ isOpen, handleClose }) {
  return (
    <div>
      <Modal
        blur
        open={isOpen}
        onClose={handleClose}
        className="bg-transparent shadow-none"
      >
        <Modal.Header>
          <img
            src="./images/app-store.png"
            className="mb-4 footer-images"
            alt=""
          />
        </Modal.Header>
        <Modal.Footer>
          <Row justify="space-between">
            <div>
              <img
                className="footer-images"
                src="./images/google-play.png"
                alt=""
              />
            </div>
          </Row>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
