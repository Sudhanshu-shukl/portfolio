import React from 'react';
import { Code, Youtube, Paperclip } from 'lucide-react';

const contributions = [
    {
        title: 'Company Wise LeetCode Problems',
        description: 'A collection of LeetCode problems organized by company, designed to help developers prepare for technical interviews at top-tier companies. Features curated problem sets from 40+ leading tech companies to enable focused and efficient interview preparation.',
        link: 'https://github.com/Sudhanshu-shukl/Company-Wise-LeetCode-Problems',
        icon: Code,
        companies: [
            'Amazon', 'Apple', 'Autodesk', 'Goldman Sachs', 'Google', 'Meta', 'Microsoft', 'Netflix',
            'Nvidia', 'and 30+'
        ]
    },
    {
        title: 'DSA & Low-Level Programming Tutorials',
        description: 'Educational YouTube channel dedicated to teaching Data Structures & Algorithms, system programming, and low-level concepts. Features comprehensive tutorials, coding walkthroughs, and problem-solving strategies to help developers master fundamental computer science concepts.',
        link: 'https://www.youtube.com/channel/UCDJvfrnOpYxnVdWuJpP-5Mw',
        icon: Youtube,
        topics: [
            'Data Structures', 'Algorithms', 'System Programming', 'Memory Management', 'C/C++', 'Problem Solving'
        ]
    },
    {
        title: 'Professional Resume Template',
        description: 'A clean, modern, and ATS-friendly resume template designed for developers and tech professionals. Features optimized formatting, professional styling, and comprehensive sections to help job seekers create standout resumes that pass through applicant tracking systems.',
        link: 'https://docs.google.com/document/d/1dNqwYXKRNK7tn2BxECBUKymcS9OBEfkh/edit?usp=sharing&ouid=110849747074630112692&rtpof=true&sd=true',
        icon: Paperclip,
        features: [
            'ATS Score 90%', 'Developer Focused', 'Easy to Customize', 'Professional Layout', 'Multiple Formats'
        ]
    }
];

const Contributions = () => {
    return (
        <section id="contributions" className="py-20 px-4 max-w-sm md:max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gradient">Community Contributions</h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 md:mb-8">Small contributions to the tech community for beginners — because real progress isn't about how high you rise, but how gently you hold the world while doing it.</p>
            <ul className="space-y-4 md:space-y-8">
                {contributions.map((item, idx) => (
                    <li key={idx}>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-slate-800/60 border border-white/10 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
                                <div className="flex-shrink-0 p-2 md:p-3 bg-cyan-500/10 rounded-lg border border-cyan-400/20 group-hover:bg-cyan-500/20 transition-colors">
                                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                                    <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">{item.description}</p>
                                    {item.companies && (
                                        <div className="mb-3 md:mb-4">
                                            <h4 className="text-xs md:text-sm font-medium text-gray-400 mb-2">Companies Covered:</h4>
                                            <div className="flex flex-wrap gap-1 md:gap-2">
                                                {item.companies.map((company, companyIdx) => (
                                                    <span key={companyIdx} className="px-2 py-1 bg-slate-700/50 text-xs rounded-md text-gray-300 border border-slate-600/30">
                                                        {company}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {item.topics && (
                                        <div className="mb-3 md:mb-4">
                                            <h4 className="text-xs md:text-sm font-medium text-gray-400 mb-2">Topics Covered:</h4>
                                            <div className="flex flex-wrap gap-1 md:gap-2">
                                                {item.topics.map((topic, topicIdx) => (
                                                    <span key={topicIdx} className="px-2 py-1 bg-slate-700/50 text-xs rounded-md text-gray-300 border border-slate-600/30">
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {item.features && (
                                        <div className="mb-3 md:mb-4">
                                            <h4 className="text-xs md:text-sm font-medium text-gray-400 mb-2">Features:</h4>
                                            <div className="flex flex-wrap gap-1 md:gap-2">
                                                {item.features.map((feature, featureIdx) => (
                                                    <span key={featureIdx} className="px-2 py-1 bg-slate-700/50 text-xs rounded-md text-gray-300 border border-slate-600/30">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Contributions;
