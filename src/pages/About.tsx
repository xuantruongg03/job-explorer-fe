import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

function About() {
    const [heroRef, heroAnimated] = useIntersectionObserver();
    const [missionRef, missionAnimated] = useIntersectionObserver();
    const [visionRef, visionAnimated] = useIntersectionObserver();
    const [teamRef, teamAnimated] = useIntersectionObserver();
    const [valuesRef, valuesAnimated] = useIntersectionObserver();

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Hero Section */}
            <section 
                ref={heroRef}
                className={`py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-all duration-1000 ${
                    heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-medium mb-6 transition-all duration-1000 delay-200 ${
                            heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                        }`}>
                            <span>About Vietnam Job Explorer</span>
                        </div>
                        <h1 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 transition-all duration-1000 delay-400 ${
                            heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}>
                            Bridging Careers with Data
                        </h1>
                        <p className={`text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${
                            heroAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}>
                            We transform Vietnam's job market data into actionable insights, helping professionals make informed career decisions and organizations understand skill demand trends.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section 
                ref={missionRef}
                className={`py-20 bg-gradient-to-tr from-emerald-50 via-teal-50 to-cyan-50 transition-all duration-1000 ${
                    missionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className={`transition-all duration-1000 delay-200 ${
                                missionAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                            }`}>
                                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-medium mb-4">
                                    <span>Our Mission</span>
                                </div>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
                                    Empowering Career Growth Through Data
                                </h2>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    At Vietnam Job Explorer, our mission is to democratize access to job market insights. We believe that data-driven career decisions lead to better professional outcomes.
                                </p>
                                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                    By analyzing comprehensive employment data across Vietnam, we provide professionals, students, and organizations with the intelligence needed to navigate the evolving job landscape.
                                </p>
                                <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    <Link to="/analytics">Explore Our Data</Link>
                                </Button>
                            </div>
                            <div className={`transition-all duration-1000 delay-400 ${
                                missionAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                            }`}>
                                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                                    <CardContent className="p-0">
                                        <AspectRatio ratio={16 / 10} className="bg-gradient-to-br from-emerald-100 to-teal-100">
                                            <img
                                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                                alt="Team collaboration"
                                                className="object-cover w-full h-full rounded-3xl"
                                            />
                                        </AspectRatio>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Values Section */}
            <section 
                ref={visionRef}
                className={`py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 transition-all duration-1000 ${
                    visionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${
                            visionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}>
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-500 to-blue-500 text-white rounded-full text-sm font-medium mb-6">
                                <span>Our Vision</span>
                            </div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent mb-6">
                                Shaping Vietnam's Future Workforce
                            </h2>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                We envision a Vietnam where every professional has access to data-driven career guidance, and every organization can make informed talent decisions.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Data Transparency",
                                    description: "Making job market data accessible and understandable for everyone",
                                    icon: "📊",
                                    gradient: "from-blue-500 to-indigo-500"
                                },
                                {
                                    title: "Career Empowerment",
                                    description: "Providing tools and insights that empower career growth",
                                    icon: "🚀",
                                    gradient: "from-indigo-500 to-purple-500"
                                },
                                {
                                    title: "Industry Innovation",
                                    description: "Driving innovation in talent acquisition and development",
                                    icon: "💡",
                                    gradient: "from-purple-500 to-pink-500"
                                }
                            ].map((value, index) => (
                                <Card 
                                    key={index}
                                    className={`bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 ${
                                        visionAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                                >
                                    <CardContent className="p-0">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                                            {value.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section 
                ref={teamRef}
                className={`py-20 bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 transition-all duration-1000 ${
                    teamAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${
                            teamAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}>
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium mb-6 ">
                                <span>Our Team</span>
                            </div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                                Passionate Data Experts
                            </h2>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                Our diverse team combines expertise in data science, career counseling, and Vietnamese job market dynamics.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className={`transition-all duration-1000 delay-400 ${
                                teamAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                            }`}>
                                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
                                    <CardContent className="p-0">
                                        <AspectRatio ratio={16 / 12} className="bg-gradient-to-br from-indigo-100 to-purple-100">
                                            <img
                                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                                alt="Our team working together"
                                                className="object-cover w-full h-full rounded-3xl"
                                            />
                                        </AspectRatio>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className={`transition-all duration-1000 delay-600 ${
                                teamAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                            }`}>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">What Drives Us</h3>
                                <div className="space-y-4">
                                    {[
                                        "Data scientists with deep understanding of Vietnamese job market",
                                        "Career counselors with years of professional guidance experience",
                                        "Technology experts building user-friendly analytical tools",
                                        "Industry researchers tracking employment trends and forecasts"
                                    ].map((item, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-start gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20"
                                        >
                                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-white text-sm">✓</span>
                                            </div>
                                            <p className="text-gray-700">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default About;
