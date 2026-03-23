import { createBrowserRouter } from "react-router";
import AppWrapper from "./AppWrapper";
import AccessSharingView from "./views/AccessSharingView";
import MapHomeView from "./views/MapHomeView";
import CallView from "./views/CallView";
import LinkView from "./views/LinkView";
import Link2View from "./views/Link2View";
import Link3View from "./views/Link3View";
import Link4View from "./views/Link4View";
import Link5View from "./views/Link5View";
import Link6View from "./views/Link6View";
import Link8View from "./views/Link8View";
import Link7View from "./views/Link7View";
import Link9View from "./views/Link9View";
import ProfileView from "./views/ProfileView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppWrapper,
    children: [
      { index: true, Component: AccessSharingView },
      { path: "map", Component: MapHomeView },
      { path: "call", Component: CallView },
      { path: "link", Component: LinkView },
      { path: "link2", Component: Link2View },
      { path: "link3", Component: Link3View },
      { path: "link4", Component: Link4View },
      { path: "link5", Component: Link5View },
      { path: "link6", Component: Link6View },
      { path: "link7", Component: Link7View },
      { path: "link8", Component: Link8View },
      { path: "link9", Component: Link9View },
      { path: "user", Component: ProfileView },
    ],
  },
]);
