export default function RecentDiveLogs() {
    const logs = [
      {
        id: 1,
        title: "Coral Reef Exploration",
        user: "Muichiro Tokito",
        timeLogged: "2 hours ago",
      },
      {
        id: 2,
        title: "Deep Sea Adventure",
        user: "Bob Smith",
        timeLogged: "3 days ago",
      },
      {
        id: 3,
        title: "Wreck Dive",
        user: "Chris Brown",
        timeLogged: "1 week ago",
      },
      {
        id: 4,
        title: "Night Dive",
        user: "John Doe",
        timeLogged: "2 weeks ago",
      },
      {
        id: 5,
        title: "Cave Exploration",
        user: "Juan Dela Cruz",
        timeLogged: "1 month ago",
      },
      {
        id: 6,
        title: "Shark Encounter",
        user: "Ahn Suho",
        timeLogged: "2 months ago",
      },
    ];
  
    return (
      <div className="bg-[#2C7DA0] py-2 px-5 rounded-2xl shadow-md h-[22.8rem] overflow-y-scroll mt-4 md:mt-0">
        <h3 className="text-lg font-bold py-3 mb-2 ml-2 text-white">Recent Dive Logs</h3>
        <ul className="md:ml-2 md:-mr-[0.30rem]">
          {logs.map((log) => (
            <li
              key={log.id}
              className="bg-[#D9E7EC] p-4 rounded-xl mb-4 flex justify-between items-center"
            >
              {/* Left Section - Texts */}
              <div>
                <p className="text-base text-[#001526] font-bold">{log.title}</p>
                <p className="text-sm text-[#001526]-700">{log.user}</p>
                <p className="text-sm text-[#001526]-500">{log.timeLogged}</p>
              </div>
  
              {/* Right Section - View Button */}
              <button className="bg-[#001526] text-white w-[4.5rem] h-[1.60rem] mt-9 -mr-[0.15rem] text-sm rounded-lg shadow-md hover:bg-[#2C7DA0]">
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }