import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

const contactInfo = [
    {
        icon: "📧",
        title: "Email Us",
        description: "Send us an email anytime",
        contact: "hello@vietnamjobexplorer.com",
        gradient: "from-blue-500 to-indigo-500",
    },
    {
        icon: "📱",
        title: "Call Us",
        description: "Speak with our team directly",
        contact: "+84 (0) 123 456 789",
        gradient: "from-indigo-500 to-purple-500",
    },
    {
        icon: "📍",
        title: "Visit Us",
        description: "Come say hello at our office",
        contact: "Ho Chi Minh City, Vietnam",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: "💬",
        title: "Social Media",
        description: "Follow us for updates",
        contact: "@VietnamJobExplorer",
        gradient: "from-pink-500 to-rose-500",
    },
];

function Contact() {
    const [heroRef, heroAnimated] = useIntersectionObserver();
    const [formRef, formAnimated] = useIntersectionObserver();
    const [infoRef, infoAnimated] = useIntersectionObserver();

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className={`py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-all duration-1000 ${
                    heroAnimated
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1
                            className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 transition-all duration-1000 delay-400 ${
                                heroAnimated
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-5"
                            }`}
                        >
                            Contact Us
                        </h1>
                        <p
                            className={`text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${
                                heroAnimated
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-5"
                            }`}
                        >
                            Have questions about our data analysis or need help
                            with your career planning? We're here to help you
                            navigate Vietnam's job market.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info Section */}
            <section className="py-20 bg-gradient-to-tr from-emerald-50 via-teal-50 to-cyan-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {" "}
                            {/* Contact Form */}
                            <div
                                ref={formRef as any}
                                className={`transition-all duration-1000 delay-200 ${
                                    formAnimated
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-10"
                                }`}
                            >
                                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-500">
                                    <CardContent className="p-0">
                                        <div className="mb-8">
                                            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                                                Let's Start a Conversation
                                            </h2>
                                            <p className="text-gray-600 leading-relaxed">
                                                Fill out the form below and
                                                we'll get back to you as soon as
                                                possible.
                                            </p>
                                        </div>

                                        <form className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="firstName"
                                                        className="text-gray-700 font-medium"
                                                    >
                                                        First Name
                                                    </Label>
                                                    <Input
                                                        id="firstName"
                                                        placeholder="Enter your first name"
                                                        className="bg-white/50 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="lastName"
                                                        className="text-gray-700 font-medium"
                                                    >
                                                        Last Name
                                                    </Label>
                                                    <Input
                                                        id="lastName"
                                                        placeholder="Enter your last name"
                                                        className="bg-white/50 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="email"
                                                    className="text-gray-700 font-medium"
                                                >
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    className="bg-white/50 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="subject"
                                                    className="text-gray-700 font-medium"
                                                >
                                                    Subject
                                                </Label>
                                                <Input
                                                    id="subject"
                                                    placeholder="What's this about?"
                                                    className="bg-white/50 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="message"
                                                    className="text-gray-700 font-medium"
                                                >
                                                    Message
                                                </Label>
                                                <Textarea
                                                    id="message"
                                                    placeholder="Tell us more about how we can help you..."
                                                    rows={6}
                                                    className="bg-white/50 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl resize-none"
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl h-12"
                                            >
                                                <span className="flex items-center gap-2">
                                                    Send Message
                                                </span>
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                            <div
                                ref={infoRef as any}
                                className={`transition-all duration-1000 delay-400 pt-8 ${
                                    infoAnimated
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 translate-x-10"
                                }`}
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                                        Get in Touch
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        We're committed to helping you succeed
                                        in your career journey.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {contactInfo.map((item, index) => (
                                        <Card
                                            key={index}
                                            className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1"
                                        >
                                            <CardContent className="p-0">
                                                <div className="flex items-start gap-4">
                                                    <div
                                                        className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center text-xl shadow-lg flex-shrink-0`}
                                                    >
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mb-2">
                                                            {item.description}
                                                        </p>
                                                        <p className="text-gray-800 font-medium">
                                                            {item.contact}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
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

export default Contact;
