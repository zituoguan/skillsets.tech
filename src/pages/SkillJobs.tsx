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
            <header className="text-center pt-40 mb-10 p-4 animation glow delay-1">
                <h2 className="text-4xl font-bold mt-10">
                    Browse job listings for{" "}
                    <span className="text-indigo-500">{skill}</span>
                </h2>
                <h2 className="text-xl mt-8">
                    View analyzed job advertisements
                </h2>
            </header>
            <div className="mx-auto text-center mb-8 animation glow delay-2 flex flex-col sm:flex-row justify-center items-center">
                <Link to="/" className="sm:ml-8 ml-0 sm:mt-0 mt-4">
                    <button className="px-8 py-4 inline-flex items-center justify-center text-sm bg-indigo-500 text-white rounded hover:bg-indigo-500 hover:shadow-lg border border-indigo-500 border-2">
                        <img
                            src="/assets/icons/arrow-right.svg"
                            alt="arrow-right"
                            className="w-5 transition-transform rotate-180"
                        />
                        <span className="ml-3">Back to skills</span>
                    </button>
                </Link>
            </div>
            <div className="mt-0 mb-40 mx-auto max-w-screen-lg p-4 animation glow delay-3">
                {filteredJobs.length > 0 ? (
                    <>
                        <p className="text-md text-center mb-8">
                            <span className="text-indigo-500 font-bold">
                                {filteredJobs.length}
                            </span>{" "}
                            job advertisement
                            {filteredJobs.length > 1 ? "s" : ""} for{" "}
                            <span className="text-indigo-500 font-bold">
                                {skill}
                            </span>
                        </p>

                        <div className="max-w-screen-sm mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-10 mb-80 px-4 animation glow delay-1">
                            {filteredJobs.map((job, index) => (
                                <a
                                    key={index}
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-gray-100 p-6 rounded-xl flex items-center justify-between cursor-pointer border border-transparent shadow-md hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
                                >
                                    <div className="flex-grow">
                                        <h3 className="sm:text-xl text-lg">
                                            Job Skill:{" "}
                                            <span className="text-indigo-500">
                                                {skill}
                                            </span>
                                        </h3>
                                        <p className="text-black text-sm mt-2">
                                            Industry:{" "}
                                            <span className="text-indigo-500">
                                                {capitalizeFirstLetter(
                                                    job.industry
                                                )}
                                            </span>
                                        </p>
                                        <p className="text-black text-sm mt-1">
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
                        <p className="text-md text-black">
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
