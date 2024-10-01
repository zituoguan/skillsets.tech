import { Link } from "react-router-dom";
import ModalProps from "../types/modal";

const Modal: React.FC<ModalProps> = ({
    skill,
    count,
    skillRanks,
    skillUp,
    skillDown,
    skillMonths,
    onClose,
}) => {
    if (!skill) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 backdrop-blur-sm">
            <div className="relative w-full max-w-lg px-10 py-8 bg-white rounded-lg shadow-xl">
                <button
                    className="absolute p-2 text-white rounded-lg top-4 right-4 bg-gray-50 hover:bg-gray-200"
                    onClick={onClose}
                >
                    <img src="/assets/icons/exit.svg" alt="exit modal" />
                </button>
                <h3 className="mb-4 text-3xl font-bold text-indigo-500">
                    {skill}
                </h3>
                <p className="mb-2 text-sm text-black">
                    Ranked:{" "}
                    <span className="font-bold text-indigo-500">
                        {skillRanks && `#${skillRanks[skill]}`}
                    </span>
                </p>
                <p className="mb-4 text-sm text-black">
                    Mentions:{" "}
                    <span className="font-bold text-indigo-500">{count}</span>{" "}
                </p>

                <hr className="my-4" />

                {skillMonths && skillMonths[skill] && (
                    <div className="mb-4 text-black text-sm">
                        <p className="mb-2 font-bold">📈 Trending by month</p>
                        <ul>
                            {Object.entries(skillMonths[skill])
                                .sort(([monthA], [monthB]) => {
                                    const monthsOrder = [
                                        "january",
                                        "february",
                                        "march",
                                        "april",
                                        "may",
                                        "june",
                                        "july",
                                        "august",
                                        "september",
                                        "october",
                                        "november",
                                        "december",
                                    ];
                                    return (
                                        monthsOrder.indexOf(monthA) -
                                        monthsOrder.indexOf(monthB)
                                    );
                                })
                                .map(([month, mentions], index, arr) => {
                                    const previousMonthMentions =
                                        index > 0 ? arr[index - 1][1] : 0;
                                    const percentageDifference =
                                        index > 0
                                            ? calculatePercentageDifference(
                                                  mentions,
                                                  previousMonthMentions
                                              )
                                            : "TBA";

                                    return (
                                        <li
                                            key={index}
                                            className="mb-2 text-sm"
                                        >
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
                    </div>
                )}

                <hr className="my-4" />

                <p className="mb-2 font-bold text-sm text-black">
                    🤓 Complimentary skills
                </p>

                {skillUp && (
                    <p className="mb-2 text-sm text-black">
                        <span className="font-bold text-green-500">+</span>{" "}
                        {skillUp[0]}:{" "}
                        <span className="font-bold text-indigo-500">
                            {skillUp[1]}
                        </span>{" "}
                        mentions
                    </p>
                )}
                {skillDown && (
                    <p className="mb-2 text-sm text-black">
                        <span className="font-bold text-sm text-red-500">
                            -
                        </span>{" "}
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
            </div>
        </div>
    );
};

function calculatePercentageDifference(
    current: number,
    previous: number
): string {
    if (previous === 0) return "TBA";
    const difference = ((current - previous) / previous) * 100;
    const roundedDifference = Math.round(difference * 100) / 100;
    return roundedDifference > 0
        ? `+${roundedDifference}%`
        : `${roundedDifference}%`;
}

export default Modal;
