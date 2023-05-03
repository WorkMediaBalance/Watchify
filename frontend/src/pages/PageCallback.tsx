import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

const PageCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  let accessToken = queryParams.get("accessToken");
  let refreshToken = queryParams.get("refreshToken");

  if (accessToken === null) {
    accessToken = "default_access_token";
  }
  //   const jwt = jwtDecode(accessToken); // 나중에 하는걸로

  const [isNew, setIsNew] = useState(queryParams.get("isNew") === "true");
  // http://localhost:3000/callback?
  // accessToken=eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MTAwMDE3LCJleHAiOjE2NzkzNzM5OTd9.4zZ4xvYyhTbX1sePGPNXxFS6KzX8wjAVG8Oqcu3pzCc
  // &refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MTAwMDE3LCJleHAiOjE2ODExODY1OTd9.MNCW0u8jw_6bPOEHwKCDzO0kLIrQ7hbnb43QKe3Ausw
  // &isNew=false

  return <div>마 이게 콜백이다!</div>;
};

export default PageCallback;
