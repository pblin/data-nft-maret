import * as React from "react";
import "./common.scss";

const NotificationLabel = ({children, type}) => {
  return(
    <div className={"notification-label " + "notification-" + type}>
      {children}
    </div>
  );
};

export default NotificationLabel;
