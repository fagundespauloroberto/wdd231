const cursos = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introdução à Programação',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Este curso apresentará aos alunos a programação.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Fundamentos da Web',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Este curso apresenta aos alunos a World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programação com Funções',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Os alunos tornam-se programadores de computador mais organizados.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programação com Classes',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Este curso apresentará a noção de classes e objetos.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Fundamentos da Web Dinâmica',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Os alunos aprenderão a criar sites dinâmicos que usam JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Desenvolvimento Web Frontend I',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Foco em experiência do usuário e uso básico de APIs.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const courseContainer = document.getElementById("course-container");
    const totalCreditsDisplay = document.getElementById("total-credits");
    
    const btnAll = document.getElementById("btn-all");
    const btnWdd = document.getElementById("btn-wdd");
    const btnCse = document.getElementById("btn-cse");

    function displayCourses(courseList) {
        if (!courseContainer) return;
        courseContainer.innerHTML = "";

        courseList.forEach(course => {
            const card = document.createElement("div");
            card.classList.add("course-card");
            if (course.completed) {
                card.classList.add("completed");
            }
            card.textContent = `${course.subject} ${course.number}`;
            courseContainer.appendChild(card);
        });

        // Cálculo dinâmico do total de créditos utilizando reduce
        const total = courseList.reduce((acc, course) => acc + course.credits, 0);
        if (totalCreditsDisplay) {
            totalCreditsDisplay.textContent = total;
        }
    }

    function setActiveButton(activeBtn) {
        [btnAll, btnWdd, btnCse].forEach(btn => btn?.classList.remove("active"));
        activeBtn?.classList.add("active");
    }

    btnAll?.addEventListener("click", () => {
        setActiveButton(btnAll);
        displayCourses(cursos);
    });

    btnWdd?.addEventListener("click", () => {
        setActiveButton(btnWdd);
        const wddCourses = cursos.filter(c => c.subject === 'WDD');
        displayCourses(wddCourses);
    });

    btnCse?.addEventListener("click", () => {
        setActiveButton(btnCse);
        const cseCourses = cursos.filter(c => c.subject === 'CSE');
        displayCourses(cseCourses);
    });

    // Renderização Inicial
    displayCourses(cursos);
});