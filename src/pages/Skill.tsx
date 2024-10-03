import {
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
    Key,
    useState,
    useEffect,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import calculatePercentageDifference from "../util/calculatePercentageDifference";

const Skill = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        skill,
        count,
        skillRanks,
        skillPositions,
        skillUp,
        skillDown,
        skillMonths,
    } = location.state;

    const [chartOptions, setChartOptions] = useState<unknown>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [chartSeries, setChartSeries] = useState<any>(null);

    useEffect(() => {
        if (skillMonths && skillMonths[skill]) {
            const months = ["june", "july", "august", "september", "october"];
            const mentions = months.map(
                (month) => skillMonths[skill][month] || 0
            );

            setChartOptions({
                chart: {
                    type: "line",
                    toolbar: { show: false },
                },
                xaxis: {
                    categories: months.map(
                        (month) =>
                            month.charAt(0).toUpperCase() + month.slice(1)
                    ),
                    labels: {
                        style: {
                            fontSize: "12px",
                            fontFamily: "JetBrains Mono",
                        },
                    },
                },
                yaxis: {
                    labels: {
                        style: {
                            fontSize: "12px",
                            fontFamily: "JetBrains Mono",
                        },
                    },
                },
                stroke: {
                    curve: "smooth",
                    colors: ["#6875F5"],
                    width: 5,
                },
                fill: {
                    colors: ["#6875F5"],
                },
                tooltip: {
                    theme: "light",
                    style: { fontSize: "10px", fontFamily: "JetBrains Mono" },
                },
            });

            setChartSeries([{ name: "Mentions", data: mentions }]);
        }
    }, [skillMonths, skill]);

    return (
        <div className="mx-auto my-40 animation glow delay-1">
            <div className="mx-auto w-full max-w-screen-md px-10 pt-8 pb-5 sm:px-12 sm:pt-12 sm:pb-8 bg-white rounded-lg shadow-xl">
                <h2 className="mb-4 text-3xl font-bold text-indigo-500">
                    {skill}
                </h2>
                <p className="mb-2 text-md font-bold text-black">
                    Ranked:{" "}
                    <span className="font-bold text-indigo-500 mr-8">
                        {skillRanks && `#${skillRanks[skill]}`}
                    </span>
                    Mentions:{" "}
                    <span className="font-bold text-indigo-500">{count}</span>{" "}
                </p>

                <hr className="my-4" />

                {skillMonths && skillMonths[skill] && (
                    <div className="text-black">
                        <p className="font-bold text-md">
                            📈 Trending by month
                        </p>
                        <div className="flex flex-col md:flex-row">
                            <ul className="mr-4 pt-4 sm:text-sm text-xs ">
                                {[
                                    "june",
                                    "july",
                                    "august",
                                    "september",
                                    "october",
                                ].map((month, index, monthsArray) => {
                                    const mentions =
                                        skillMonths[skill][month] || 0;
                                    const previousMonthMentions =
                                        index > 0
                                            ? skillMonths[skill][
                                                  monthsArray[index - 1]
                                              ] || 0
                                            : 0;

                                    const percentageDifference =
                                        index > 0 &&
                                        previousMonthMentions === 0 &&
                                        mentions > 0
                                            ? "+100%"
                                            : index > 0
                                            ? calculatePercentageDifference(
                                                  mentions,
                                                  previousMonthMentions
                                              )
                                            : "TBA";

                                    return (
                                        <li key={index} className="mb-2">
                                            {month.charAt(0).toUpperCase() +
                                                month.slice(1)}
                                            :{" "}
                                            <span className="font-bold text-indigo-500">
                                                {mentions}
                                            </span>{" "}
                                            mentions{" "}
                                            {percentageDifference !== "TBA" && (
                                                <span
                                                    className={`${
                                                        percentageDifference.startsWith(
                                                            "+"
                                                        )
                                                            ? "text-green-500 p-1 bg-indigo-50 rounded font-bold"
                                                            : "text-red-500 p-1 bg-indigo-50 rounded font-bold"
                                                    } ml-2`}
                                                >
                                                    {percentageDifference}
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                            {chartOptions && chartSeries && (
                                <div className="w-full md:w-1/2">
                                    <Chart
                                        options={chartOptions}
                                        series={chartSeries}
                                        type="line"
                                        height={200}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <hr className="my-4" />

                <p className="mb-2 font-bold text-md text-black">
                    💼 Top positions
                </p>
                <div className="flex flex-wrap pt-2">
                    {skillPositions &&
                        skillPositions[skill] &&
                        skillPositions[skill].map(
                            (
                                position:
                                    | string
                                    | number
                                    | boolean
                                    | ReactElement<
                                          unknown,
                                          | string
                                          | JSXElementConstructor<unknown>
                                      >
                                    | Iterable<ReactNode>
                                    | ReactPortal
                                    | null
                                    | undefined,
                                index: Key | null | undefined
                            ) => (
                                <span
                                    key={index}
                                    className="inline-block px-2 py-1 mb-2 mr-2 text-xs text-black rounded bg-indigo-50"
                                >
                                    {position}
                                </span>
                            )
                        )}
                </div>

                <hr className="my-4" />

                <p className="mb-2 font-bold text-md text-black">
                    🤓 Complementary skills
                </p>

                {skillUp && (
                    <p className="pt-2 mb-2 sm:text-sm text-xs text-black">
                        <span className="font-bold text-green-500">+</span>{" "}
                        {skillUp[0]}:{" "}
                        <span className="font-bold text-indigo-500">
                            {skillUp[1]}
                        </span>{" "}
                        mentions
                    </p>
                )}
                {skillDown && (
                    <p className="mb-2 sm:text-sm text-xs text-black">
                        <span className="font-bold text-red-500">-</span>{" "}
                        {skillDown[0]}:{" "}
                        <span className="font-bold text-indigo-500">
                            {skillDown[1]}
                        </span>{" "}
                        mentions
                    </p>
                )}

                <hr className="my-4" />

                <button
                    className="inline-flex px-5 py-3 text-sm text-white bg-indigo-500 border-2 border-indigo-500 rounded hover:bg-indigo-600 hover:bg-indigo-500 hover:shadow-md"
                    disabled
                >
                    Follow {skill}
                    <img
                        src="/assets/icons/plus.svg"
                        className="w-8 pl-3"
                        alt="exit modal"
                    />
                </button>

                <Link to={`/jobs/${skill}`}>
                    <button className="inline-flex items-center justify-center px-5 py-3 mt-2 text-sm sm:ml-3 ml-1 text-indigo-500 border border-2 border-indigo-300 rounded sm:ml-3 bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
                        {skill} Jobs
                    </button>
                </Link>

                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm mt-8 text-gray-500 border rounded px-3 py-1 hover:bg-gray-100"
                    >
                        ← back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Skill;
