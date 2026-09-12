import ContactForm from "../common/ContactForm";

const AboutPage = () => {
  return (
    <div className="about-page">
        <h2>About</h2>
        <p>Traditional language apps are great for learning lists of words, but they often miss how people actually talk.
          I built Get Fluent because I found myself stuck in a common trap: I could memorize vocabulary, but when it came to understanding
          my family or jumping into everyday conversations, there was a massive disconnect. This app focuses on the real phrases, cultural nuances,
          and conversational building blocks you need to move from passive listening to active speaking. It&apos;s a tool designed to help you stop 
          studying a language and start living it with the people who matter most.</p>
        <ContactForm />
    </div>
  );
};

export default AboutPage;