import { Helmet } from "react-helmet-async";

/**
 * FAQ Schema specifically for the job market scams blog post
 * Helps AI assistants and search engines better understand the content
 */
const JobMarketFAQSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I identify job scams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Job scams often request sensitive personal information like social security numbers or bank details before a verified interview. Be wary of postings that ask for references before initial contact, have vague job descriptions, promise unrealistic salaries, or pressure you to act quickly. Always research the company thoroughly and trust your instincts if something feels off."
        }
      },
      {
        "@type": "Question",
        name: "What information should I never provide before an interview?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Never provide your social security number, bank account details, credit card information, or copies of identification documents before a verified video or in-person interview. Legitimate employers will not request this information during the initial application process. Professional references should only be provided after you've had substantive contact with the hiring team."
        }
      },
      {
        "@type": "Question",
        name: "What should I do if I encounter a suspicious job posting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you encounter a suspicious job posting, report it immediately to the platform where you found it. Document the posting with screenshots, share information with others in your network to warn them, and if you've already provided information, monitor your credit reports and accounts. Contact local authorities if you've been scammed."
        }
      },
      {
        "@type": "Question",
        name: "How do reference scams work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reference scams involve fake employers requesting professional references very early in the application process. They then use those names and email addresses for phishing attempts, targeting your references' organizations with fraudulent emails. Legitimate employers typically request references much later in the hiring process, after substantial interviews."
        }
      },
      {
        "@type": "Question",
        name: "What are job boards doing to protect applicants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Job seekers are calling for platforms to implement stronger verification systems for employers, hold hiring companies to codes of honor, create transparency in posting verification, and provide clear reporting mechanisms. While some platforms have basic verification, many need to do more to protect vulnerable job seekers from predatory practices."
        }
      },
      {
        "@type": "Question",
        name: "Where can I report job scams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Report job scams to the platform where you found the posting, file a complaint with the Federal Trade Commission (FTC) at ftc.gov, report to your state's attorney general office, contact the FBI's Internet Crime Complaint Center (IC3) for serious cases, and share information with online job seeker communities to warn others."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default JobMarketFAQSchema;
