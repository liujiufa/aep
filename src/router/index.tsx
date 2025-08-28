import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DataPageLoding from "../components/DataPageLoding";
import MainLayout from "../Layout/MainLayout";
import DeputyLayout from "../Layout/DeputyLayout";
const Home = React.lazy(() => import("../view/Home/Home"));
const UserList = React.lazy(() => import("../view/UserList"));
const Stake = React.lazy(() => import("../view/Stake"));
const StakingRecord = React.lazy(() => import("../view/StakingRecord"));
const Node = React.lazy(() => import("../view/Node"));
const MountRecord = React.lazy(() => import("../view/MountRecord"));
const WithdrawRecord = React.lazy(() => import("../view/WithdrawRecord"));
const PersonCenter = React.lazy(() => import("../view/PersonCenter"));
const MyFriends = React.lazy(() => import("../view/MyFriends"));
const BlindBox = React.lazy(() => import("../view/BlindBox"));
const AllPledgeAmount = React.lazy(() => import("../view/AllPledgeAmount"));
const PledgeOut = React.lazy(() => import("../view/PledgeOut"));
const BlindRelease = React.lazy(() => import("../view/BlindRelease"));
const PendingGet = React.lazy(() => import("../view/PendingGet"));
const DataDetail = React.lazy(() => import("../view/DataDetail"));
const NodeDevide = React.lazy(() => import("../view/NodeDevide"));
const BlindBuyRecord = React.lazy(() => import("../view/BlindBox/record"));
export default function Router() {
  return (
    <Suspense fallback={<DataPageLoding></DataPageLoding>}>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route path=":address/">
            <Route index element={<Home />}></Route>
            <Route path="userlist" element={<UserList />}></Route>
            <Route path="stake" element={<Stake />}></Route>
            <Route path="stakingrecord" element={<StakingRecord />}></Route>
            <Route path="node" element={<Node />}></Route>
            <Route path="mountrecord" element={<MountRecord />}></Route>
            <Route path="withdrawrecord" element={<WithdrawRecord />}></Route>
            <Route path="person" element={<PersonCenter />}></Route>
            <Route path="myfriends" element={<MyFriends />}></Route>
            <Route path="blind_box" element={<BlindBox />}></Route>
            <Route
              path="all_pledge_amount"
              element={<AllPledgeAmount />}
            ></Route>
            <Route path="pledge_out" element={<PledgeOut />}></Route>
            <Route path="blind_release" element={<BlindRelease />}></Route>
            <Route path="blind_record" element={<BlindBuyRecord />}></Route>
            <Route path="pending_get" element={<PendingGet />}></Route>
            <Route path="data_detail" element={<DataDetail />}></Route>
            <Route path="node_devide" element={<NodeDevide />}></Route>
          </Route>
          <Route path="" element={<Home />}></Route>
        </Route>
        <Route path="/DeputyLayout" element={<DeputyLayout />}></Route>
      </Routes>
    </Suspense>
  );
}
