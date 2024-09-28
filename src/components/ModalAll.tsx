import ModalProps from "../types/modal";

const Modal: React.FC<ModalProps> = ({
    skill,
    count,
    skillRanks,
    skillPositions,
    skillUp,
    skillDown,
    skillMonths,
    onClose,
}) => {
    if (!skill) return null;

    return (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white px-10 py-8 rounded-lg shadow-xl max-w-lg w-full relative">
                <button
                    className="absolute top-4 right-4 p-2 bg-gray-50 text-white rounded-lg hover:bg-gray-200"
                    onClick={onClose}
                >
                    <img src="/assets/icons/exit.svg" alt="exit modal" />
                </button>
                <h3 className="text-3xl font-bold text-indigo-500 mb-4">
                    {skill}
                </h3>
                <p className="text-black mb-2">
                    Ranked:{" "}
                    <span className="text-indigo-500 font-bold">
                        {skillRanks && `#${skillRanks[skill]}`}
                    </span>
                </p>
                <p className="text-black mb-4">
                    Mentions:{" "}
                    <span className="text-indigo-500 font-bold">{count}</span>{" "}
                </p>

                <hr className="my-4" />

                {skillMonths && skillMonths[skill] && (
                    <div className="text-black mb-4">
                        <p className="font-bold mb-2">📈 Trending by month</p>
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
                                            <span className="text-indigo-500 font-bold">
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

                <p className="text-black font-bold mb-2">💼 Top positions</p>
                <div className="flex flex-wrap">
                    {skillPositions &&
                        skillPositions[skill] &&
                        skillPositions[skill].map((industry, index) => (
                            <span
                                key={index}
                                className="inline-block text-sm text-black bg-indigo-50 rounded px-2 py-1 mr-2 mb-2"
                            >
                                {industry}
                            </span>
                        ))}
                </div>

                <hr className="my-4" />

                <p className="text-black font-bold mb-2">
                    🤓 Complimentary skills
                </p>

                {skillUp && (
                    <p className="text-black mb-2 text-sm">
                        <span className="text-green-500 font-bold">+</span>{" "}
                        {skillUp[0]}:{" "}
                        <span className="text-indigo-500 font-bold">
                            {skillUp[1]}
                        </span>{" "}
                        mentions
                    </p>
                )}
                {skillDown && (
                    <p className="text-black mb-2 text-sm">
                        <span className="text-red-500 font-bold">-</span>{" "}
                        {skillDown[0]}:{" "}
                        <span className="text-indigo-500 font-bold">
                            {skillDown[1]}
                        </span>{" "}
                        mentions
                    </p>
                )}

                <hr className="my-4" />

                <button
                    className="px-5 py-3 inline-flex text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded hover:bg-indigo-500 hover:shadow-md"
                    disabled
                >
                    Follow {skill}
                    <img
                        src="/assets/icons/plus.svg"
                        className="pl-3 w-8"
                        alt="exit modal"
                    />
                </button>
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
