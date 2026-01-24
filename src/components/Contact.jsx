import { Mail, MapPin, Building2, MessageSquare } from 'lucide-react';

const Contact = () => {
  const contactDetails = [
    {
      icon: <Mail className="text-blue-400" size={28} />,
      title: "Email Us",
      value: "anasmemonbusiness@gmail.com",
      link: "mailto:anasmemonbusiness@gmail.com"
    },
    {
      icon: <MessageSquare className="text-green-400" size={28} />,
      title: "WhatsApp",
      value: "+92 322 0274707 / +92 349 2516456",
      link: "https://wa.me/923220274707"
    },
    {
      icon: <MapPin className="text-red-400" size={28} />,
      title: "Our Location",
      value: "Gulshan-e-Iqbal Block 5, NIPA Chowrangi, Karachi",
      link: "https://www.google.com/maps/search/NIPA+Chowrangi+Gulshan+e+Iqbal+Block+5"
    },
    {
      icon: <Building2 className="text-purple-400" size={28} />,
      title: "Affiliation",
      value: "Affiliated with AMI Education",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Get In Touch
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Koi bhi sawal ho ya admission ki maloomat leni ho, humse raabta karein. 
          
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Contact Cards */}
          <div className="grid grid-cols-1 gap-6">
            {contactDetails.map((item, index) => (
              <a 
                href={item.link} 
                key={index}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center p-6 bg-gray-800/50 border border-gray-700 rounded-2xl hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300 group"
              >
                <div className="p-4 bg-gray-900 rounded-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="ml-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{item.title}</h3>
                  <p className="text-lg font-semibold text-gray-200">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Map/Extra Info Section */}
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-gray-700 p-8 rounded-3xl h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                Professional Training
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                Hands-on Practical Lab Sessions
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                Physical and Online Classes available
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                Located at the heart of Karachi (NIPA)
              </li>
            </ul>
            
            <div className="mt-10 p-6 bg-blue-600 rounded-2xl text-center shadow-lg shadow-blue-900/20">
              <p className="font-bold text-white text-lg italic tracking-wide">
                "Learning Today, Leading Tomorrow"
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;