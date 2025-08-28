import { useTranslation } from "react-i18next";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addMessage, dateFormat, showLoding } from "../utils/tool";
import { notification } from "antd";
import styled from "styled-components";
import { useViewport } from "./viewportContext";
import { FlexBox } from "./FlexBox";
import { getMineData } from "../API";

interface ChartsLineProps {
  height?: string;
  chartsData?: any[];
}

const ChartTools = styled.div`
  padding: 0px 1.33rem;
  color: #fff;
  font-family: "Clash Display";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  .refresh_box {
    margin-top: 1.33rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.66667rem;
      background: #9aa8d9;
      padding: 0.67rem 1.17rem;
      color: #000;
      font-family: "Clash Display";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      svg {
        margin-left: 0.33rem;
      }
    }
  }
`;

const ChartsLine: React.FC<ChartsLineProps> = ({ height, chartsData }) => {
  const { t } = useTranslation();
  const { width } = useViewport();
  const getOption = () => {
    let option = {
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "7%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: list?.map((item: any) => {
            const date = new Date(item.createTime); // 转换时间戳到日期对象
            const options: any = { month: "short", day: "numeric" }; // 格式化选项
            return date.toLocaleDateString("en-US", options); // 转换为 "May 1" 格式
          }) || [0, 0, 0, 0, 0, 0, 0],
          axisLine: {
            // X轴轴线配置
            lineStyle: {
              color: "#9AA8D9", // 轴线颜色
            },
          },
          axisLabel: {
            color: "#9AA8D9", // 设置X轴文字颜色
            fontSize: 12,
            fontWeight: "600",
          },

          axisTick: {
            show: false, // 不显示刻度线
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLine: {
            // X轴轴线配置
            lineStyle: {
              color: "#9aa8d933", // 轴线颜色
            },
          },
          axisLabel: {
            color: "#9AA8D9", // 设置X轴文字颜色
            fontSize: 12,
            fontWeight: "600",
          },
          splitNumber: 6,
          splitLine: {
            lineStyle: { color: "rgba(154, 168, 217, 0.20)" },
          },
        },
      ],
      series: [
        {
          type: "line",
          label: {
            show: true,
            position: "top",
          },
          emphasis: {
            focus: "series",
          },
          symbol: "circle", // 使用圆形符号
          symbolSize: 10, // 单一数值表示直径
          // 设置折线颜色
          lineStyle: {
            color: "#9AA8D9", // 线条颜色
            width: 1, // 线条宽度
          },
          // 设置折线上的数据点样式
          itemStyle: {
            color: "#6B72FF", // 小圆点内部颜色
            borderColor: "#fff", // 边框颜色
            borderWidth: 2, // 边框宽度
            borderRadius: 5, // 保持默认圆形
          },
          data: list?.map((item: any) => item?.num) || [0, 0, 0, 0, 0, 0, 0],
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#6B72FF",
              },
              {
                offset: 1,
                color: "rgba(107, 114, 255, 0)",
              },
            ]),
          },
        },
      ],
    };
    return option;
  };

  const token = useSelector((state: any) => state?.token);
  const [tab, setTab] = useState(3);

  useEffect(() => {
    if (!token) return;
  }, [token]);

  // 列表数据
  // const value: any = sessionStorage.getItem(address);
  const [list, setList] = useState<any>([]);
  const getDepinEarningsDay = async () => {
    getMineData()
      .then((res: any) => {
        setList(res.data || []);
        showLoding(false);
      })
      .catch((res: any) => {
        showLoding(false);
      });
  };

  useEffect(() => {
    getDepinEarningsDay();
    if (token) {
    }
  }, [token, tab]);

  return (
    <>
      <ChartTools>
        {t("Mining Data")}
        <div className="refresh_box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M3 2.49951C3.552 2.49951 4.0005 2.94801 4.0005 3.50001V14.4995C4.0005 16.1795 4.002 17.336 4.1205 18.2075C4.1565 18.4895 4.206 18.725 4.2645 18.9245C4.66082 17.0173 5.21369 15.1459 5.9175 13.3295C6.411 12.0875 7.0005 10.8845 7.68 9.97701C8.325 9.11601 9.24 8.26401 10.428 8.26401C11.286 8.26401 11.9175 8.71401 12.36 9.18201C12.7785 9.62451 13.125 10.1885 13.404 10.6445L13.4235 10.676C13.7355 11.186 13.9785 11.5745 14.2335 11.849C14.4765 12.1085 14.61 12.134 14.6865 12.134C14.9415 12.134 15.252 11.996 15.6555 11.2895C16.044 10.61 16.356 9.68901 16.716 8.62401L16.7595 8.49651C17.1165 7.44201 17.5275 6.24501 18.1095 5.31651C18.708 4.37001 19.6155 3.50001 21 3.50001C21.1345 3.4948 21.2688 3.5168 21.3946 3.56469C21.5204 3.61259 21.6353 3.68539 21.7324 3.77874C21.8294 3.87209 21.9066 3.98406 21.9593 4.10796C22.0121 4.23185 22.0392 4.36511 22.0392 4.49976C22.0392 4.63441 22.0121 4.76767 21.9593 4.89157C21.9066 5.01546 21.8294 5.12744 21.7324 5.22079C21.6353 5.31414 21.5204 5.38694 21.3946 5.43483C21.2688 5.48273 21.1345 5.50472 21 5.49951C20.5995 5.49951 20.226 5.70951 19.8045 6.38151C19.3695 7.07301 19.0275 8.03451 18.6525 9.13851L18.5835 9.34251C18.2505 10.3325 17.88 11.4275 17.391 12.2825C16.869 13.1945 16.035 14.135 14.6865 14.135C13.8315 14.135 13.2045 13.6775 12.771 13.2125C12.366 12.7775 12.027 12.2255 11.751 11.7755L11.7195 11.723C11.409 11.2175 11.1645 10.829 10.9065 10.556C10.6635 10.298 10.521 10.2635 10.428 10.2635C10.239 10.2635 9.843 10.4225 9.282 11.1755C8.754 11.8805 8.241 12.896 7.776 14.0675C6.98997 16.0958 6.40711 18.1971 6.036 20.3405C6.1155 20.3555 6.201 20.369 6.2925 20.381C7.1625 20.498 8.322 20.501 10.0005 20.501H21C21.1345 20.4958 21.2688 20.5178 21.3946 20.5657C21.5204 20.6136 21.6353 20.6864 21.7324 20.7797C21.8294 20.8731 21.9066 20.9851 21.9593 21.109C22.0121 21.2329 22.0392 21.3661 22.0392 21.5008C22.0392 21.6354 22.0121 21.7687 21.9593 21.8926C21.9066 22.0165 21.8294 22.1284 21.7324 22.2218C21.6353 22.3151 21.5204 22.3879 21.3946 22.4358C21.2688 22.4837 21.1345 22.5057 21 22.5005H9.9285C8.3385 22.5005 7.0455 22.5005 6.0255 22.3625C4.962 22.22 4.047 21.9125 3.318 21.182C2.589 20.453 2.28 19.538 2.1375 18.473C1.9995 17.453 1.9995 16.16 1.9995 14.573V3.50001C1.9995 2.94801 2.448 2.49951 3 2.49951Z"
              fill="white"
            />
          </svg>
          <div
            className="text-[#1C1C1C] text-[20px]  mx-0 px-14 py-8 rounded-lg bg-[#ACFF79] cursor-pointer flex items-center hover:bg-[#57E400] refreshClassName"
            onClick={() => {
              showLoding(true);
              getDepinEarningsDay();
            }}
          >
            {t("Refresh")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M14.7316 6.41101H11.714C11.6225 6.41102 11.5319 6.39301 11.4474 6.35801C11.3629 6.32301 11.2861 6.2717 11.2214 6.20701C11.1567 6.14232 11.1054 6.06552 11.0703 5.981C11.0353 5.89647 11.0173 5.80588 11.0173 5.71439C11.0173 5.6229 11.0353 5.53231 11.0703 5.44778C11.1054 5.36326 11.1567 5.28646 11.2214 5.22177C11.2861 5.15708 11.3629 5.10577 11.4474 5.07077C11.5319 5.03577 11.6225 5.01776 11.714 5.01778H12.926C12.3697 4.22842 11.6318 3.58442 10.7745 3.1401C9.9171 2.69577 8.96547 2.46415 7.99983 2.46476C6.80621 2.46491 5.63944 2.819 4.64706 3.48226C3.65467 4.14553 2.88124 5.08817 2.42457 6.191C1.9679 7.29382 1.84848 8.50731 2.08144 9.678C2.31439 10.8487 2.88925 11.924 3.73331 12.768C4.57738 13.612 5.65275 14.1867 6.82344 14.4195C7.99413 14.6523 9.20757 14.5328 10.3103 14.076C11.4131 13.6191 12.3556 12.8456 13.0187 11.8531C13.6818 10.8606 14.0358 9.69375 14.0358 8.5001C14.0327 8.40676 14.0485 8.31375 14.0821 8.2266C14.1157 8.13946 14.1665 8.05997 14.2314 7.99286C14.2964 7.92574 14.3742 7.87238 14.4602 7.83593C14.5461 7.79948 14.6386 7.7807 14.732 7.7807C14.8254 7.7807 14.9178 7.79948 15.0038 7.83593C15.0898 7.87238 15.1676 7.92574 15.2325 7.99286C15.2975 8.05997 15.3483 8.13946 15.3819 8.2266C15.4155 8.31375 15.4313 8.40676 15.4282 8.5001C15.4282 12.6022 12.1018 15.9287 7.99983 15.9287C3.89781 15.9287 0.571442 12.6022 0.571442 8.5001C0.571442 4.39798 3.89781 1.07153 7.99983 1.07153C9.18087 1.07098 10.3449 1.35284 11.3949 1.8936C12.4449 2.43437 13.3503 3.21837 14.0358 4.1802V2.92868C14.0327 2.83533 14.0485 2.74232 14.0821 2.65518C14.1157 2.56804 14.1665 2.48854 14.2314 2.42143C14.2964 2.35431 14.3742 2.30095 14.4602 2.2645C14.5461 2.22805 14.6386 2.20927 14.732 2.20927C14.8254 2.20927 14.9178 2.22805 15.0038 2.2645C15.0898 2.30095 15.1676 2.35431 15.2325 2.42143C15.2975 2.48854 15.3483 2.56804 15.3819 2.65518C15.4155 2.74232 15.4313 2.83533 15.4282 2.92868V5.71439C15.4282 5.89914 15.3548 6.07633 15.2242 6.20697C15.0935 6.33761 14.9164 6.41101 14.7316 6.41101Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </ChartTools>

      <ReactEcharts style={{ height: "350px" }} option={getOption()} />
    </>
  );
};

export default ChartsLine;
