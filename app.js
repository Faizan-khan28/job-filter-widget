const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "TechCo Solutions",
        location: "Bangalore",
        salary: "8-12 LPA",
        skills: ["React", "JavaScript", "CSS"]
    },
    {
        id: 2,
        title: "Backend Engineer",
        company: "StartupX",
        location: "Mumbai",
        salary: "6-10 LPA",
        skills: ["Java", "SQL", "Spring Boot"]
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "InnovateLabs",
        location: "Bangalore",
        salary: "10-15 LPA",
        skills: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 4,
        title: "Junior Software Engineer",
        company: "CloudFirst",
        location: "Delhi",
        salary: "5-8 LPA",
        skills: ["Java", "JavaScript", "AWS"]
    },
    {
        id: 5,
        title: "React Developer",
        company: "DesignFlow",
        location: "Pune",
        salary: "7-11 LPA",
        skills: ["React", "Next.js", "Tailwind CSS"]
    },
    {
        id: 6,
        title: "Java Backend Developer",
        company: "EnterpriseSoft",
        location: "Hyderabad",
        salary: "9-13 LPA",
        skills: ["Java", "Spring", "PostgreSQL"]
    },
    {
        id: 7,
        title: "Web Developer",
        company: "WebCreative",
        location: "Bangalore",
        salary: "6-9 LPA",
        skills: ["HTML", "CSS", "JavaScript", "jQuery"]
    },
    {
        id: 8,
        title: "Next.js Developer",
        company: "ModernApps",
        location: "Mumbai",
        salary: "11-16 LPA",
        skills: ["Next.js", "React", "TypeScript", "Cloud"]
    },
    {
        id: 9,
        title: "Software Development Intern",
        company: "TechStartup",
        location: "Delhi",
        salary: "3-5 LPA",
        skills: ["Java", "JavaScript", "SQL"]
    },
    {
        id: 10,
        title: "Frontend Engineer",
        company: "DataViz Inc",
        location: "Pune",
        salary: "9-13 LPA",
        skills: ["React", "JavaScript", "D3.js", "CSS"]
    }
];


const searchInput    = document.getElementById("searchInput");
const locationSelect = document.getElementById("locationSelect");
const salarySlider   = document.getElementById("salarySlider");
const salaryValue    = document.getElementById("salaryValue");   
const jobsGrid       = document.getElementById("jobsGrid");     
const jobCount       = document.getElementById("jobCount");      
const noResults      = document.getElementById("noResults");     


function getMaxSalary(salaryString) {
    const parts = salaryString.split("-");   
    const maxPart = parts[1];               
    return parseInt(maxPart);             
}



function createJobCard(job) {

    const skillsHTML = job.skills
        .map(skill => `<span class="skill-tag">${skill}</span>`)
        .join("");  

    return `
        <div class="job-card">

            <div class="card-top">
                <div class="job-title">${job.title}</div>
                <div class="salary-badge">${job.salary}</div>
            </div>

            <div class="company-name">${job.company}</div>

            <div class="location-pill">📍 ${job.location}</div>

            <div class="skills-list">
                ${skillsHTML}
            </div>

        </div>
    `;
}



function filterJobs() {

    const searchText     = searchInput.value.toLowerCase();       
    const selectedCity   = locationSelect.value;                 
    const maxSalaryLimit = parseInt(salarySlider.value);       

    const filteredJobs = jobs.filter(function(job) {

        const titleMatch = job.title.toLowerCase().includes(searchText);

        const locationMatch = selectedCity === "" || job.location === selectedCity;

        const jobMaxSalary = getMaxSalary(job.salary);         
        const salaryMatch  = jobMaxSalary <= maxSalaryLimit;     

        return titleMatch && locationMatch && salaryMatch;
    });

    displayJobs(filteredJobs);
}



function displayJobs(filteredJobs) {

    jobsGrid.innerHTML = "";

    jobCount.textContent = filteredJobs.length;

    if (filteredJobs.length === 0) {
        noResults.classList.remove("hidden"); 
        return;                               
    }

    noResults.classList.add("hidden");

    filteredJobs.forEach(function(job) {
        const cardHTML = createJobCard(job);  
        jobsGrid.innerHTML += cardHTML;       
    });
}


salarySlider.addEventListener("input", function() {
    salaryValue.textContent = salarySlider.value;  
    filterJobs();                                  
});


searchInput.addEventListener("input", filterJobs);       
locationSelect.addEventListener("change", filterJobs);  


displayJobs(jobs);