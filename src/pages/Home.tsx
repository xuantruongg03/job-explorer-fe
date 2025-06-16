import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { Link } from "react-router-dom";

const Home = () => {
    const [aimSectionRef, aimSectionAnimated] = useIntersectionObserver();
    const [dataSectionRef, dataSectionAnimated] = useIntersectionObserver();
    const [companySectionRef, companySectionAnimated] = useIntersectionObserver();
    const [ctaSectionRef, ctaSectionAnimated] = useIntersectionObserver();

    return (
        <div className="min-h-screen bg-background">
            <section className="relative min-h-screen flex items-center w-full">
                <video
                    autoPlay
                    muted
                    loop
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source
                        src="https://res.cloudinary.com/ddqunbug9/video/upload/v1749220264/zhsc0mcomdgtai7xu0tg.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10  text-white">
                    <div className="container mx-auto px-20 py-24">
                        <div className="max-w-4xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Exploring Vietnam's And The Global Job Market
                            </h1>
                            <p className="text-xl mb-8">
                                Discover the most in-demand skills and trends in
                                Vietnam's and the global growing job market through
                                comprehensive data analysis and visualization.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="font-medium"
                                >
                                    <Link to="/analytics">Explore Analytics</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="bg-white/20 hover:bg-white/30 text-white border-white/40"
                                >
                                    <Link to="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section 
                ref={aimSectionRef}
                className={`py-20 min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-all duration-1000 ${
                    aimSectionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className={`lg:w-1/2 transition-all duration-1000 delay-200 ${
                            aimSectionAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                        }`}>
                            <div className="mb-6">
                                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-medium mb-4">
                                    <span>Our Mission</span>
                                </div>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                                    Our Aim
                                </h2>
                            </div>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                At Vietnam Job Explorer, we aim to bridge the
                                gap between job seekers and employers by
                                providing valuable insights into the skills that
                                drive Vietnam's job market.
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Through comprehensive data analysis, we help
                                professionals make informed career decisions and
                                assist organizations in understanding skill
                                demand trends across different industries.
                            </p>
                            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <Link to="/about">Learn More About Us</Link>
                            </Button>
                        </div>
                        <div className={`lg:w-1/2 transition-all duration-1000 delay-400 ${
                            aimSectionAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                        }`}>
                            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
                                <CardContent className="p-0">
                                    <AspectRatio
                                        ratio={16 / 9}
                                        className="bg-gradient-to-br from-blue-100 to-indigo-100"
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
                                            alt="Team analyzing data"
                                            className="object-cover w-full h-full rounded-3xl"
                                        />
                                    </AspectRatio>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>            <section 
                ref={dataSectionRef}
                className={`py-20 min-h-screen flex items-center bg-gradient-to-tr from-emerald-50 via-teal-50 to-cyan-50 transition-all duration-1000 ${
                    dataSectionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className={`lg:w-1/2 transition-all duration-1000 delay-200 ${
                            dataSectionAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                        }`}>
                            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                                <CardContent className="p-0">
                                    <AspectRatio
                                        ratio={16 / 9}
                                        className="bg-gradient-to-br from-emerald-100 to-teal-100"
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
                                            alt="Data visualization dashboard"
                                            className="object-cover w-full h-full rounded-3xl"
                                        />
                                    </AspectRatio>
                                </CardContent>
                            </Card>
                        </div>
                        <div className={`lg:w-1/2 transition-all duration-1000 delay-400 ${
                            dataSectionAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                        }`}>
                            <div className="mb-6">
                                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-medium mb-4">
                                    <span>Data Excellence</span>
                                </div>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
                                    About Data
                                </h2>
                            </div>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                The data we provide is meticulously
                                collected and analyzed to ensure accuracy and
                                relevance. We focus on the most in-demand skills
                                across various sectors, including technology,
                                finance, healthcare, and more.
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Data is collected from various sources and spans multiple fields, 
                                from technology, finance, healthcare to other professions. 
                                We use data sources including job websites in Vietnam such as VietnamWorks, 
                                JobStreet, and TopCV, among others. 
                                In addition, data is also collected from foreign news sources, 
                                surveys abroad, along with market reports and industry research.
                            </p>
                            <div className={`flex flex-wrap gap-3 transition-all duration-1000 delay-600 ${
                                dataSectionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}>
                                <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200">
                                    VietnamWorks
                                </div>
                                <div className="inline-flex items-center px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200">
                                    JobStreet
                                </div>
                                <div className="inline-flex items-center px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200">
                                    TopCV
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>            {/* Company Overview */}
            <section 
                ref={companySectionRef}
                className={`py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 transition-all duration-700 ${
                    companySectionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className={`text-center mb-16 transition-all duration-100 ${
                        companySectionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-600 to-blue-600 text-white rounded-full text-sm font-medium mb-6 animate-pulse">
                            <span>Our Services</span>
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent mb-6">
                            Company Overview
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Discover how we're transforming the job market analysis landscape through innovative solutions
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        <Card className={`bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-100 group transform hover:scale-105 hover:-rotate-1 ${
                            companySectionAnimated ? 'scale-100' : 'scale-95 opacity-0 translate-y-10'
                        }`} >
                            <CardContent className="pt-8 pb-6 text-center relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                                <div className="mb-6 text-emerald-500 mx-auto">
                                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-2xl inline-flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="group-hover:scale-110 transition-transform duration-100"
                                        >
                                            <path d="M3 3v5h5" />
                                            <path d="M21 21v-5h-5" />
                                            <path d="M21 3l-9 9" />
                                            <path d="M3 21l9-9" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Data-Driven Insights
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We collect and analyze vast amounts of
                                    employment data to provide accurate,
                                    up-to-date insights into Vietnam's job
                                    market.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className={`bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-100 group transform hover:scale-105 ${
                            companySectionAnimated ? 'scale-100' : 'scale-95 opacity-0 translate-y-10'
                        }`}>
                            <CardContent className="pt-8 pb-6 text-center relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>                                <div className="mb-6 text-blue-500 mx-auto">
                                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-2xl inline-flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="group-hover:scale-110 transition-transform duration-100"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="2" x2="22" y1="12" y2="12" />
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Market Research
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our team of researchers and analysts
                                    constantly monitor industry trends to
                                    provide valuable insights into the job
                                    market.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className={`bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-100 group transform hover:scale-105 hover:rotate-1 ${
                            companySectionAnimated ? 'scale-100' : 'scale-95 opacity-0 translate-y-10'
                        }`}>
                            <CardContent className="pt-8 pb-6 text-center relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-500 to-gray-500"></div>
                                <div className="mb-6 text-slate-500 mx-auto">
                                    <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-4 rounded-2xl inline-flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="group-hover:scale-110 transition-transform duration-100"
                                        >
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5" />
                                            <path d="M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Career Growth
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We help professionals identify the most
                                    in-demand skills to focus their career
                                    development effectively.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>{/* CTA Section */}            <section 
                ref={ctaSectionRef}
                className={`py-24 bg-gradient-to-br from-slate-800 via-gray-800 to-blue-900 relative overflow-hidden transition-all duration-1000 ${
                    ctaSectionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-blue-600/20"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className={`absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse transition-all duration-1000 ${
                        ctaSectionAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}></div>
                    <div className={`absolute top-32 right-20 w-16 h-16 bg-blue-300 rounded-full animate-pulse delay-1000 transition-all duration-1000 ${
                        ctaSectionAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}></div>
                    <div className={`absolute bottom-20 left-20 w-12 h-12 bg-slate-300 rounded-full animate-pulse delay-500 transition-all duration-1000 ${
                        ctaSectionAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}></div>
                    <div className={`absolute bottom-32 right-32 w-8 h-8 bg-gray-300 rounded-full animate-pulse delay-700 transition-all duration-1000 ${
                        ctaSectionAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className={`inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 transition-all duration-1000 delay-200 ${
                            ctaSectionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                        }`}>
                            <span>Start Your Journey</span>
                        </div>
                        <h2 className={`text-4xl md:text-5xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-400 ${
                            ctaSectionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}>
                            Ready to Explore Job Market Data?
                        </h2>
                        <p className={`text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${
                            ctaSectionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}>
                            Dive into our comprehensive data analysis and discover
                            the skills that are shaping Vietnam's job market today.
                            Get insights that drive your career forward.
                        </p>
                        <div className={`flex flex-col sm:flex-row justify-center gap-6 transition-all duration-1000 delay-800 ${
                            ctaSectionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}>
                            <Button asChild size="lg" className="bg-white text-slate-700 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold px-8 py-4 rounded-2xl transform hover:scale-105">
                                <Link to="/analytics">
                                    <span className="flex items-center gap-2">
                                        View Data Analysis
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-white/30 hover:text-white text-slate-700 hover:bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold px-8 py-4 rounded-2xl transform hover:scale-105">
                                <Link to="/contact">
                                    <span className="flex items-center gap-2">
                                        Contact Our Team
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
