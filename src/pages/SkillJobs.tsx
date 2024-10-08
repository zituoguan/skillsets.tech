import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Job from "../types/job";

async function getData() {
    const response = await fetch("/data/all.json");
    const data = await response.json();
    return data;
}

const SkillJobs = () => {
    const navigate = useNavigate();
    const { skill } = useParams<{ skill: string }>();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

    const capitalizeFirstLetter = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    useEffect(() => {
        async function fetchJobs() {
            const data = await getData();
            setJobs(data);
        }
        fetchJobs();
    }, []);

    useEffect(() => {
        if (skill && jobs.length > 0) {
            const filtered = jobs.filter((job) => job.skills.includes(skill));
            setFilteredJobs(filtered);
        }
    }, [skill, jobs]);

    return (
        <div className="mx-auto my-32 animation glow delay-1">
            <div className="mx-auto w-full max-w-screen-md px-10 pt-8 pb-5 sm:px-12 sm:pt-8 sm:pb-8 bg-white rounded-lg shadow-xl">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-gray-500 border rounded px-3 py-1 hover:bg-gray-100"
                    >
                        ←
                    </button>
                </div>
                <h2 className="mt-4 mb-4 text-3xl font-bold text-indigo-500">
                    Browse job listings for {skill}
                </h2>
                <p className="mb-2 text-md text-black">
                    {filteredJobs.length > 0 ? (
                        <>
                            <span className="font-bold text-indigo-500">
                                {filteredJobs.length}
                            </span>{" "}
                            job advertisement
                            {filteredJobs.length > 1 ? "s" : ""} for{" "}
                            <span className="font-bold text-indigo-500">
                                {skill}
                            </span>
                        </>
                    ) : (
                        <>
                            No job listings found for{" "}
                            <span className="font-bold text-indigo-500">
                                {skill}
                            </span>
                        </>
                    )}
                </p>

                <hr className="my-4" />

                {filteredJobs.length > 0 && (
                    <div className="grid max-w-screen-sm grid-cols-1 gap-4 px-4 mx-auto mt-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mb-80 animation glow delay-1">
                        {filteredJobs.map((job, index) => (
                            <a
                                key={index}
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between block p-6 transition-all duration-200 bg-gray-100 border border-transparent shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:border-indigo-300"
                            >
                                <div className="flex-grow">
                                    <h3 className="text-lg sm:text-xl">
                                        Skill Found:{" "}
                                        <span className="text-indigo-500">
                                            {skill}
                                        </span>
                                    </h3>
                                    <p className="mt-2 text-sm text-black">
                                        Industry:{" "}
                                        <span className="text-indigo-500">
                                            {capitalizeFirstLetter(
                                                job.industry
                                            )}
                                        </span>
                                    </p>
                                    <p className="mt-1 text-sm text-black">
                                        Month:{" "}
                                        <span className="text-indigo-500">
                                            {capitalizeFirstLetter(job.month)}
                                        </span>
                                    </p>
                                </div>
                                <img
                                    src="/assets/icons/external-link.svg"
                                    alt="link"
                                    className="w-7"
                                />
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillJobs;
