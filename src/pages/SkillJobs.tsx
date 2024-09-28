import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Job from "../types/job";

async function getData() {
    const response = await fetch("/data/all.json");
    const data = await response.json();
    return data;
}

const SkillJobs = () => {
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
        <div className="app">
            <header className="p-4 pt-40 mb-10 text-center animation glow delay-1">
                <h2 className="mt-10 text-4xl font-bold">
                    Browse job listings for{" "}
                    <span className="text-indigo-500">{skill}</span>
                </h2>
                <h2 className="mt-8 text-xl">
                    View analyzed job advertisements
                </h2>
            </header>
            <div className="flex flex-col items-center justify-center mx-auto mb-8 text-center animation glow delay-2 sm:flex-row">
                <Link to="/" className="mt-4 ml-0 sm:ml-8 sm:mt-0">
                    <button className="inline-flex items-center justify-center px-8 py-4 text-sm text-white bg-indigo-500 border border-2 border-indigo-500 rounded hover:bg-indigo-500 hover:shadow-lg">
                        <img
                            src="/assets/icons/arrow-right.svg"
                            alt="arrow-right"
                            className="w-5 transition-transform rotate-180"
                        />
                        <span className="ml-3">Back to skills</span>
                    </button>
                </Link>
            </div>
            <div className="max-w-screen-lg p-4 mx-auto mt-0 mb-40 animation glow delay-3">
                {filteredJobs.length > 0 ? (
                    <>
                        <p className="mb-8 text-center text-md">
                            <span className="font-bold text-indigo-500">
                                {filteredJobs.length}
                            </span>{" "}
                            job advertisement
                            {filteredJobs.length > 1 ? "s" : ""} for{" "}
                            <span className="font-bold text-indigo-500">
                                {skill}
                            </span>
                        </p>

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
                                            Job Skill:{" "}
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
                                                {capitalizeFirstLetter(
                                                    job.month
                                                )}
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
                    </>
                ) : (
                    <div className="text-center">
                        <p className="text-black text-md">
                            No job listings found for{" "}
                            <span className="text-indigo-500">{skill}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkillJobs;
