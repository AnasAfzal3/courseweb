import { vipStudents } from '../vipStudents';

const VipStudentsSection = () => {
  return (
    <div className="bg-gray-950 py-20">
      <div className="container mx-auto px-6 text-center">

        <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Top 4 VIP Students of the Year
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-14">
          These students showed exceptional performance, discipline, and skills throughout the year.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {vipStudents.map((student) => (
            <div
  key={student.id}
  className="animate-rgb-border p-6 transition-all hover:-translate-y-3 group"
>
              {/* Image Section */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
               <div className="relative w-32 h-32 mx-auto mb-4">
      <img
        src={student.image}
        alt={student.name}
        className="w-full h-full object-cover rounded-full relative z-10 border border-white/10"
      />
  </div>
              </div>

              {/* Name & Role */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                  {student.name}
                </h3>
                <p className="text-white-400 text-sm mt-1 font-medium tracking-wide">
                  {student.role}
                </p>
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest border border-green-500/20">
                   VIP Verified
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VipStudentsSection;