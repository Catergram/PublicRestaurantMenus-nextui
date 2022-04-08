import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";

export default function ShareModal({ isOpen }) {
  return (
    <div>
      <Modal
        blur
        open={isOpen}
        onClose={!isOpen}
        className="bg-transparent shadow-none"
      >
        <Modal.Header>
          <img
            src="./images/app-store.png"
            className="mb-4 footer-images"
          />
        </Modal.Header>
        <Modal.Footer>
          <Row justify="space-between">
            <div>
              <img
                className="footer-images"
                src="./images/google-play.png"
              />
            </div>
          </Row>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
