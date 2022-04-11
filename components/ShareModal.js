import React from "react";
import { Modal, Row } from "@nextui-org/react";

export default function ShareModal({ isOpen, handleClose }) {
  return (
    <div>
      <Modal
        blur
        open={isOpen}
        onClose={handleClose}
        css={{
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }}
      >
        <Modal.Header>
          <img
            src="./images/app-store.png"
            alt=""
          />
        </Modal.Header>
        <Modal.Footer>
          <Row justify="space-between">
            <div>
              <img
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
