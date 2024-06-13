import React from "react";
import { Button } from "react-bootstrap";

function SButton({
  children,
  action,
  variant,
  size,
  loading,
  disabled,
  className,
  style
}) {
  return (
    <Button
      className={className}
      onClick={action}
      variant={variant}
      disabled={disabled}
      size={size}
      style={style}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
}

export default SButton;
