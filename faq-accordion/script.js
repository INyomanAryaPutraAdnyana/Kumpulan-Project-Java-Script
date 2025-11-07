// list faq
const faqData = [
  {
    question: "What is HTML?",
    answer:
      "HTML stands for HyperText Markup Language. It is the standard language for creating web pages.",
  },
  {
    question: "What is CSS?",
    answer:
      "CSS stands for Cascading Style Sheets. It is used to style and layout web pages.",
  },
  {
    question: "What is JavaScript?",
    answer:
      "JavaScript is a programming language that is used to create dynamic and interactive effects on web pages.",
  },
];
// akses elemen
const accordion = document.getElementById("accordion");
// menampilkan object

const generateFaqData = (faqData) => {
  faqData.forEach((item) => {
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    const header = document.createElement("button");
    header.classList.add("header-accordion");
    header.textContent = item.question;

    const subHeader = document.createElement("div");
    const content = document.createElement("p");
    subHeader.classList.add("sub-header-accordion");
    content.classList.add("content-accordion");
    content.textContent = item.answer;

    accordion.appendChild(accordionItem);
    accordionItem.appendChild(header);
    accordionItem.appendChild(subHeader);
    subHeader.appendChild(content);
  });
};
generateFaqData(faqData);

const accordionBtn = document.querySelectorAll(".header-accordion");
accordionBtn.forEach((header) => {
  header.addEventListener("click", () => {
    header.classList.toggle("active");
    const accordionContent = header.nextElementSibling;

    if (header.classList.contains("active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = 0;
    }

    accordionBtn.forEach((otherHeader) => {
      if (otherHeader !== header && otherHeader.classList.contains("active")) {
        otherHeader.classList.remove("active");
        otherHeader.nextElementSibling.style.maxHeight = 0;
      }
    });
  });
});
