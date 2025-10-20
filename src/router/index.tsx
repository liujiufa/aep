import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DataPageLoding from "../components/DataPageLoding";
import MainLayout from "../Layout/MainLayout";
import DeputyLayout from "../Layout/DeputyLayout";
const Home = React.lazy(() => import("../view/Home/Home"));
const Invite = React.lazy(() => import("../view/Invite"));
const ReleaseRecord = React.lazy(() => import("../view/ReleaseRecord"));
const InviteRecord = React.lazy(() => import("../view/InviteRecord"));
const Swap = React.lazy(() => import("../view/Swap"));
const Exchange = React.lazy(() => import("../view/Swap/exchange"));
const SwapRecord = React.lazy(() => import("../view/SwapRecord"));
const Earn = React.lazy(() => import("../view/Earn"));
const EarnRecord = React.lazy(() => import("../view/Earn/earnrecord"));
const Asset = React.lazy(() => import("../view/Asset"));
const Withdraw = React.lazy(() => import("../view/Asset/withdraw"));
const WithdrawRecord = React.lazy(() => import("../view/WithdrawRecord"));
const ProduceDetail = React.lazy(() => import("../view/Home/ProduceDetail"));

export default function Router() {
  return (
    <Suspense fallback={<DataPageLoding></DataPageLoding>}>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route path=":address/">
            <Route index element={<Home />}></Route>
            <Route path="invite" element={<Invite />}></Route>
            <Route path="ReleaseRecord" element={<ReleaseRecord />}></Route>
            <Route path="InviteRecord" element={<InviteRecord />}></Route>
            <Route path="swap" element={<Swap />}></Route>
            <Route path="exchange" element={<Exchange />}></Route>
            <Route path="SwapRecord" element={<SwapRecord />}></Route>
            <Route path="earn" element={<Earn />}></Route>
            <Route path="earnrecord" element={<EarnRecord />}></Route>
            <Route path="asset" element={<Asset />}></Route>
            <Route path="withdraw" element={<Withdraw />}></Route>
            <Route path="withdrawrecord" element={<WithdrawRecord />}></Route>
            <Route path="producedetail" element={<ProduceDetail />}></Route>
          </Route>
          <Route path="" element={<Home />}></Route>
        </Route>
        <Route path="/DeputyLayout" element={<DeputyLayout />}></Route>
      </Routes>
    </Suspense>
  );
}
