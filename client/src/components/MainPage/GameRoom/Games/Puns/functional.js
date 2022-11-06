import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import "./Puns.scss";

export const FunctionalIFrameComponent = ({
  children,
  title,
  ...props
}) => {
  const [contentRef, setContentRef] = useState(null)
  const mountNode =
    contentRef?.contentWindow?.document?.body

  return (
    <iframe title={title} {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}
