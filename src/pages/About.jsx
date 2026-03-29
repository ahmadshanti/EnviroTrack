function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Ahmad Shanti",
      role: "General Project Coordinator",
      image: "src/assets/ahmad shanti.jpg",
     description: <p>
       Supporting the development of practical solutions for challenges faced during the project
Contributing to building and programming the initial version of the website and the electronic platform
Assisting the project supervisor in organizing tasks and following up on progress
Coordinating between team members to ensure smooth workflow and communication
Participating in improving system functionality and user experience during development
Helping in testing the system and fixing basic issues in early stages
Providing technical support when needed and contributing to overall project improvement
Ensuring that project tasks are completed according to the planned timeline
      </p>,
       },
    {
      id: 2,
      name: "Rima Djelloul",
      role: "General Supervisor of the Environment Tracking System Project",
      image: "src/assets/rima.jpg",
      description: <p>
        Defining the project scope
Monitoring the quality of work of the Environment Tracking System project
Ensuring the coordination and integration of the technologies used in the project
Preparing periodic reports on the role of the system in managing environmental affairs, and sending text and non-text messages to other applications such as Facebook and Instagram
Organizing training sessions provided by the project to raise awareness among individuals about climate change
Identifying all potential risks that the project may face during environmental crises
Evaluating performance quality
      </p>,
    },
  ];

  return (
    <>
      <section className="page-section about-grid">
        <div className="card about-card">
          <div className="section-heading">
            <span className="section-label">Project Overview</span>
            <h2>About This System</h2>
            <p>
              This environmental tracking system is a simple web-based project
              designed to monitor temperature and humidity values.
            </p>
          </div>

          <p className="about-text">
            The system allows users to add environmental readings manually,
            display the latest values on a dashboard, review historical records,
            and generate basic reports. It helps show how software can be used
            to monitor environmental conditions in a simple and practical way.
          </p>
        </div>

        <div className="card about-card">
          <div className="section-heading">
            <span className="section-label">Technologies</span>
            <h2>Tools Used</h2>
          </div>

          <ul className="about-list">
            <li>React</li>
            <li>Vite</li>
            <li>React Router</li>
            <li>CSS3</li>
            <li>JavaScript</li>
          </ul>
        </div>

        <div className="card about-card">
          <div className="section-heading">
            <span className="section-label">Goal</span>
            <h2>Why This Project Matters</h2>
          </div>

          <p className="about-text">
            This project demonstrates how digital tools can support
            environmental awareness and data monitoring. Even as a simple
            prototype, it reflects the idea of collecting data, tracking
            changes, and supporting better decision-making.
          </p>
        </div>
      </section>

      <section className="team-section">
        <div className="section-badge">Team</div>
        <h2>Project Team</h2>
        <p className="team-intro">
          This project was developed through the efforts of the following team
          members.
        </p>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div className="team-card" key={member.id}>
              <img
                src={member.image}
                alt={member.name}
                className="team-image"
              />
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default About;