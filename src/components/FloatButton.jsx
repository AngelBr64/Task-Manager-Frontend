import React from "react";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const FloatingButton = ({ onClick }) => {
  return (
    <FloatButton icon={<PlusOutlined />} type="primary" onClick={onClick} style={{ right: 24, bottom: 24 }} />
  );
};

export default FloatingButton;
